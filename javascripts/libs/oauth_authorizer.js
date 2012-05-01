/*
 * To extract PIN code from Twitter after login page.
 */
function getAuthPin() {
  chrome.extension.sendRequest({check_pin_needed: 1}, function(response) {
    var fullText = $("#bd").text();
    if(fullText.match(/TPlus for Chrome/i) && !fullText.match(/denied/i)) {
      var pin = $.trim($("code").text());

      // Grab the code.
      var oauthMessageArea = $("#oauth_pin p");
      oauthMessageArea.css({
        '-webkit-user-select': 'text',
        'user-select': 'text',
        'cursor': 'inherit'
      });

      // Replace it with a waiting message.
      var message = "<h2>Please wait, authorizing TPlus...</h2><h2>Your PIN number is: " + pin +"</h2>";
      oauthMessageArea.html(message);

      // Load the loading animation.
      var nextOpacity = 1;
      function animateLoop() {
        if(nextOpacity == 1) nextOpacity = 0.3;
        else nextOpacity = 1;
        oauthMessageArea.animate({opacity: nextOpacity}, 500, null, animateLoop);
      }
      animateLoop();

      // Check whethe it logs in successfully
      chrome.extension.sendRequest({cr_oauth_pin: pin}, function(response) {
        var message;

        // Stop the animation.
        oauthMessageArea.css('opacity', 1).stop();
        if(response) {
          // Show the successful login message
          message = "Congratulations, you've been successfully authenticated. Enjoy TPlus!";
        } else {
          // Show the failed login message
          message = "Oops... Something went wrong. Please, try clicking TPlus icon again."
        }
        oauthMessageArea.html('<h2>' + message + '</h2>');
      });
    }
  });
}
getAuthPin();

