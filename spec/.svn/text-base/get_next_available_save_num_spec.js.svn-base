/*
TEST: -tests for getNextAvailableSaveNumber.
	  -tests to make sure that getting available save numbers works properly

*/

describe("getNextAvailableSaveNum", function() {
  var main_controller;
  //var mockup;
  
  beforeEach(function() {
    main_controller = new MainController();
	var i =0;
	for(i=0; i<10; i++){
	localStorage['save'+i+'InUse'] = 'false';
	}
	

  });

  //check to make sure basic case works: return 0 if no slots used
  describe("#getNextAvailableSaveNumber", function() {
    it("should get the lowest available int: 0", function() {
      var num = main_controller.getNextAvailableSaveNumber();
	  var expected = 0;
	  expect(num).toEqual(expected);
    });
  });
  
  
  //check to make sure it gets next available number after the in-use slot
 describe("#getNextAvailableSaveNumber", function() {
    it("should get the next lowest available integer", function() {
	  localStorage['save0InUse'] = 'true';
      var num = main_controller.getNextAvailableSaveNumber();
	  var expected = 1;
	  expect(num).toEqual(expected);
    });
  });
  
  
  //check to make sure that the found available slot is set to 'true' after being found
  describe("#getNextAvailableSaveNumber", function() {
    it("should switch open slot to true", function() {
	  localStorage['save0InUse'] = 'true';
	  localStorage['save1InUse'] = 'false';
	  localStorage['save2InUse'] = 'true';
      var num = main_controller.getNextAvailableSaveNumber();
	  var expected = 'true';
	  expect(localStorage['save1InUse']).toEqual(expected);
    });
  });
  
  //check that the number in between 2 used numbers is found
  describe("#getNextAvailableSaveNumber", function() {
    it("should retrieve number in between 2 used numbers with false indicator", function() {
	  localStorage['save0InUse'] = 'true';
	  localStorage['save1InUse'] = 'false';
	  localStorage['save2InUse'] = 'true';
      var num = main_controller.getNextAvailableSaveNumber();
	  var expected = 1;
	  expect(num).toEqual(expected);
    });
  });
  
  //check to make sure that if all slots taken, -1 is returned
  describe("#getNextAvailableSaveNumber", function() {
    it("all 10 slots are taken, so should return -1", function() {
	  var maxSaves = 10;
	  for(var i=0; i<maxSaves; i++){
		localStorage['save'+i+'InUse'] = 'true';
	  }
      var num = main_controller.getNextAvailableSaveNumber();
	  var expected = -1;
	  expect(num).toEqual(expected);
    });
  });
 




});
