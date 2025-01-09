document.addEventListener("DOMContentLoaded", () => {
  const getCaptchaButton = document.getElementById("getCaptchaButton");
  const captchaOutput = document.getElementById("captchaOutput");
  const errorOutput = document.getElementById("errorOutput");

  getCaptchaButton.addEventListener("click", () => {
    // Send message to content script to retrieve captcha
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getCaptcha" }, (response) => {
          if (response && response.success) {
            captchaOutput.textContent = `Captcha: ${response.captchaText}`;
            errorOutput.textContent = ""; // Clear error message
          } else {
            captchaOutput.textContent = ""; // Clear previous captcha text
            errorOutput.textContent = response ? response.error : "An unexpected error occurred.";
          }
        });
      }
    });
  });
});