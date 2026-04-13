(function () {
  var form;
  var nameInput;
  var emailInput;
  var passwordInput;
  var submitBtn;
  var errorEl;
  var defaultBtnText = "Sign Up";

  function cacheDom() {
    form = document.getElementById("signupForm");
    nameInput = document.getElementById("signupName");
    emailInput = document.getElementById("signupEmail");
    passwordInput = document.getElementById("signupPassword");
    submitBtn = document.getElementById("signupSubmitBtn");
    errorEl = document.getElementById("signupError");
  }

  function setLoading(isLoading) {
    if (!submitBtn || !nameInput || !emailInput || !passwordInput) return;
    submitBtn.disabled = isLoading;
    nameInput.disabled = isLoading;
    emailInput.disabled = isLoading;
    passwordInput.disabled = isLoading;
    submitBtn.textContent = isLoading ? "Creating..." : defaultBtnText;
  }

  function showError(message) {
    if (!errorEl) return;
    errorEl.textContent = message || "Unable to sign up right now.";
    errorEl.classList.add("is-visible");
  }

  function clearError() {
    if (!errorEl) return;
    errorEl.textContent = "";
    errorEl.classList.remove("is-visible");
  }

  function validateInput(username, email, password) {
    if (!username || !email || !password) {
      return "Please enter name, email, and password.";
    }
    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    clearError();

    var username = (nameInput && nameInput.value || "").trim();
    var email = (emailInput && emailInput.value || "").trim();
    var password = (passwordInput && passwordInput.value || "").trim();

    var validationMessage = validateInput(username, email, password);
    if (validationMessage) {
      showError(validationMessage);
      return;
    }

    setLoading(true);

    try {
      await window.AppApi.request("/auth/register", {
        method: "POST",
        body: {
          username: username,
          email: email,
          password: password
        }
      });

      window.location.href = "/account/dashboard.html";
    } catch (err) {
      if (err && err.status === 401) {
        window.AppApi.handleAuthError(err);
        return;
      }

      if (err && err.payload && typeof err.payload.error === "string" && err.payload.error.trim()) {
        showError(err.payload.error);
        return;
      }

      showError(err && err.message ? err.message : "Unable to sign up right now.");
    } finally {
      setLoading(false);
    }
  }

  function attachEvents() {
    if (!form) return;
    form.addEventListener("submit", handleSubmit);
  }

  function init() {
    cacheDom();
    attachEvents();
  }

  document.addEventListener("DOMContentLoaded", init);
})();