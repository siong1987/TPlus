LoginController = Backbone.View.extend({
  events: {
    "click #signin-btn": "signin",
  },

  // signin to Twitter
  signin: function() {
    twitterBackend.startAuthentication();
    window.close();
  },

  render: function() {
    $(this.el).html(LoginView());
    $('body').html(this.el);
  }
});

