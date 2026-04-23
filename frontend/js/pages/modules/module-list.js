(function () {
	"use strict";

	var MODULE_CLASS_BY_ID = {
		mod1: "module-card--finance",
		mod2: "module-card--social",
		mod3: "module-card--productivity",
		mod4: "module-card--cooking",
		mod5: "module-card--household",
		mod6: "module-card--transport"
	};

	var MODULE_ICON_BY_ID = {
		mod1: "../assets/images/finance-icon.png",
		mod2: "../assets/images/social-icon.png",
		mod3: "../assets/images/productivity-icon.png",
		mod4: "../assets/images/cooking-icon.png",
		mod5: "../assets/images/home-icon.png",
		mod6: "../assets/images/transportation-icon.png"
	};

	var MODULE_CLASS_FALLBACK = [
		"module-card--finance",
		"module-card--social",
		"module-card--productivity",
		"module-card--cooking",
		"module-card--household",
		"module-card--transport"
	];

	var MODULE_ICON_FALLBACK = [
		"../assets/images/finance-icon.png",
		"../assets/images/social-icon.png",
		"../assets/images/productivity-icon.png",
		"../assets/images/cooking-icon.png",
		"../assets/images/home-icon.png",
		"../assets/images/transportation-icon.png"
	];

	var refs = {
		sectionLabel: null,
		modulesList: null,
		pageState: null,
		overlay: null,
		modalTitle: null,
		modalDesc: null,
		modalIcon: null,
		modalClose: null,
		modalConfirm: null,
		modalContinue: null
	};

	function cacheDom() {
		refs.sectionLabel = document.getElementById("modules-heading");
		refs.modulesList = document.getElementById("modulesList");
		refs.pageState = document.getElementById("pageState");
		refs.overlay = document.getElementById("detailsOverlay");
		refs.modalTitle = document.getElementById("modalTitle");
		refs.modalDesc = document.getElementById("modalDesc");
		refs.modalIcon = document.getElementById("modalIcon");
		refs.modalClose = document.getElementById("modalClose");
		refs.modalConfirm = document.getElementById("modalConfirm");
		refs.modalContinue = document.getElementById("modalContinue");
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

	function getCardClass(moduleId, index) {
		return MODULE_CLASS_BY_ID[moduleId] || MODULE_CLASS_FALLBACK[index % MODULE_CLASS_FALLBACK.length];
	}

	function getIconSrc(moduleId, index) {
		return MODULE_ICON_BY_ID[moduleId] || MODULE_ICON_FALLBACK[index % MODULE_ICON_FALLBACK.length];
	}

	function buildLessonListHref(moduleId) {
		return "../lesson-list.html?moduleId=" + encodeURIComponent(moduleId);
	}

	function escapeHtml(value) {
		return String(value || "")
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/\"/g, "&quot;")
			.replace(/'/g, "&#39;");
	}

	function openModal(moduleData) {
		if (!refs.overlay || !moduleData) {
			return;
		}

		refs.modalTitle.textContent = moduleData.title || "Module";
		refs.modalDesc.textContent = moduleData.description || "Start this module to explore its lessons.";
		refs.modalIcon.src = moduleData.icon;
		refs.modalIcon.alt = (moduleData.title || "Module") + " icon";

		refs.modalContinue.href = moduleData.href;
		refs.modalContinue.textContent = "Continue";
		refs.modalContinue.style.display = "inline-flex";

		refs.overlay.classList.add("active");
		refs.overlay.setAttribute("aria-hidden", "false");
		document.body.classList.add("modal-open");
	}

	function closeModal() {
		if (!refs.overlay) {
			return;
		}

		refs.overlay.classList.remove("active");
		refs.overlay.setAttribute("aria-hidden", "true");
		document.body.classList.remove("modal-open");
	}

	function navigateToModule(moduleId) {
		window.location.href = buildLessonListHref(moduleId);
	}

	function renderModules(modules) {
		if (!refs.modulesList) {
			return;
		}

		refs.modulesList.innerHTML = modules
			.map(function (mod, index) {
				var title = mod.title || ("Module " + (index + 1));
				var moduleId = mod.moduleId || ("mod" + (index + 1));
				var description = mod.description || "Start this module to explore its lessons.";
				var iconSrc = getIconSrc(moduleId, index);
				var href = buildLessonListHref(moduleId);
				var cardClass = getCardClass(moduleId, index);

				return (
					"<li>" +
					"<article class='module-card " + cardClass + "' tabindex='0' role='link' aria-label='Open " + escapeHtml(title) + " lessons' data-module-id='" + escapeHtml(moduleId) + "'>" +
					"<img src='" + escapeHtml(iconSrc) + "' alt='" + escapeHtml(title) + " icon'>" +
					"<h3 class='module-title'>" + escapeHtml(title) + "</h3>" +
					"<button class='details-button' type='button' data-action='details' data-title='" + escapeHtml(title) + "' data-description='" + escapeHtml(description) + "' data-icon='" + escapeHtml(iconSrc) + "' data-href='" + escapeHtml(href) + "'>See Details</button>" +
					"</article>" +
					"</li>"
				);
			})
			.join("");
	}

	function attachEventListeners() {
		if (refs.pageState) {
			refs.pageState.addEventListener("click", function (event) {
				if (event.target && event.target.matches("[data-action='retry']")) {
					loadPage();
				}
			});
		}

		if (refs.modulesList) {
			refs.modulesList.addEventListener("click", function (event) {
				var detailsButton = event.target.closest("[data-action='details']");
				if (detailsButton) {
					event.preventDefault();
					event.stopPropagation();

					openModal({
						title: detailsButton.getAttribute("data-title"),
						description: detailsButton.getAttribute("data-description"),
						icon: detailsButton.getAttribute("data-icon"),
						href: detailsButton.getAttribute("data-href")
					});
					return;
				}

				var moduleCard = event.target.closest(".module-card[data-module-id]");
				if (moduleCard) {
					navigateToModule(moduleCard.getAttribute("data-module-id"));
				}
			});

			refs.modulesList.addEventListener("keydown", function (event) {
				var moduleCard = event.target.closest(".module-card[data-module-id]");
				if (!moduleCard) {
					return;
				}

				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					navigateToModule(moduleCard.getAttribute("data-module-id"));
				}
			});
		}

		if (refs.modalClose) {
			refs.modalClose.addEventListener("click", closeModal);
		}
		if (refs.modalConfirm) {
			refs.modalConfirm.addEventListener("click", closeModal);
		}
		if (refs.overlay) {
			refs.overlay.addEventListener("click", function (event) {
				if (event.target === refs.overlay) {
					closeModal();
				}
			});
		}
		document.addEventListener("keydown", function (event) {
			if (event.key === "Escape") {
				closeModal();
			}
		});
	}

	function renderProgressSummary(progressResponse) {
		if (!refs.sectionLabel || !progressResponse || !Array.isArray(progressResponse.moduleProgress)) {
			return;
		}

		var completedModules = progressResponse.moduleProgress.filter(function (mod) {
			return mod.totalLessons > 0 && mod.completedLessons >= mod.totalLessons;
		}).length;

		refs.sectionLabel.textContent = "Modules (" + completedModules + "/" + progressResponse.moduleProgress.length + " complete)";
	}

	async function loadPage() {
		if (!window.AppApi) {
			showState("error", "Page dependencies are missing. Please refresh and try again.", true);
			return;
		}

		showState("loading", "Loading modules...");

		try {
			var responses = await Promise.all([
				window.AppApi.getLessons(),
				window.AppApi.getProgress()
			]);

			var lessonsResponse = responses[0] || {};
			var progressResponse = responses[1] || {};
			var modules = Array.isArray(lessonsResponse.modules) ? lessonsResponse.modules : [];

			if (modules.length === 0) {
				refs.modulesList.innerHTML = "";
				showState("empty", "No modules available yet.");
				return;
			}

			modules.sort(function (a, b) {
				return (a.order || 0) - (b.order || 0);
			});

			renderModules(modules);
			renderProgressSummary(progressResponse);
			hideState();
		} catch (err) {
			if (window.AppApi.handleAuthError(err)) {
				return;
			}

			showState("error", "We could not load modules right now. Please try again.", true);
		}
	}

	function init() {
		cacheDom();
		attachEventListeners();
		loadPage();
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
