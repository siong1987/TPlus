/*
 * TweetManager
 */
function TweetManager() {
  this.oauthTokenData = Persistence.oauthTokenData();
  this.currentUser = Persistence.currentUser();

  var _this = this;
  this.authenticated = false;
  this.twitterBackend = new TwitterLib(
    function onAuthenticated() {
      _this.authenticated = true;
      _this.retrieveFollowingUsers();
    },
    Constants.service.base_url,
    Constants.service.base_oauth_url,
    Constants.service.base_signing_url,
    Constants.service.base_oauth_signing_url,
    this.oauthTokenData,
    this.currentUser
  );
}
TweetManager.prototype = {
  // Tweet out the message.
  tweet: function(msg) {
    this.twitterBackend.tweet(function(success) {
      if (!success) {
        alert('error posting to Twitter.');
      }
    }, msg);
  },

  // Get list of users.
  getUserList: function() {
    return _.keys(this.oauthTokenData.val());
  },

  // Get the current user.
  getCurrentUser: function() {
    return this.currentUser.val();
  },

  // Sign out.
  signOut: function(username) {
    // Delete the user data
    var data = this.oauthTokenData.val();
    delete data[username];
    this.oauthTokenData.save(data);

    var newUser = this.getUserList()[0];
    if (typeof(newUser) === 'undefined') {
      Persistence.cleanup();
    } else {
      this.changeUser(newUser);
    }
  },

  // Change user.
  changeUser: function(username) {
    this.twitterBackend.changeUser(username);
  },

  // Get the user data.
  retrieveUsersData: function(usersIdList) {
    var _this = this;
    this.twitterBackend.lookupUsers(function(success, users) {
      if(!success) {
        // Try again in a while...
        setTimeout(function() {
          _this.retrieveUsersData(usersIdList);
        }, 120000);
        return;
      }
      for(var i = 0, len = users.length; i < len; ++i) {
        var user = users[i];
        _this.followingUsersMap[user.screen_name] = user;
        _this.followingUsersNames.push(user.screen_name);
      }
      _this.followingUsersNames.sort(function(a, b) {
        return a.toUpperCase().localeCompare(b.toUpperCase());
      });
    }, usersIdList);
  },

  // Get all the following users.
  retrieveFollowingUsers: function() {
    this.followingUsersNames = [];
    this.followingUsersMap = {};
    var _this = this;
    this.twitterBackend.friendsIds(function(success, usersData) {
      if(!success) {
        // Try again in a while...
        setTimeout(function() {
          _this.retrieveFollowingUsers();
        }, 120000);
        return;
      }
      var idsList = usersData.ids;
      if(!idsList) {
        idsList = [];
      }
      for(var i = 0, len = Math.ceil(idsList.length / 100.0); i < len; ++i) {
        var firstIndex = i * 100;
        var idsListSlice = idsList.slice(firstIndex, firstIndex + 100);
        _this.retrieveUsersData(idsListSlice);
      }
    });
  }
};
TweetManager.instance = new TweetManager();

