describe("SaveInput", function() {
  var main_controller;
  //var mockup;
  
  beforeEach(function() {
    main_controller = new MainController();
	
	

  });

  describe("#getLinkingSaveID", function() {
    it("should get normal save ID", function() {
	  var testRestoreID = 'restore7';
	  var expectedSaveID = 'save7';
      var actualSaveID = main_controller.getLinkingSaveID(testRestoreID);
	  expect(actualSaveID).toEqual(expectedSaveID);
    });
  });
  
  describe("#getLinkingSaveID", function() {
    it("should get non-numeric saveID", function() {
	  var testRestoreID = 'restoreA';
	  var expectedSaveID = 'saveA';
      var actualSaveID = main_controller.getLinkingSaveID(testRestoreID);
	  expect(actualSaveID).toEqual(expectedSaveID);
    });
  });
  
  describe("#getLinkingSaveID", function() {
    it("should return NULL due to empty ID", function() {
	  var testRestoreID = '';
	  var expectedSaveID = 'NULL';
      var actualSaveID = main_controller.getLinkingSaveID(testRestoreID);
	  expect(actualSaveID).toEqual(expectedSaveID);
    });
  });
  
  describe("#getLinkingSaveID", function() {
    it("should return NULL due to NULL ID", function() {
	  var testRestoreID;
	  var expectedSaveID = 'NULL';
      var actualSaveID = main_controller.getLinkingSaveID(testRestoreID);
	  expect(actualSaveID).toEqual(expectedSaveID);
    });
  });
  
  
 




});