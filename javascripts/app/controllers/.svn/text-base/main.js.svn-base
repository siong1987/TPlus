MainController = Backbone.View.extend({
  events: {
    "keydown #tweet-area": "characterCount",
    "keyup #tweet-area": "characterCount",
    "click #tweet-btn": "tweet",
    "click #goto": "linkToTweeter",
    "click #getcurrenturl-btn": "getCurrentUrl",
    "click #sign-in": "signIn",
    "click #sign-out": "signOut",
    "click #save-btn": "save",
    "click #restore-btn": "restore",
    "click .change_user": "changeUser",
    "click #save-as-btn": "save",
    "click #save0": "restore",
    "click #save1": "restore",
    "click #save2": "restore",
    "click #save3": "restore",
    "click #save4": "restore",
    "click #save5": "restore",
    "click #save6": "restore",
    "click #save7": "restore",
    "click #save8": "restore",
    "click #save9": "restore",
    "click #deletesave0": "deleteSave",
    "click #deletesave1": "deleteSave",
    "click #deletesave2": "deleteSave",
    "click #deletesave3": "deleteSave",
    "click #deletesave4": "deleteSave",
    "click #deletesave5": "deleteSave",
    "click #deletesave6": "deleteSave",
    "click #deletesave7": "deleteSave",
    "click #deletesave8": "deleteSave",
    "click #deletesave9": "deleteSave",
    "click .styleswitch": "changeTheme"
  },

  // Saves the input text in storage.
  //
  // params:
  //   e, the event which prompted this function.
  save: function(e){
	  
    //get the ID of the button clicked
    var saveID = this.getSaveID(e);
    if( saveID == 'aborted' )
    return false;
	
    //get the text to save
    var tweetArea = $('#tweet-area');
    var value = tweetArea.val();
	
    //dont save if there is no input
    if(value.length == 0)
    return false;
    //save the text
    this.saveInputTo(saveID, value);
    this.growSaveList(saveID, value);
	
    //IMPORTANT: must return false so that append() works properly
    return false;
  },
  
  //Adds another draft to the save list
  //
  // params:
  //	value, the tweet string that was already saved in storage
  //	saveID, the ID of the listitem for this draft
  growSaveList: function(saveID, value){
	
    var startInd = 0;
    var endInd = 25;
    //set the beginning of the tweet as the preview text in the savelist
    var previewText = value.substring(startInd, endInd);
    if(value.length >= endInd)
    previewText = previewText + '...';
    var saveList = $('#save-list');
	
    //html to add current tweet to savelist
    var newSaveString = 
    '<li id="li-'+saveID+'" style="display: inline-table; width: 100%;">'+
    '	<a href="#" style=" display: table-cell; width: 100%;" id="'+saveID+'" >'+
    '       <font size="1">'+previewText+'</font>'+
    '   </a>'+
    '   <a href="#" style="display: table-cell" id="delete'+saveID+'" align="right">'+
    '		<font color="red"><b>x</b></font>'+
    '   </a>'+
    '</li>';
	
	
    //insert new tweet in the savelist
    var newSaveItem = $(newSaveString);
    newSaveItem.appendTo(saveList);
    //backup the html for this save in local storage
    localStorage['backupHTML'+saveID] = newSaveString;
	
  },

  //Gets the ID of the next save, and updates the total number of saves
  //
  //params:
  //    e, the event which prompted a save
  getSaveID: function(e){
    var totalSaves = localStorage['TotalSaves'];
    totalSaves = parseInt(totalSaves);
    //if save list is full, tell user to delete some saves
    if( totalSaves >= 10 ){
      alert('Cannot save more than 10 entries.\nPlease delete one of the other saves first.');
      return 'aborted';
    }
    //otherwise, determine next save number, and store total number of saves in storage
    var newTotalSaves = totalSaves + 1;
    localStorage['TotalSaves'] = '' + newTotalSaves;
	
    var saveNumber = this.getNextAvailableSaveNumber();
    var saveID = 'save' + saveNumber;
    return saveID;
  },
  
  //Gets the lowest available save number, to be used as the ID for the next saved draft
  getNextAvailableSaveNumber: function(){
    var i=0;
    for(i=0; i<10; i++){
      //if localStorage[save i InUse] is either false or undefined, then we can use save number i as ID for a draft
      if(	!localStorage['save'+i+'InUse'] || localStorage['save'+i+'InUse'] == 'false' ){
        localStorage['save'+i+'InUse'] = "true";
        //add i to the string of numbers representing order of the saves
        localStorage['saveNumOrder'] = (localStorage['saveNumOrder'])+i;
        return i;	
      }
    }
    //should never reach here
    //alert("Too many saves. (Should never reach this alert)");
    return -1;
	
  },
  
  //Deletes the chosen draft from list of saved drafts
  //
  //params:
  //	e, the event which triggered this delete (clicking the x next to the draft) 
  deleteSave: function(e){
    var target = $(e.currentTarget);
    var callersID = target.get(0).id;
    //start at index 6 to retrieve the "save#" substring
    var startInd = 6;
    var saveID = callersID.substring(6);
    var listitemID = 'li-'+saveID;
    var saveListItem = $('#'+listitemID);
	
    //remove selected draft from the save list
    saveListItem.remove();
    //switch boolean indicating that this save number is now available
    localStorage[''+saveID+'InUse'] = 'false';
    //decrease total save count
    var totalSaves = localStorage['TotalSaves'];
    newTotal = parseInt(totalSaves)-1;
    localStorage['TotalSaves'] = newTotal;
    //make sure the backupHTML for this save is cleared
    localStorage['backupHTML'+saveID] = '';
    this.removeSaveFromNumberOrdering(saveID);

  },
  
  //removes the number corresponding to the given saveID, from the save ordering list
  //
  //params:
  //	saveID, the the save ID containing the number to remove from the ordering
  removeSaveFromNumberOrdering: function(saveID){
    var numOrder = localStorage['saveNumOrder'];
    var numIndex = 4;
    var numToMatch = saveID.charAt(numIndex);
	
    var i=0;
    for(i=0; i<10; i++){
      var currNum = numOrder.charAt(i);
      //remove the saveID number from the ordering string
      if( currNum == numToMatch ){
        numOrder = numOrder.substr(0, i) + numOrder.substr(i+1);
        localStorage['saveNumOrder'] = numOrder;
        return;
      }
		
    }
	
  },

  // Restores the saved input text back to the textarea.
  //
  // params:
  //    e, the event which prompted this function.
  restore: function(e){
    //get the ID of the restore
    var storageKey = this.getRestoreID(e);
    this.restoreInputFrom(storageKey);
  },

  //Gets the ID of the listitem that was clicked which fired event e
  //
  //params:
  //    e, the event which prompted a restore (of a save)
  getRestoreID: function(e){
    //get the ID of the restore
    var target = $(e.currentTarget);
    //IMPORTANT NOTE: target IS JQUERY OBJECT, NOT DOM ELEMENT
    var restoreID = target.get(0).id;
    //get the key which corresponds to the requested stored text
    var storageKey = this.getLinkingSaveID(restoreID);

    return storageKey;
  },

  //Given a restoreID, returns the saveID with the same ID number
  //
  //params:
  //    restoreID: the ID of the clicked restore
  //Returns:
  //    the storage key corresponding to the requested restoration
  //    ( NULL if bad restoreID given) 
  getLinkingSaveID: function(restoreID){
    //get the ID number of the restore, so we can look in proper storage for the saved text
    if (restoreID==null || restoreID==undefined || restoreID=='')
    return 'NULL';

    var restoreIdLength = restoreID.length;
    if (restoreIdLength > 0) {
      var IDnumber = restoreID.charAt(restoreIdLength-1);
      var storageKey = "save" + IDnumber;
      return storageKey;
    } else {
      return 'NULL';
    }
  },

  // Saves the value at the specified key in storage.
  //
  // params:
  //    key, the key string to save to
  //        value, the value to save
  saveInputTo: function(key, value){
    localStorage[key] = value;
  },

  // Restores into the textarea whatever value is saved at the key
  //
  // params:
  //    key, the key from which to derive the restored text.
  restoreInputFrom: function(key){
    var tweetArea = $('#tweet-area');
    //restore the previous input in the textarea
    var restoredInput = localStorage[key];
    if(restoredInput) {
      tweetArea.val(restoredInput);
      //tweetArea.value = (restoredInput);
    }

    this.determineCharCount(tweetArea);
  },
  
  signOut: function(e) {
    var current_user = tweetManager.getCurrentUser();
    tweetManager.signOut(current_user);
    this.render();
    
  },

  changeUser: function(e) {
    var target = $(e.currentTarget);
    var username = target.html();
    var current_user = tweetManager.getCurrentUser();

    if (username !== current_user) {
      tweetManager.changeUser(username);
      $('#username').html(username);
    }
  },

  //Determines the remaining number of characters the user is allowed
  //in his tweet and displays that number. The max is 140 characters per Tweet.
  //
  //params:
  //    element, the textarea whose characters are being counted.
  determineCharCount: function(element){
    //Get the current textarea's string, and get its length
    //using the countLength() function, which considers URL lengths.
    var tweet = element.val();
    var inputStringLength = this.countLength(tweet);
    var counter = $('#counter-display');

    // TODO: 140 should be constant
    var MAX_TWEET_LENGTH = 140;
    var charactersLeft = MAX_TWEET_LENGTH;

    //change color if above max length of tweet
    if (inputStringLength > MAX_TWEET_LENGTH) {
      counter.addClass('help-inline');
    } else {
      counter.removeClass('help-inline');
    }

    //save input string to backup
    if (inputStringLength >= 0) {
      this.saveInputTo('backupInput', tweet);
    }

    //Outputs the number of remaining characters to the interface
    charactersLeft = MAX_TWEET_LENGTH - inputStringLength;
    counter.html((charactersLeft));
  },

  // Counts the number of remaining characters allowed in the text area.
  // It is triggered by the event e.
  //
  // events: keydown and keyup
  characterCount: function(e) {
    //IMPORTANT NOTE: target IS JQUERY OBJECT, NOT DOM ELEMENT
    var target = $(e.currentTarget);
    this.determineCharCount( target );
  },

  // Check the matched url pattern and return the new lengeth
  //
  // params:
  //    input to be counted
  countLength: function(input) {
    // Check the url pattern first
    var pattern = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|]*(\.)[-A-Z0-9+&@#\/%=~_|!:,.;]+)/ig;
    var matched_count = input.match(pattern);
    var new_length = input.replace(pattern, "").length;

    // if there is urls, then, count the url length as well.
    if (matched_count !== null) {
      // TODO: 20 should be as constant
      new_length = new_length + (matched_count.length * 20);
    }

    return new_length;
  },

  // opens the twitter page to show the tweets
  //events: click
  linkToTweeter: function(e) {
    // current user logged in recognized by twitter
    var current_user = tweetManager.getCurrentUser();
    // opens a new tab directly to tweet page
    window.open("http://twitter.com/#!/" + current_user)
  },

  // get the url of the current page
  //
  //events: click
  getCurrentUrl: function(e) {
	  
    var tweetarea = $('#tweet-area');
    var currentTweet = tweetarea.val();
    chrome.tabs.getSelected(null, function(tab) {
      var myTabUrl = tab.url;
      //now, fill tweetbox with the user's input, and append the URL
      tweetarea.val( currentTweet + myTabUrl);
    });
    //redetermine the character counter
    this.determineCharCount(tweetarea);
  },

  // tweet out the message
  tweet: function() {
    var tweetbox = $('#tweet-area');
    var message = tweetbox.val();
    tweetManager.tweet(message);

    // Clear up the tweetbox for next tweet.
    tweetbox.val("");
  },

  signIn: function() {
    twitterBackend.startAuthentication();
    window.close();
  },


  // Change the theme
  //
  // params:
  //   input: e, the event which prompted this function.
  changeTheme: function(e) {
    this.switchStyle(e.target.getAttribute("rel"));
    return false;
  },

  // Switch style and save
  //
  // params:
  //   input: style name
  switchStyle: function(styleName) {
    $('link[rel*=style][title]').each(function(i) 
    {
      this.disabled = true;
      if (this.getAttribute('title') == styleName) this.disabled = false;
    });
		
    // save the style name onto local storage
    localStorage["style_name"] = styleName;
  },
  
  prepareSaveList: function() {
    //if no numOrder is saved, initialize the string
    if(!localStorage['saveNumOrder'])
    localStorage['saveNumOrder'] = '';

    //if no saves so far, indicate 0 total saves
    if(!localStorage['TotalSaves']) {
      localStorage['TotalSaves'] = '0';
	
    //otherwise, restore whatever savelist was lost when user focused off of app IN ITS PREVIOUS ORDERING
    } else { 
      var numOrdering = localStorage['saveNumOrder']; 
      var backupSaveList = '';
      var i=0;
      //saves may be out of order, so look at ordering string to restore in proper order
      for( i=0; i<10; i++ ){
        var saveNum = numOrdering.charAt(i);
        var saveKey = 'backupHTMLsave' + saveNum;
        //if there exists some html to restore save #saveNum, add it to htmlstring
        if(localStorage[saveKey])
        backupSaveList = backupSaveList + localStorage[saveKey];
      }
	
      $('#save-list').append(backupSaveList);
    }
  },

  render: function() {
    // Get the current list of usernames who are logged in.
    var users = tweetManager.getUserList();
    var current_user = tweetManager.getCurrentUser();

    $(this.el).html(MainView(users, current_user));
    $('body').html(this.el);

    //populate tweetbox with cached tweet
    this.restoreInputFrom('backupInput');
    // restore/prepare the save list
    this.prepareSaveList();
	
    // Load the saved style name and switch the style
    var styleName = localStorage["style_name"];
    if (typeof(styleName) === 'undefined')
    styleName = "styles1"; // default style name
    this.switchStyle(styleName);
  }
});

