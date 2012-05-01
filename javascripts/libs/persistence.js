/*
 * This library is to be used to store values into LocalStorage.
 */
Persistence = {
  /*
   * Load the ValueWrapper for LocalStorage.
   */
  load: function (key) {
    return new ValueWrapper(key);
  },

  /*
   * Check whether the key is an object.
   */
  isObject: function(key) {
    return !!this.objectKeys[key];
  },

  /*
   * Add new object.
   */
  addObject: function(key) {
    this.objectKeys[key] = true;
    this.objectKeysVar.save(this.objectKeys);
  },

  /*
   * Creating helper methods for each persistence entry (load() shoudn't be used directly)
   */
  init: function() {
    this.objectKeys = {'object_keys': true};
    this.objectKeysVar = this.load('object_keys');
    this.objectKeys = this.objectKeysVar.val() || {};

    var existingKeys = ['oauth_token_data', 'current_user'];

    var _this = this;
    for(var i = 0, len = existingKeys.length; i < len; ++i) {
      var currentKey = existingKeys[i];
      var methodName = currentKey.replace(/_(\w)/g, function(m1, m2) { return m2.toUpperCase(); });
      this[methodName] = (function(key) {
        return function() {
          return _this.load(key);
        };
      })(currentKey);
    }
  },

  /*
   * Cleanup the LocalStorage
   */
  cleanup: function() {
    localStorage.removeItem('current_user');
    localStorage.removeItem('oauth_token_data');
  }
};

/*
 * A wrapper for LocalStorage in order to make LocalStorage able to store not just value
 * but any data structure.
 */
function ValueWrapper(key) {
  this.key = key;
}
ValueWrapper.prototype = {
  /*
   * Save the object.
   */
  save: function(value) {
    if((typeof value) != 'string') {
      if(!Persistence.isObject(this.key)) {
        Persistence.addObject(this.key);
      }
      value = JSON.stringify(value);
    }
    localStorage[this.key] = value;
    return value;
  },

  /*
   * Get the value of the object.
   */
  val: function() {
    var value = localStorage[this.key];
    if(!value) {
      return undefined;
    }
    if(Persistence.isObject(this.key)) {
      value = JSON.parse(value);
    }
    return value;
  },

  /*
   * Remove the object.
   */
  remove: function() {
    return localStorage.removeItem(this.key);
  }
};

Persistence.init();
