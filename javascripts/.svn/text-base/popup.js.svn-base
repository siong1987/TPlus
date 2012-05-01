var backgroundPage = chrome.extension.getBackgroundPage();
var tweetManager = backgroundPage.TweetManager.instance;
var twitterBackend = tweetManager.twitterBackend;

document.addEventListener('DOMContentLoaded', function () {
  if (twitterBackend.authenticated()) {
    main_controller = new MainController();
    main_controller.render();
  } else {
    login_controller = new LoginController();
    login_controller.render();
  }
});
