(function () {
  var form;
  var emailInput;
  var passwordInput;
  var submitBtn;
  var errorEl;
  var defaultBtnText = "Login";

  function cacheDom() {
    form = document.getElementById("loginForm");
    emailInput = document.getElementById("loginEmail");
    passwordInput = document.getElementById("loginPassword");
    submitBtn = document.getElementById("loginSubmitBtn");
    errorEl = document.getElementById("loginError");
  }

  function setLoading(isLoading) {
    if (!submitBtn || !emailInput || !passwordInput) return;
    submitBtn.disabled = isLoading;
    emailInput.disabled = isLoading;
    passwordInput.disabled = isLoading;
    submitBtn.textContent = isLoading ? "Logging in..." : defaultBtnText;
  }

  function showError(message) {
    if (!errorEl) return;
    errorEl.textContent = message || "Something went wrong. Please try again.";
    errorEl.classList.add("is-visible");
  }

  function clearError() {
    if (!errorEl) return;
    errorEl.textContent = "";
    errorEl.classList.remove("is-visible");
  }

  async function submitLogin(event) {
    event.preventDefault();
    clearError();

    var email = (emailInput && emailInput.value || "").trim();
    var password = (passwordInput && passwordInput.value || "").trim();

    if (!email || !password) {
      showError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      await window.AppApi.request("/auth/login", {
        method: "POST",
        body: { email: email, password: password }
      });

      window.location.href = "/account/dashboard.html";
    } catch (err) {
      if (err && err.status === 401) {
        var invalidCreds = err.payload && err.payload.error === "Invalid email or password";
        if (invalidCreds) {
          showError("Invalid email or password.");
        } else {
          window.AppApi.handleAuthError(err);
        }
        return;
      }

      showError(err && err.message ? err.message : "Unable to log in right now.");
    } finally {
      setLoading(false);
    }
  }

  function attachEvents() {
    if (!form) return;
    form.addEventListener("submit", submitLogin);
  }

  function init() {
    cacheDom();
    attachEvents();
  }

  document.addEventListener("DOMContentLoaded", init);
})();