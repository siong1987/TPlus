describe("MainController", function() {
  var main_controller;

  beforeEach(function() {
    main_controller = new MainController();
  });

  describe("#countLength", function() {
    it("should count one url", function() {
      expect(main_controller.countLength('http://siong1987.com/')).toEqual(20);
    });

    it("should count two urls", function() {
      expect(main_controller.countLength('http://siong1987.com/ http://siong1987.com')).toEqual(41);
    });

    it("should count non-url text", function() {
      expect(main_controller.countLength('hello world!!!')).toEqual(14);
    });

    it("should count non-url and url text", function() {
      expect(main_controller.countLength('i love http://siong1987.com/')).toEqual(27);
    });
  });
});

