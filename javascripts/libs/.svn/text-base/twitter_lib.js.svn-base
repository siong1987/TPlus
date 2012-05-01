function TwitterLib(onAuthenticated, baseUrl, baseOauthUrl, baseSigningUrl, baseOauthSigningUrl, oauthTokenData, currentUser) {
  this.onAuthenticated = onAuthenticated;
  var _this = this;
  // Initiate the TwitterOAuth library with the correct parameters
  this.oauthLib = new TwitterOAuth(oauthTokenData, currentUser, function() {
    if(!_this.username()) {
      _this.verifyCredentials(function() {
        _this.onAuthenticated();
      });
    } else {
      _this.onAuthenticated();
    }
  });

  if(!baseUrl.match(/\/$/)) {
    baseUrl = baseUrl + '/';
  }
  TwitterLib.URLS = {
    BASE: baseUrl,
    BASE_OAUTH: baseOauthUrl,
    BASE_SIGNING: baseSigningUrl,
    BASE_OAUTH_SIGNING: baseOauthSigningUrl,
  };
}
TwitterLib.prototype = {
  // Get the current username
  username: function() {
    return this.oauthLib.screen_name;
  },

  // Check whether use is authenticated
  authenticated: function() {
    return this.oauthLib.authenticated;
  },

  // Get the returned token.
  tokenRequested: function() {
    return this.oauthLib.tokenRequested;
  },

  // Starts the authenticating process.
  authenticating: function() {
    return this.oauthLib.authenticating;
  },

  // Get back the request token.
  startAuthentication: function() {
    if(!this.oauthLib.authenticating) {
      this.oauthLib.getRequestToken();
    }
  },

  // Gererate the proper Oauth headers
  generateOauthHeader: function(signedData, includeRealm) {
    var authorization = 'OAuth ';
    if(includeRealm) {
      authorization += 'realm="http://api.twitter.com/", ';
    }
    authorization += 'oauth_consumer_key="' + signedData.oauth_consumer_key + '", ' +
    'oauth_signature_method="HMAC-SHA1", ' +
    'oauth_token="' + signedData.oauth_token + '", ' +
    'oauth_timestamp="' + signedData.oauth_timestamp + '", ' +
    'oauth_nonce="' + encodeURIComponent(signedData.oauth_nonce) + '", ' +
    'oauth_version="1.0", ' +
    'oauth_signature="' + encodeURIComponent(signedData.oauth_signature) + '"';

    return authorization;
  },

  // Sign the oauth
  signOauthEcho: function(xhr, url) {
    var signedData = this.oauthLib.prepareSignedParams(url, {}, 'GET');

    xhr.setRequestHeader('X-Auth-Service-Provider', url);
    xhr.setRequestHeader('X-Verify-Credentials-Authorization', this.generateOauthHeader(signedData, true));
  },

  // Sign the oauth
  signOauth: function(xhr, url, params, method) {
    var signedData = this.oauthLib.prepareSignedParams(url, params, method);

    xhr.setRequestHeader('Authorization', this.generateOauthHeader(signedData));
  },

  // Wrapper for the ajax request
  ajaxRequest: function(url, callback, context, requestParams, httpMethod, useSearchAPI, overriddenTimeout) {
    if(!httpMethod) {
      httpMethod = "GET";
    }
    if(!requestParams) {
      requestParams = {};
    }
    var requestUrl;
    if(useSearchAPI) {
      requestUrl = TwitterLib.URLS.BASE_SEARCH + ".json";
    } else {
      requestUrl = TwitterLib.URLS.BASE + url + ".json";
    }
    var _this = this;
    var beforeSendCallback = function(request, settings) {
      if(!useSearchAPI) {
        var signingUrl = TwitterLib.URLS.BASE_SIGNING + url + ".json";
        _this.signOauth(request, signingUrl, requestParams, httpMethod);
      }
    };
    var errorCallback = function (request, status, error) {
      if(_this.ignoreRequests) {
        return;
      }
      console.warn("Failed Request", requestUrl + '?' + $.param(requestParams), request, status, error);
      var fmtError;
      if(status == 'timeout') {
        fmtError = "(timeout)";
      } else {
        try {
          if(request && request.readyState == 4) {
            if(request.status == 401) {
              if(_this.oauthLib.adjustTimestamp(request, 'Date')) {
                console.log('Unauthorized, trying again using adjusted timestamp based on server time.');
                _this.ajaxRequest(url, callback, context, requestParams, httpMethod, useSearchAPI, overriddenTimeout);
                return;
              } else if(url.match("home_timeline") || url.match("mentions") || url.match('direct_messages')) {
                _this.ignoreRequests = true;
                TweetManager.instance.signoutAndReauthenticate();
              }
            } else if(request.status == 403 && url.match('direct_messages')) {
              var accessLevel = request.getResponseHeader('X-Access-Level') || _this.lastAccessLevel;
              if(accessLevel) {
                if(accessLevel.match('directmessages')) {
                  // The permission level is correct so that's some bizarre glitch
                  TweetManager.instance.disableDMS();
                } else {
                  _this.ignoreRequests = true;
                  TweetManager.instance.signoutAndReauthenticate();
                }
              }
            }
          }
        } catch(e) {
          /* Ignoring */
        }
      }
      if(!fmtError) {
        try {
          if(!request.responseText) {
            throw 'no response';
          }
          var rspObj = JSON.parse(request.responseText);
          fmtError = '"' + rspObj.error + '"(' + request.statusText + ')';
        } catch(e) {
          fmtError = '"' + error + '"(' + status + ')';
        }
      }
      callback(false, null, fmtError, context, request);
    };
    var successCallback = function(data, status, request) {
      if(_this.ignoreRequests) {
        return;
      }
      if(request.status === 0) {
        // Empty responses are a pain...
        errorCallback(request, 'error', 'empty response');
        return;
      }
      if(!data) {
        data = [];
      } else if(useSearchAPI) {
        if(data) {
          data = data.results;
        }
        if(!data) {
          data = [];
        }
      }
      callback(true, data, status, context, request);
    };
    $.ajax({
      type: httpMethod,
      url: requestUrl,
      data: requestParams,
      dataType: "json",
      timeout: overriddenTimeout,
      success: successCallback,
      error: errorCallback,
      beforeSend: beforeSendCallback,
      complete: function(request) {
        if(!request) return;
        try {
          var remaining = request.getResponseHeader("X-RateLimit-Remaining");
          if(remaining) {
            _this.remainingHitsCount = remaining;
            _this.nextHitsReset = request.getResponseHeader("X-RateLimit-Reset");
            _this.hourlyLimit = request.getResponseHeader("X-RateLimit-Limit");
            var accessLevel = request.getResponseHeader('X-Access-Level');
            if(accessLevel) {
              _this.lastAccessLevel = accessLevel;
            }

            _this.onHitsUpdated(_this.remainingHitsCount, _this.nextHitsReset, _this.hourlyLimit);
          }
        } catch(e) { /* ignoring */ }
      }
    });
  },

  // Verify the credentials.
  verifyCredentials: function(callback) {
    var _this = this;
    this.ajaxRequest("account/verify_credentials", function(success, data) {
      if(success) {
        _this.oauthLib.screen_name = data.screen_name;
      }
      if(callback) {
        callback(success, data);
      }
    });
  },

  // Change to a new user.
  changeUser: function(username) {
    this.oauthLib.changeUser(username);
  },

  // Tweet out a tweet.
  tweet: function(callback, msg) {
    var params = { status: msg };
    this.ajaxRequest('statuses/update', callback, null, params, "POST", false, 30000);
  },

  // Get friends ids.
  friendsIds: function(callback) {
    var params = {
      cursor: -1
    };
    this.ajaxRequest('friends/ids/' + this.username(), callback, null, params, "GET");
  },

  // Lookup a particular users
  lookupUsers: function(callback, usersIdList) {
    var params = {
      user_id: usersIdList.join(',')
    };
    this.ajaxRequest('users/lookup', callback, null, params, "GET");
  },
};

