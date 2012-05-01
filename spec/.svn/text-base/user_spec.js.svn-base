describe("UserTests", function() {
  var tweet_manager;

  beforeEach(function() {
    tweet_manager = new TweetManager();
  });
  
  describe("#gettingCurrentUserDirectlyFromPersistence", function() {
    it("should get the user in persistence", function() {
      var current_user_in_persist = Persistence.currentUser().val();
      var current_user = tweet_manager.getCurrentUser();
	  expect(current_user_in_persist).toEqual(current_user);
    });
  });
  
  describe("#gettingCurrentUser", function() {
    it("should get the user in persistence", function() {
      Persistence.currentUser().save('testUser');
      var current_user = tweet_manager.getCurrentUser();
	  expect('testUser').toEqual(current_user);
    });
    
    it("should get the latest user", function() {
      Persistence.currentUser().save('testUser1');
      Persistence.currentUser().save('testUser2');
      var current_user = tweet_manager.getCurrentUser();
	  expect('testUser2').toEqual(current_user);
    });
    
    it("should get nothing", function() {
      Persistence.currentUser().save('');
      var current_user = tweet_manager.getCurrentUser();
	  expect(undefined).toEqual(current_user);
    });
  });
  
});
