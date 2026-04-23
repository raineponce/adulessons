(function () {
	"use strict";

	var DEFAULT_MODULE_ID = "mod1";
	var LESSON_PAGE = "lesson-taxes.html";

	var refs = {
		moduleTitle: null,
		lessonsList: null,
		pageState: null,
		progressText: null
	};

	function cacheDom() {
		refs.moduleTitle = document.getElementById("moduleTitle");
		refs.lessonsList = document.getElementById("lessonsList");
		refs.pageState = document.getElementById("pageState");
		refs.progressText = document.getElementById("moduleProgressText");
	}

	function attachEventListeners() {
		if (!refs.pageState) {
			return;
		}

		refs.pageState.addEventListener("click", function (event) {
			var target = event.target;
			if (target && target.matches("[data-action='retry']")) {
				loadPage();
			}
		});
	}

	function getRequestedModuleId() {
		var params = new URLSearchParams(window.location.search);
		return params.get("moduleId") || DEFAULT_MODULE_ID;
	}

	function showState(type, message, showRetry) {
		if (!refs.pageState) {
			return;
		}

		refs.pageState.className = "status-box" + (type === "error" ? " error" : "");
		refs.pageState.innerHTML =
			"<p>" + escapeHtml(message) + "</p>" +
			(showRetry
				? "<div class='status-actions'><button class='retry-button' type='button' data-action='retry'>Retry</button></div>"
				: "");
	}

	function hideState() {
		if (!refs.pageState) {
			return;
		}

		refs.pageState.className = "status-box hidden";
		refs.pageState.innerHTML = "";
	}

	function renderProgress(progressResponse, moduleId) {
		if (!refs.progressText) {
			return;
		}

		if (!progressResponse || !Array.isArray(progressResponse.moduleProgress)) {
			refs.progressText.textContent = "";
			return;
		}

		var moduleProgress = progressResponse.moduleProgress.find(function (item) {
			return item.moduleId === moduleId;
		});

		if (!moduleProgress) {
			refs.progressText.textContent = "";
			return;
		}

		refs.progressText.textContent =
			"Progress: " +
			moduleProgress.completedLessons +
			"/" +
			moduleProgress.totalLessons +
			" lessons complete (" +
			moduleProgress.percentComplete +
			"%).";
	}

	function resolveActiveModule(modules, requestedModuleId) {
		if (!Array.isArray(modules) || modules.length === 0) {
			return null;
		}

		return (
			modules.find(function (mod) {
				return mod.moduleId === requestedModuleId;
			}) ||
			modules.find(function (mod) {
				return mod.moduleId === DEFAULT_MODULE_ID;
			}) ||
			modules[0]
		);
	}

	async function fetchLessonDetails(lessonIds) {
		var detailEntries = await Promise.all(
			lessonIds.map(async function (lessonId) {
				try {
					var detail = await window.AppApi.getLesson(lessonId);
					return [lessonId, detail];
				} catch (err) {
					if (window.AppApi.handleAuthError(err)) {
						throw err;
					}
					return [lessonId, null];
				}
			})
		);

		return detailEntries.reduce(function (acc, pair) {
			acc[pair[0]] = pair[1];
			return acc;
		}, {});
	}

	function buildLessonViewModels(activeModule, completedLessons, lessonDetailsById) {
		var lessonIds = Array.isArray(activeModule.lessonIds) ? activeModule.lessonIds : [];
		var completedSet = new Set(Array.isArray(completedLessons) ? completedLessons : []);

		var models = lessonIds.map(function (lessonId, index) {
			var detail = lessonDetailsById[lessonId] || null;
			var previousLessonId = lessonIds[index - 1];
			var isCompleted = completedSet.has(lessonId);
			var isUnlocked = isCompleted || index === 0 || completedSet.has(previousLessonId);

			return {
				lessonId: lessonId,
				order: detail && typeof detail.order === "number" ? detail.order : index + 1,
				title: detail && detail.title ? detail.title : formatLessonTitle(lessonId),
				isCompleted: isCompleted,
				isLocked: !isUnlocked,
				href:
					LESSON_PAGE +
					"?moduleId=" +
					encodeURIComponent(activeModule.moduleId) +
					"&lessonId=" +
					encodeURIComponent(lessonId)
			};
		});

		models.sort(function (a, b) {
			return a.order - b.order;
		});

		return models;
	}

	function renderLessons(lessons) {
		if (!refs.lessonsList) {
			return;
		}

		refs.lessonsList.innerHTML = lessons
			.map(function (lesson, index) {
				var classes = ["lesson-card"];
				if (lesson.isCompleted) {
					classes.push("completed");
				}
				if (lesson.isLocked) {
					classes.push("locked");
				}

				return (
					"<a href='" +
					lesson.href +
					"' class='" +
					classes.join(" ") +
					"' data-lesson-id='" +
					escapeHtml(lesson.lessonId) +
					"' aria-label='Open " +
					escapeHtml(lesson.title) +
					"'>" +
					"<span class='lesson-number'>" +
					toRoman(index + 1) +
					".</span>" +
					"<span class='lesson-title'>" +
					escapeHtml(lesson.title) +
					"</span>" +
					"<div class='lesson-icons'>" +
					renderStatusIcon(lesson) +
					renderPlayIcon() +
					"</div>" +
					"</a>"
				);
			})
			.join("");
	}

	function renderStatusIcon(lesson) {
		if (lesson.isCompleted) {
			return (
				"<svg class='lock-icon' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-label='Completed'>" +
				"<circle cx='12' cy='12' r='9' stroke='currentColor' stroke-width='2'></circle>" +
				"<path d='M8 12.5L10.8 15.3L16 10.2' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path>" +
				"</svg>"
			);
		}

		if (lesson.isLocked) {
			return (
				"<svg class='lock-icon' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-label='Locked'>" +
				"<rect x='3' y='11' width='18' height='11' rx='2' stroke='currentColor' stroke-width='2'></rect>" +
				"<path d='M7 11V7a5 5 0 0110 0v4' stroke='currentColor' stroke-width='2' stroke-linecap='round'></path>" +
				"</svg>"
			);
		}

		return "";
	}

	function renderPlayIcon() {
		return (
			"<svg class='play-icon' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>" +
			"<path d='M8 5.14v14.72a1 1 0 001.55.83l11-7.36a1 1 0 000-1.66l-11-7.36A1 1 0 008 5.14z' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path>" +
			"</svg>"
		);
	}

	function formatLessonTitle(lessonId) {
		var rawTitle = String(lessonId || "Lesson")
			.replace(/^.*-lesson\d+/i, "Lesson")
			.replace(/[-_]/g, " ")
			.trim();

		return rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);
	}

	function toRoman(number) {
		var numerals = [
			[10, "X"],
			[9, "IX"],
			[5, "V"],
			[4, "IV"],
			[1, "I"]
		];
		var remaining = number;
		var output = "";

		numerals.forEach(function (pair) {
			while (remaining >= pair[0]) {
				output += pair[1];
				remaining -= pair[0];
			}
		});

		return output;
	}

	function escapeHtml(value) {
		return String(value || "")
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/\"/g, "&quot;")
			.replace(/'/g, "&#39;");
	}

	async function loadPage() {
		if (!window.AppApi) {
			showState("error", "Page dependencies are missing. Please refresh and try again.", true);
			return;
		}

		showState("loading", "Loading lessons...");

		try {
			var requestedModuleId = getRequestedModuleId();

			var responses = await Promise.all([
				window.AppApi.getLessons(),
				window.AppApi.getProgress()
			]);

			var lessonsResponse = responses[0] || {};
			var progressResponse = responses[1] || {};
			var activeModule = resolveActiveModule(lessonsResponse.modules, requestedModuleId);

			if (!activeModule) {
				refs.lessonsList.innerHTML = "";
				showState("empty", "No lessons available yet.");
				return;
			}

			if (refs.moduleTitle) {
				refs.moduleTitle.textContent = activeModule.title || "Lessons";
			}

			renderProgress(progressResponse, activeModule.moduleId);

			var lessonIds = Array.isArray(activeModule.lessonIds) ? activeModule.lessonIds : [];
			if (lessonIds.length === 0) {
				refs.lessonsList.innerHTML = "";
				showState("empty", "No lessons available for this module yet.");
				return;
			}

			var lessonDetailsById = await fetchLessonDetails(lessonIds);
			var lessonModels = buildLessonViewModels(
				activeModule,
				lessonsResponse.completedLessons,
				lessonDetailsById
			);

			renderLessons(lessonModels);
			hideState();
		} catch (err) {
			if (window.AppApi && window.AppApi.handleAuthError(err)) {
				return;
			}

			showState(
				"error",
				"We could not load your lessons right now. Please try again.",
				true
			);
		}
	}

	function init() {
		cacheDom();
		attachEventListeners();
		loadPage();
	}

	document.addEventListener("DOMContentLoaded", init);
})();
