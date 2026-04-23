(function () {
	"use strict";

	var DEFAULT_MODULE_ID = "mod1";
	var DEFAULT_LESSON_ID = "mod1-lesson1";

	var state = {
		moduleId: DEFAULT_MODULE_ID,
		lessonId: DEFAULT_LESSON_ID,
		lessonTitle: "this lesson"
	};

	var refs = {
		backBtn: null,
		pageTitle: null,
		pageState: null,
		completionMessage: null,
		moduleButton: null
	};

	function cacheDom() {
		refs.backBtn = document.getElementById("backBtn");
		refs.pageTitle = document.getElementById("pageTitle");
		refs.pageState = document.getElementById("pageState");
		refs.completionMessage = document.getElementById("completionMessage");
		refs.moduleButton = document.getElementById("moduleButton");
	}

	function initFromQuery() {
		var params = new URLSearchParams(window.location.search);
		state.moduleId = params.get("moduleId") || DEFAULT_MODULE_ID;
		state.lessonId = params.get("lessonId") || DEFAULT_LESSON_ID;
	}

	function attachEventListeners() {
		if (refs.backBtn) {
			refs.backBtn.addEventListener("click", function () {
				window.location.href =
					"lesson-quiz.html?moduleId=" +
					encodeURIComponent(state.moduleId) +
					"&lessonId=" +
					encodeURIComponent(state.lessonId);
			});
		}

		if (refs.pageState) {
			refs.pageState.addEventListener("click", function (event) {
				var retryButton = event.target.closest("[data-action='retry']");
				if (retryButton) {
					event.preventDefault();
					loadPage();
				}
			});
		}
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

	function renderCompletion() {
		if (refs.pageTitle) {
			refs.pageTitle.textContent = "Key Take Aways";
		}

		if (refs.completionMessage) {
			refs.completionMessage.textContent =
				"You completed the " + state.lessonTitle + " lesson! Great job!";
		}

		if (refs.moduleButton) {
			refs.moduleButton.href = "../lesson-list.html?moduleId=" + encodeURIComponent(state.moduleId);
		}
	}

	async function loadPage() {
		if (!window.AppApi) {
			showState("error", "Page dependencies are missing. Please refresh and try again.", true);
			return;
		}

		showState("loading", "Loading completion summary...");

		try {
			var responses = await Promise.all([
				window.AppApi.getLesson(state.lessonId),
				window.AppApi.getProgress()
			]);

			var lesson = responses[0];
			var progress = responses[1];

			state.lessonTitle = lesson && lesson.title ? lesson.title : "this lesson";

			renderCompletion();
			hideState();
		} catch (err) {
			if (window.AppApi.handleAuthError(err)) {
				return;
			}

			showState("error", "We could not load your completion summary right now. Please try again.", true);
		}
	}

	function escapeHtml(value) {
		return String(value || "")
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/\"/g, "&quot;")
			.replace(/'/g, "&#39;");
	}

	function init() {
		cacheDom();
		initFromQuery();
		attachEventListeners();
		loadPage();
	}

	document.addEventListener("DOMContentLoaded", init);
})();
