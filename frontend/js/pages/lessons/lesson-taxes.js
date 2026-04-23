(function () {
	"use strict";

	var DEFAULT_MODULE_ID = "mod1";
	var DEFAULT_LESSON_ID = "mod1-lesson1";

	var state = {
		moduleId: DEFAULT_MODULE_ID,
		lessonId: DEFAULT_LESSON_ID,
		lesson: null,
		pages: [],
		currentPageIndex: 0
	};

	var refs = {
		backBtn: null,
		nextBtn: null,
		lessonPages: null,
		pageState: null,
		pointsText: null
	};

	function cacheDom() {
		refs.backBtn = document.getElementById("backBtn");
		refs.nextBtn = document.getElementById("nextBtn");
		refs.lessonPages = document.getElementById("lessonPages");
		refs.pageState = document.getElementById("pageState");
		refs.pointsText = document.querySelector(".points-text");
	}

	function attachEventListeners() {
		if (refs.backBtn) {
			refs.backBtn.addEventListener("click", handleBack);
		}

		if (refs.nextBtn) {
			refs.nextBtn.addEventListener("click", handleNext);
		}

		if (refs.lessonPages) {
			refs.lessonPages.addEventListener("click", function (event) {
				var quizButton = event.target.closest("[data-action='quiz']");
				if (quizButton) {
					event.preventDefault();
					handleQuizClick();
				}

				var retryButton = event.target.closest("[data-action='retry']");
				if (retryButton) {
					event.preventDefault();
					loadLesson();
				}
			});
		}

		if (refs.pageState) {
			refs.pageState.addEventListener("click", function (event) {
				var retryButton = event.target.closest("[data-action='retry']");
				if (retryButton) {
					event.preventDefault();
					loadLesson();
				}
			});
		}
	}

	function initFromQuery() {
		var params = new URLSearchParams(window.location.search);
		state.moduleId = params.get("moduleId") || DEFAULT_MODULE_ID;
		state.lessonId = params.get("lessonId") || DEFAULT_LESSON_ID;
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

	function renderEmpty() {
		if (!refs.lessonPages) {
			return;
		}

		refs.lessonPages.innerHTML =
			"<section class='lesson-page active'><div class='lesson-content'><h1 class='lesson-title'>Lesson content coming soon</h1></div></section>";
		if (refs.nextBtn) {
			refs.nextBtn.style.visibility = "hidden";
			refs.nextBtn.disabled = true;
		}
	}

	function renderLesson() {
		if (!refs.lessonPages) {
			return;
		}

		refs.lessonPages.innerHTML = state.pages
			.map(function (page, index) {
				return (
					"<section class='lesson-page" +
					(index === state.currentPageIndex ? " active" : "") +
					"' data-page-index='" +
					index +
					"'>" +
					"<div class='lesson-content'>" +
					renderPageBlocks(page, index) +
					renderQuizButton(index) +
					"</div>" +
					"</section>"
				);
			})
			.join("");
	}

	function renderPageBlocks(page, pageIndex) {
		var blocks = Array.isArray(page && page.blocks) ? page.blocks : [];

		if (blocks.length === 0) {
			return "<p class='lesson-text'>Lesson content coming soon.</p>";
		}

		return blocks
			.map(function (block, blockIndex) {
				return renderBlock(block, pageIndex, blockIndex);
			})
			.join("");
	}

	function renderBlock(block, pageIndex, blockIndex) {
		var blockType = block && block.type ? String(block.type).toLowerCase() : "text";
		var key = "data-block='" + pageIndex + "-" + blockIndex + "'";

		if (blockType === "heading") {
			return "<h2 class='section-heading' " + key + ">" + escapeHtml(block.body || "") + "</h2>";
		}

		if (blockType === "text") {
			return "<p class='lesson-text' " + key + ">" + formatTextWithBreaks(block.body || "") + "</p>";
		}

		if (blockType === "image") {
			var imageSrc = block.src ? escapeHtml(block.src) : "";
			var imageAlt = escapeHtml(block.alt || "Lesson image");
			return "<img class='lesson-image' " + key + " src='" + imageSrc + "' alt='" + imageAlt + "'>";
		}

		if (blockType === "video") {
			var videoId = encodeURIComponent(block.videoId || "");
			return (
				"<iframe class='video-frame' " +
				key +
				" src='https://www.youtube.com/embed/" +
				videoId +
				"' title='Lesson video' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
			);
		}

		if (blockType === "list") {
			return renderList(block, key);
		}

		if (blockType === "link") {
			var href = block.href ? escapeHtml(block.href) : "#";
			var linkText = escapeHtml(block.linkText || block.href || "Open resource");
			return (
				"<p class='lesson-text' " +
				key +
				"><a class='lesson-link' href='" +
				href +
				"' target='_blank' rel='noopener'>" +
				linkText +
				"</a></p>"
			);
		}

		if (blockType === "callout") {
			return (
				"<div class='conclusion-box' " +
				key +
				"><p class='lesson-text' style='margin-bottom: 0;'>" +
				formatTextWithBreaks(block.body || "") +
				"</p></div>"
			);
		}

		return "<p class='lesson-text' " + key + ">" + formatTextWithBreaks(block.body || "") + "</p>";
	}

	function renderList(block, key) {
		var items = Array.isArray(block.items) ? block.items : [];
		var tag = block.ordered ? "ol" : "ul";

		return (
			"<" +
			tag +
			" class='lesson-list' " +
			key +
			">" +
			items
				.map(function (item) {
					return "<li>" + escapeHtml(item) + "</li>";
				})
				.join("") +
			"</" +
			tag +
			">"
		);
	}

	function renderQuizButton(pageIndex) {
		if (pageIndex !== state.pages.length - 1) {
			return "";
		}

		return (
			"<div class='quiz-button-container'>" +
			"<a href='#' class='quiz-button' data-action='quiz'>Quiz Question</a>" +
			"</div>"
		);
	}

	function goToPage(index) {
		if (index < 0 || index >= state.pages.length) {
			return;
		}

		var pages = refs.lessonPages ? refs.lessonPages.querySelectorAll(".lesson-page") : [];
		if (!pages.length) {
			return;
		}

		if (pages[state.currentPageIndex]) {
			pages[state.currentPageIndex].classList.remove("active");
		}

		state.currentPageIndex = index;
		pages[state.currentPageIndex].classList.add("active");

		updateNavButtons();
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	function updateNavButtons() {
		if (!refs.nextBtn) {
			return;
		}

		var atLastPage = state.currentPageIndex >= state.pages.length - 1;
		refs.nextBtn.style.visibility = atLastPage ? "hidden" : "visible";
		refs.nextBtn.disabled = atLastPage;
	}

	function handleBack() {
		if (state.currentPageIndex === 0) {
			window.location.href =
				"lesson-list.html?moduleId=" + encodeURIComponent(state.moduleId || DEFAULT_MODULE_ID);
			return;
		}

		goToPage(state.currentPageIndex - 1);
	}

	function handleNext() {
		goToPage(state.currentPageIndex + 1);
	}

	async function handleQuizClick() {
		var isFinalPage = state.currentPageIndex === state.pages.length - 1;
		if (!isFinalPage) {
			return;
		}

		try {
			var completion = await window.AppApi.completeLesson(state.lessonId);

			// Refresh progress after completion so dependent UI can reflect latest values.
			await refreshProgress(completion);

			window.location.href =
				"modules/lesson-quiz.html?moduleId=" +
				encodeURIComponent(state.moduleId) +
				"&lessonId=" +
				encodeURIComponent(state.lessonId);
		} catch (err) {
			if (window.AppApi.handleAuthError(err)) {
				return;
			}

			showState(
				"error",
				"We could not save your completion right now. Please try again.",
				true
			);
		}
	}

	async function refreshProgress(completionResponse) {
		if (completionResponse && typeof completionResponse.points === "number" && refs.pointsText) {
			refs.pointsText.textContent = String(completionResponse.points) + " pts";
		}

		try {
			var progress = await window.AppApi.getProgress();
			if (!progress || !Array.isArray(progress.moduleProgress)) {
				return;
			}
		} catch (err) {
			if (window.AppApi.handleAuthError(err)) {
				return;
			}
		}
	}

	async function loadLesson() {
		if (!window.AppApi) {
			showState("error", "Page dependencies are missing. Please refresh and try again.", true);
			return;
		}

		showState("loading", "Loading lesson...");

		try {
			state.lesson = await window.AppApi.getLesson(state.lessonId);
			state.pages = Array.isArray(state.lesson.pages) ? state.lesson.pages.slice() : [];
			state.pages.sort(function (a, b) {
				return (a.pageNumber || 0) - (b.pageNumber || 0);
			});
			state.currentPageIndex = 0;

			document.title = (state.lesson.title || "Lesson") + " - Lesson | aduLessons";

			if (!state.pages.length) {
				renderEmpty();
				showState("empty", "Lesson content coming soon.");
				return;
			}

			renderLesson();
			updateNavButtons();
			hideState();
		} catch (err) {
			if (window.AppApi.handleAuthError(err)) {
				return;
			}

			if (refs.lessonPages) {
				refs.lessonPages.innerHTML = "";
			}

			showState(
				"error",
				"We could not load this lesson right now. Please try again.",
				true
			);
		}
	}

	function formatTextWithBreaks(text) {
		return escapeHtml(text).replace(/\n/g, "<br>");
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
		attachEventListeners();
		initFromQuery();
		loadLesson();
	}

	document.addEventListener("DOMContentLoaded", init);
})();