/*
 * The actually OAuth instance.
 */
var globalOAuthInstance;
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if(!globalOAuthInstance)
    return;
  if(request.identica_request_token) {
    if(!globalOAuthInstance.authenticated && globalOAuthInstance.tokenRequested) {
      if(globalOAuthInstance.oauth_token == request.identica_request_token) {
        globalOAuthInstance.authenticating = true;
        globalOAuthInstance.getAccessToken.call(globalOAuthInstance, '', function() {
          chrome.tabs.remove(sender.tab.id);
        });
      }
    }
  }
  if(request.check_pin_needed) {
    if(globalOAuthInstance.tokenRequested) {
      sendResponse({});
    }
    return;
  }
  var pin = request.cr_oauth_pin;
  if(pin) {
    globalOAuthInstance.authenticating = true;
    globalOAuthInstance.getAccessToken.call(globalOAuthInstance, pin, sendResponse);
  }
});

/*
 * Wrapper OAuth instance for Twitter
 */
function TwitterOAuth(oauthTokenData, currentUser, onAuthenticated) {
  this.user_id = null;
  this.screen_name = null;
  this.authenticated = false;
  this.onAuthenticated = onAuthenticated;
  this.responseCallback = null;
  this.authenticating = false;
  this.tokenRequested = false;
  this.timeAdjusted = false;
  this.oauthTokenData = oauthTokenData;
  this.currentUser = currentUser;
  this.consumerSecret = Constants.secretKeys.consumerSecret;
  this.consumerKey    = Constants.secretKeys.consumerKey;

  globalOAuthInstance = this;

  var _this = this;
  var cachedToken;
  if (typeof(this.oauthTokenData.val()) !== 'undefined') {
    cachedToken = this.oauthTokenData.val()[this.currentUser.val()];
  }
  if(cachedToken) {
    this.authenticating = true;
    this.tokenRequested = true;
    setTimeout(function() {
      _this.accessTokenCallback.call(_this, cachedToken);
    }, 0);
  }
}
TwitterOAuth.prototype = {
  // Get the access token
  getAccessToken: function(pin, callback) {
    this.responseCallback = callback;
    this.makeRequest.call(this, 'access_token',
      { oauth_verifier: pin }, this.accessTokenCallback);
  },

  // Get ready to sign signed params
  prepareSignedParams: function(url, params, httpMethod) {
    var accessor = {
      consumerSecret: this.consumerSecret,
      tokenSecret: this.oauth_token_secret
    };
    if(!httpMethod)
      httpMethod = 'POST';
    var message = {
      action: url,
      method: httpMethod,
      parameters: [
        ['oauth_consumer_key', this.consumerKey],
        ['oauth_signature_method', 'HMAC-SHA1']
      ]
    };
    if(this.oauth_token) {
      OAuth.setParameter(message, 'oauth_token', this.oauth_token);
    }
    for(var p in params) {
      OAuth.setParameter(message, p, params[p]);
    }
    OAuth.completeRequest(message, accessor);
    return OAuth.getParameterMap(message.parameters);
  },

  // Adjust the timestamp
  adjustTimestamp: function(request) {
    var serverHeaderFields = ['Last-Modified', 'Date'];
    var serverTimestamp;
    for(var i = 0, len = serverHeaderFields.length; i < len; ++i) {
      var headerField = serverHeaderFields[i];
      var fieldValue = request.getResponseHeader(headerField);
      if(!fieldValue) {
        continue;
      }
      serverTimestamp = Date.parse(fieldValue);
      if(serverTimestamp && !isNaN(serverTimestamp)) {
        break;
      }
    }
    if(serverTimestamp) {
      var beforeAdj = OAuth.timeCorrectionMsec;
      OAuth.timeCorrectionMsec = serverTimestamp - (new Date()).getTime();
      if(Math.abs(beforeAdj - OAuth.timeCorrectionMsec) > 5000) {
        console.log("Server timestamp: " + serverTimestamp + " Correction (ms): " + OAuth.timeCorrectionMsec);
        return true;
      }
    }
    return false;
  },

  // Create the request
  makeRequest: function(url, params, callback) {
    var signingUrl = TwitterLib.URLS.BASE_OAUTH_SIGNING + url;
    var signedParams = this.prepareSignedParams(signingUrl, params);
    var requestUrl = TwitterLib.URLS.BASE_OAUTH + url;
    var _this = this;
    $.ajax({
      type: 'POST',
      url: requestUrl,
      data: signedParams,
      success: function(data, status, xhr) {
        callback.call(_this, data, status, xhr);
      },
      error: function (request, status, error) {
        var fmtError = '';
        try {
          if(_this.adjustTimestamp(request)) {
            console.log('First OAuth token request failed: ' + status + '. Trying again using adjusted timestamp.');
            callback.call(_this, null, null, true);
            return;
          }
          fmtError = '"' + request.responseText + '"(' + request.statusText + ')';
        } catch(e) {
          fmtError = '"' + error + '"(' + status + ')';
        }
        callback.call(_this, null, fmtError);
      }
    });
  },

  // Change to a new user
  changeUser: function(username) {
    var data = this.oauthTokenData.val()[username];

    var paramMap = OAuth.getParameterMap(data);
    this.oauth_token = paramMap['oauth_token'];
    this.oauth_token_secret = paramMap['oauth_token_secret'];
    this.user_id = paramMap['user_id'];
    this.screen_name = paramMap['screen_name'];
    this.currentUser.save(username);
  },

  // Callback after getting the access token.
  accessTokenCallback: function(data, status, xhr) {
    this.authenticating = false;
    var success = true;
    if(!data) {
      success = false;
      this.error = status;
      console.log('accessTokenCallback error: ' + status);
    } else {
      var paramMap = OAuth.getParameterMap(data);
      this.oauth_token = paramMap['oauth_token'];
      this.oauth_token_secret = paramMap['oauth_token_secret'];
      this.user_id = paramMap['user_id'];
      this.screen_name = paramMap['screen_name'];
      this.authenticated = true;

      if (this.oauthTokenData.val() == undefined) {
        var users = {};
        users[this.screen_name] = data;
      } else {
        var users = this.oauthTokenData.val();
        users[this.screen_name] = data;
      }
      this.currentUser.save(this.screen_name);
      this.oauthTokenData.save(users);

      if(this.onAuthenticated) {
        this.onAuthenticated();
      }
    }
    if(this.responseCallback) {
      try {
        this.responseCallback(success);
      } catch(e) { /* ignoring */ }
    }
  },

  // Callback after getting the request token.
  requestTokenCallback: function(data, status, tryAgain) {
    var _this = this;
    var alertRequestError = function(errorMsg) {
      _this.error = errorMsg;
      console.log('requestTokenCallback error: ' + errorMsg);
    };
    if(!data) {
      if(tryAgain) {
        this.getRequestToken();
        return;
      }
      alertRequestError(status);
      return;
    }

    var paramMap = OAuth.getParameterMap(data);
    this.oauth_token = paramMap['oauth_token'];
    this.oauth_token_secret = paramMap['oauth_token_secret'];

    if(!this.oauth_token || !this.oauth_token_secret) {
      alertRequestError("Invalid oauth_token: " + data);
      return;
    }

    chrome.tabs.create({
      "url": TwitterLib.URLS.BASE_OAUTH + 'authorize?oauth_token=' + this.oauth_token,
      "selected": true
    });
    this.tokenRequested = true;
  },

  // Get the request token.
  getRequestToken: function() {
    this.oauth_token_secret = '';
    this.oauth_token = null;
    this.makeRequest('request_token', {}, this.requestTokenCallback);
  }
};

