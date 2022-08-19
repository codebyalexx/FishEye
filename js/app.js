/**
 * Perform a HTTP(s) web request
 * @typedef {'GET'|'POST'|'PUT'|'DELETE'|'PATCH'} REQ_METHODS
 * @param {URL} url - The URL of the request
 * @param { REQ_METHODS } method - The method of the request
 * @returns {Promise} - The promise contains response text
 */
function request (url, method = "GET") { // eslint-disable-line no-unused-vars
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    // Request events

    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        resolve(req.responseText);
      }
    };

    req.ontimeout = () => {
      console.log("timeout");
      reject(new Error("La requête a expiré."));
    };

    req.onerror = () => {
      console.log("error");
      reject(new Error("Une erreur est survenue."));
    };

    req.onabort = () => {
      console.log("abort");
      reject(new Error("La requête a abadonné."));
    };

    req.open(method, url);
    req.send();
  });
}

/**
 * Get the highest tab index attribute through the DOM
 * @returns {number} - the highest tab index attribute trough the DOM
 */
function getLatestTabindex () { // eslint-disable-line no-unused-vars
  let picked = -1;

  document.querySelectorAll("body *").forEach((domElement) => {
    const tabIndex = domElement.tabIndex;

    // Select this tab index if he's higher than the current
    picked = picked < tabIndex ? tabIndex : picked;
  });

  return picked;
}

// Make all elements clickable with keyboard
window.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    document.activeElement.click();
  }
});
