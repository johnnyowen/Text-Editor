const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
  // this event object holds information about the installation prompt and allows you to control when to show the prompt to the user
  window.deferredPrompt = event;
  // not hiding the button if install is available
  butInstall.classList.toggle("hidden", false);
});

butInstall.addEventListener("click", async () => {
  // this line retrieves the window.deferredPrompt object, which was set when the "beforeinstallprompt" event was fired, this object holds information about the installation prompt
  const promptEvent = window.deferredPrompt;
  // this condition checks if promptEvent is falsy, if so, the installation prompt event is not available or has already been used, so the function returns early
  if (!promptEvent) return;
  // invokes the prompt() method on the promptEvent object, so user can confirm installation
  promptEvent.prompt();
  // after the prompt is shown, this line sets the window.deferredPrompt object to null, indicating that the prompt has been used
  window.deferredPrompt = null;
  // changes the css class to hide the install button
  butInstall.classList.toggle("hidden", true);
});

window.addEventListener("appinstalled", (event) => {
  // same as above
  window.deferredPrompt = null;
});
