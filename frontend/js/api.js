(function () {
  var JSON_HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  function isPlainObject(value) {
    return value !== null &&
      typeof value === "object" &&
      !(value instanceof FormData);
  }

  async function request(path, options) {
    var opts = Object.assign(
      {
        method: "GET",
        credentials: "include",
        headers: {}
      },
      options || {}
    );

    opts.headers = Object.assign({}, JSON_HEADERS, opts.headers || {});

    if (isPlainObject(opts.body)) {
      opts.body = JSON.stringify(opts.body);
    }

    var res = await fetch(path, opts);

    var contentType = res.headers.get("content-type") || "";
    var payload;
    if (contentType.indexOf("application/json") !== -1) {
      payload = await res.json();
    } else {
      payload = await res.text();
    }

    if (!res.ok) {
      var message = "Request failed (" + res.status + ")";
      if (payload && typeof payload === "object" && payload.error) {
        message = payload.error;
      }

      var err = new Error(message);
      err.status = res.status;
      err.payload = payload;
      throw err;
    }

    return payload;
  }

  function handleAuthError(err) {
    if (err && err.status === 401) {
      window.location.href = "/login.html";
      return true;
    }
    return false;
  }

  function getProfile() {
    return request("/profile");
  }

  function getProgress() {
    return request("/profile/progress");
  }

  function updateAvatar(avatar) {
    return request("/profile/avatar", {
      method: "PUT",
      body: { avatar: avatar }
    });
  }

  function updateAddress(address) {
    return request("/profile/address", {
      method: "PUT",
      body: address
    });
  }

  function getLessons() {
    return request("/lessons");
  }

  function getLesson(lessonId) {
    return request("/lessons/" + encodeURIComponent(lessonId));
  }

  function completeLesson(lessonId) {
    return request("/lessons/" + encodeURIComponent(lessonId) + "/complete", {
      method: "POST"
    });
  }

  function getPrizes() {
    return request("/prizes");
  }

  function redeemPrize(prizeId) {
    return request("/prizes/" + encodeURIComponent(prizeId) + "/redeem", {
      method: "POST"
    });
  }

  function getRedeemedPrizes() {
    return request("/prizes/redeemed");
  }

  function redeemCode(code) {
    return request("/codes/redeem", {
      method: "POST",
      body: { code: code }
    });
  }

  function updatePassword(currentPassword, newPassword) {
    return request("/profile/password", {
      method: "PUT",
      body: { currentPassword: currentPassword, newPassword: newPassword }
    });
  }

  window.AppApi = {
    request: request,
    handleAuthError: handleAuthError,
    getProfile: getProfile,
    getProgress: getProgress,
    updateAvatar: updateAvatar,
    updateAddress: updateAddress,
    getLessons: getLessons,
    getLesson: getLesson,
    completeLesson: completeLesson,
    getPrizes: getPrizes,
    redeemPrize: redeemPrize,
    getRedeemedPrizes: getRedeemedPrizes,
    redeemCode: redeemCode,
    updatePassword: updatePassword
  };
})();
