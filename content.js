console.log("YouTube Auto Pause Pro loaded.");


let autoResume = false;


chrome.storage.sync.get("autoResume", (data) => {
  autoResume = data.autoResume ?? false;
  console.log("Auto-resume:", autoResume);
});

function getVideo() {
  return document.querySelector("video");
}

document.addEventListener("visibilitychange", () => {
  const video = getVideo();
  if (!video) return;

  if (document.hidden) {
    if (!video.paused) {
      video.pause();
      console.log("⏸️ Video paused (tab hidden)");
    }
  } else if (autoResume) {
    video.play().catch(() => {});
    console.log("▶️ Video resumed (tab visible)");
  }
});


chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "updateSettings") {
    autoResume = msg.autoResume;
  }
});
