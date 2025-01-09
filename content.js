chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCaptcha") {
    const captchaSpan = document.querySelector('.captcha-area .captcha');
    const captchaText = captchaSpan ? captchaSpan.innerText.trim() : "";

    const captchaInput = document.querySelector('.captcha-area input[type="text"]');

    if (captchaText && captchaInput) {
      captchaInput.value = captchaText;

      const confirmButton = document.querySelector('.btn-confirm-captcha');
      if (confirmButton) {
        confirmButton.click();
      }

      sendResponse({ success: true, captchaText: captchaText });
    } else {
      sendResponse({ success: false, error: "Captcha bulunamadı!"});
    }
  }
});
