describe("SaveInput", function() {
  var main_controller;
  //var mockup;
  
  beforeEach(function() {
    main_controller = new MainController();
	
	

  });

  describe("#saveInputTo", function() {
    it("should save plain text input", function() {
	  var testString = 'xyz';
	  var testKey = 'testStorage1';
      main_controller.saveInputTo(testKey, testString);
	  expect(localStorage[testKey]).toEqual(testString);
    });
  });
  
  
  describe("#saveInputTo", function() {
    it("should save empty string", function() {
	  var emptyString = '';
	  var testKey = 'testStorage2';
      main_controller.saveInputTo(testKey, emptyString);
	  expect(localStorage[testKey]).toEqual(emptyString);
    });
  });
  
  
  describe("#saveInputTo", function() {
    it("should save redundant, long string", function() {
	 var redundantString = 'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
	 					   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.' +
						   'REDUNDANT. REDUNDANT. REDUNDANT. REDUNDANT.';
					
	  var testKey = 'testStorage3';			
      main_controller.saveInputTo(testKey, redundantString);
	  expect(localStorage[testKey]).toEqual(redundantString);
    
	});
  });
  
  describe("#saveInputTo", function() {
    it("should save special character string", function() {
	  var testString = '%\'?!@:123~`  <>.,/\\[]{}|';
	  var testKey = 'testStorage4';
      main_controller.saveInputTo(testKey, testString);
	  expect(localStorage[testKey]).toEqual(testString);
    });
  });
 




});
