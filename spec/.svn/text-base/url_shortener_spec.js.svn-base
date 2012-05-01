describe("UrlShortener", function() {
  var url_shortener;

  beforeEach(function() {
    url_shortener = new UrlShortener();
  });

  describe("#shorten", function() {
    it("should shorten the url properly", function() {
      expect(url_shortener.shorten('http://siong1987.com/')).toEqual("http://bit.ly/xEAp0I");
   });

   it("should fail to shorten the url (invalid url)", function() {
      expect(url_shortener.shorten('Not a url.')).toEqual("error");
   });

   it("should fail to shorten the url (another invalid url)", function() {
     expect(url_shortener.shorten('http:///notaurl.com')).toEqual("error");
   });

   it("should fail to shorten a blank url", function() {
     expect(url_shortener.shorten('')).toEqual("error");
   });
  });
});

