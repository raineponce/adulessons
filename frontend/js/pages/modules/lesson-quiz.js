(function () {
	"use strict";

	var DEFAULT_MODULE_ID = "mod1";
	var DEFAULT_LESSON_ID = "mod1-lesson1";
	var CONTINUE_PAGE = "key-takeaways.html";

	var state = {
		moduleId: DEFAULT_MODULE_ID,
		lessonId: DEFAULT_LESSON_ID,
		lesson: null,
		quiz: null,
		selectedIndex: null,
		submitted: false
	};

	var refs = {
		backBtn: null,
		quizTitle: null,
		quizSubtitle: null,
		quizProgressText: null,
		quizQuestion: null,
		answersGrid: null,
		submitBtn: null,
		quizFeedback: null,
		continueRow: null,
		continueBtn: null,
		pageState: null
	};

	function cacheDom() {
		refs.backBtn = document.getElementById("backBtn");
		refs.quizTitle = document.getElementById("quizTitle");
		refs.quizSubtitle = document.getElementById("quizSubtitle");
		refs.quizProgressText = document.getElementById("quizProgressText");
		refs.quizQuestion = document.getElementById("quizQuestion");
		refs.answersGrid = document.getElementById("answersGrid");
		refs.submitBtn = document.getElementById("submitBtn");
		refs.quizFeedback = document.getElementById("quizFeedback");
		refs.continueRow = document.getElementById("continueRow");
		refs.continueBtn = document.getElementById("continueBtn");
		refs.pageState = document.getElementById("pageState");
	}

	function initFromQuery() {
		var params = new URLSearchParams(window.location.search);
		state.moduleId = params.get("moduleId") || DEFAULT_MODULE_ID;
		state.lessonId = params.get("lessonId") || DEFAULT_LESSON_ID;
	}

	function attachEventListeners() {
		if (refs.backBtn) {
			refs.backBtn.addEventListener("click", handleBack);
		}

		if (refs.submitBtn) {
			refs.submitBtn.addEventListener("click", handleSubmit);
		}

		if (refs.continueBtn) {
			refs.continueBtn.addEventListener("click", function (event) {
				event.preventDefault();
				continueForward();
			});
		}

		if (refs.answersGrid) {
			refs.answersGrid.addEventListener("click", function (event) {
				var answerButton = event.target.closest("[data-answer-index]");
				if (!answerButton || state.submitted) {
					return;
				}

				event.preventDefault();
				selectAnswer(Number(answerButton.getAttribute("data-answer-index")));
			});
		}

		if (refs.pageState) {
			refs.pageState.addEventListener("click", function (event) {
				var retryButton = event.target.closest("[data-action='retry']");
				if (retryButton) {
					event.preventDefault();
					loadQuiz();
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

	function showUnavailable(message) {
		if (refs.quizQuestion) {
			refs.quizQuestion.textContent = message;
		}
		if (refs.answersGrid) {
			refs.answersGrid.innerHTML = "";
		}
		if (refs.submitBtn) {
			refs.submitBtn.disabled = true;
		}
		if (refs.quizFeedback) {
			refs.quizFeedback.className = "quiz-feedback active";
			refs.quizFeedback.innerHTML = "<p class='quiz-feedback-title'>Quiz unavailable</p>";
		}
		if (refs.continueRow) {
			refs.continueRow.classList.remove("hidden");
		}
		if (refs.continueBtn) {
			refs.continueBtn.href = buildContinueUrl();
		}
	}

	function renderQuiz() {
		if (!state.quiz) {
			showUnavailable("Quiz unavailable for this lesson right now.");
			return;
		}

		if (refs.quizTitle && state.lesson && state.lesson.title) {
			refs.quizTitle.textContent = state.lesson.title + " Quiz";
		}

		if (refs.quizSubtitle) {
			refs.quizSubtitle.textContent = "Were you paying attention? Let's find out!";
		}

		if (refs.quizQuestion) {
			refs.quizQuestion.textContent = "1. " + (state.quiz.question || "");
		}

		if (refs.answersGrid) {
			refs.answersGrid.innerHTML = (state.quiz.options || [])
				.map(function (option, index) {
					return renderAnswerButton(option, index);
				})
				.join("");
		}

		if (refs.submitBtn) {
			refs.submitBtn.disabled = state.selectedIndex === null;
			refs.submitBtn.textContent = "Submit Answer";
		}

		if (refs.quizFeedback) {
			refs.quizFeedback.className = "quiz-feedback";
			refs.quizFeedback.innerHTML = "";
		}

		if (refs.continueRow) {
			refs.continueRow.classList.add("hidden");
		}

		updatePointsLabel();
		hideState();
	}

	function renderAnswerButton(option, index) {
		var classes = ["answer-card", "answer-" + getAnswerClass(index)];
		if (state.selectedIndex === index) {
			classes.push("selected");
		}

		return (
			"<button type='button' class='" +
			classes.join(" ") +
			"' data-answer-index='" +
			index +
			"' aria-pressed='" +
			(state.selectedIndex === index ? "true" : "false") +
			"'>" +
			escapeHtml(getAnswerLabel(index) + ". " + option) +
			"</button>"
		);
	}

	function getAnswerClass(index) {
		return ["a", "b", "c", "d"][index] || "a";
	}

	function getAnswerLabel(index) {
		return ["A", "B", "C", "D"][index] || String.fromCharCode(65 + index);
	}

	function selectAnswer(index) {
		state.selectedIndex = index;
		renderQuiz();
	}

	async function handleSubmit() {
		if (state.selectedIndex === null || state.submitted || !state.quiz) {
			return;
		}

		state.submitted = true;

		if (refs.submitBtn) {
			refs.submitBtn.disabled = true;
			refs.submitBtn.textContent = "Submitted";
		}

		var correct = state.selectedIndex === Number(state.quiz.correctIndex);
		showResult(correct);

		try {
			await refreshProgress();
		} catch (err) {
			// Progress refresh is secondary; submission feedback is still valid.
		}
	}

	function showResult(isCorrect) {
		if (!refs.quizFeedback) {
			return;
		}

		var title = isCorrect ? "Correct" : "Not quite";
		var body = isCorrect
			? "You picked the right answer."
			: "That answer is not correct, but you can still review the explanation below.";

		refs.quizFeedback.className = "quiz-feedback active " + (isCorrect ? "correct" : "wrong");
		refs.quizFeedback.innerHTML =
			"<p class='quiz-feedback-title'>" +
			escapeHtml(title) +
			"</p><p>" +
			escapeHtml(body) +
			"</p><p class='quiz-explanation'><strong>Explanation:</strong> " +
			escapeHtml(state.quiz.explanation || "") +
			"</p>";

		if (refs.continueRow) {
			refs.continueRow.classList.remove("hidden");
		}

		if (refs.continueBtn) {
			refs.continueBtn.href = buildContinueUrl();
		}
	}

	function buildContinueUrl() {
		return (
			CONTINUE_PAGE +
			"?moduleId=" +
			encodeURIComponent(state.moduleId) +
			"&lessonId=" +
			encodeURIComponent(state.lessonId)
		);
	}

	function continueForward() {
		window.location.href = buildContinueUrl();
	}

	function handleBack() {
		window.location.href =
			"lesson-taxes.html?moduleId=" +
			encodeURIComponent(state.moduleId) +
			"&lessonId=" +
			encodeURIComponent(state.lessonId);
	}

	function updatePointsLabel() {
		if (!refs.quizProgressText) {
			return;
		}

		if (!state.progressSummary) {
			refs.quizProgressText.textContent = "";
			return;
		}

		refs.quizProgressText.textContent =
			"Module progress: " +
			state.progressSummary.completedLessons +
			"/" +
			state.progressSummary.totalLessons +
			" lessons complete (" +
			state.progressSummary.percentComplete +
			"%).";
	}

	async function refreshProgress() {
		var progress = await window.AppApi.getProgress();
		if (progress && Array.isArray(progress.moduleProgress)) {
			state.progressSummary = progress.moduleProgress.find(function (item) {
				return item.moduleId === state.moduleId;
			}) || null;
			updatePointsLabel();
		}
	}

	async function loadQuiz() {
		if (!window.AppApi) {
			showState("error", "Page dependencies are missing. Please refresh and try again.", true);
			return;
		}

		showState("loading", "Loading quiz...");

		try {
			state.lesson = await window.AppApi.getLesson(state.lessonId);
			state.quiz = state.lesson && state.lesson.quiz ? state.lesson.quiz : null;

			var progress = await window.AppApi.getProgress();
			state.progressSummary = progress && Array.isArray(progress.moduleProgress)
				? progress.moduleProgress.find(function (item) {
					return item.moduleId === state.moduleId;
				}) || null
				: null;

			if (!state.quiz || !Array.isArray(state.quiz.options) || state.quiz.options.length === 0) {
				renderQuiz();
				showState("empty", "Quiz unavailable for this lesson yet.", false);
				return;
			}

			state.submitted = false;
			state.selectedIndex = null;
			renderQuiz();
		} catch (err) {
			if (window.AppApi.handleAuthError(err)) {
				return;
			}

			showState("error", "We could not load the quiz right now. Please try again.", true);
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
		loadQuiz();
	}

	document.addEventListener("DOMContentLoaded", init);
})();
