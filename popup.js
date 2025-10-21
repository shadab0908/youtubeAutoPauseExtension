const checkbox = document.getElementById("autoResumeToggle");


chrome.storage.sync.get("autoResume", (data) => {
  checkbox.checked = data.autoResume ?? false;
});


checkbox.addEventListener("change", () => {
  chrome.storage.sync.set({ autoResume: checkbox.checked });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "updateSettings",
      autoResume: checkbox.checked,
    });
  });
});
