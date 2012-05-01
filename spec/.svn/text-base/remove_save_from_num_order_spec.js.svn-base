/*
TEST: -tests for removeSaveFromNumOrdering.
	  -tests to make sure that numbers are properly removed from their save ordering

*/

describe("removeSaveFromNumOrdering", function() {
  var main_controller;
  //var mockup;
  
  beforeEach(function() {
    main_controller = new MainController();
	localStorage['saveNumOrder'] = '';
	

  });

  //check basic case of removing a single number from ordering with single number
  describe("#removeSaveFromNumOrdering", function() {
    it("remove a single number from a basic ordering", function() {
      var numOrder = '0';
	  localStorage['saveNumOrder'] = numOrder;
	  var saveID = 'save0';
	  main_controller.removeSaveFromNumberOrdering(saveID);
	  
	  var actualOrder = localStorage['saveNumOrder'];
	  var expected = '';
	  expect(actualOrder).toEqual(expected);
    });
  });
  
  
 //middle number removal
  describe("#removeSaveFromNumOrdering", function() {
    it("remove a number in the middle of an ordering", function() {
      var numOrder = '012345';
	  localStorage['saveNumOrder'] = numOrder;
	  var saveID = 'save3';
	  main_controller.removeSaveFromNumberOrdering(saveID);
	  
	  var actualOrder = localStorage['saveNumOrder'];
	  var expected = '01245';
	  expect(actualOrder).toEqual(expected);
    });
  });
  
  //end number removal
  describe("#removeSaveFromNumOrdering", function() {
    it("remove number at end of ordering", function() {
      var numOrder = '012345';
	  localStorage['saveNumOrder'] = numOrder;
	  var saveID = 'save5';
	  main_controller.removeSaveFromNumberOrdering(saveID);
	  
	  var actualOrder = localStorage['saveNumOrder'];
	  var expected = '01234';
	  expect(actualOrder).toEqual(expected);
    });
  });
  
  //remove multiple numbers from full ordering
  describe("#removeSaveFromNumOrdering", function() {
    it("remove multiple numbers from a full ordering", function() {
      var numOrder = '0123456789';
	  localStorage['saveNumOrder'] = numOrder;
	  var saveID1 = 'save9';
	  var saveID2 = 'save8';
	  var saveID3 = 'save3';
	  main_controller.removeSaveFromNumberOrdering(saveID1);
	  main_controller.removeSaveFromNumberOrdering(saveID2);
	  main_controller.removeSaveFromNumberOrdering(saveID3);
	  
	  var actualOrder = localStorage['saveNumOrder'];
	  var expected = '0124567';
	  expect(actualOrder).toEqual(expected);
    });
  });
 




});
