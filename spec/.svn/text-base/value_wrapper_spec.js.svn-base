describe("ValueWrapper", function() {
  var value_wrapper;

  describe("#save and #val", function() {
    it("should save the value", function() {
      value_wrapper = new ValueWrapper('test0');
      value_wrapper.save('hello world');
      expect(value_wrapper.val()).toEqual('hello world');
    });

    it("should save the object", function() {
      value_wrapper = new ValueWrapper('test1');
      var h = new Object();
      h['one'] = 1;
      h['two'] = 2;
      h['three'] = 3;

      value_wrapper.save(h);
      // inspect the values stored
      var loaded = value_wrapper.val();
      expect(loaded['one']).toEqual(1);
    });

    it("should not save the empty value", function() {
      value_wrapper = new ValueWrapper('test2');
      value_wrapper.save('');
      expect(value_wrapper.val()).toEqual(undefined);
    });

    it("should be able to save and override", function() {
      value_wrapper = new ValueWrapper('test3');
      value_wrapper.save('hello world');
      expect(value_wrapper.val()).toEqual('hello world');

      value_wrapper.save('hello world1');
      expect(value_wrapper.val()).toEqual('hello world1');
    });
  });

  describe("#remove", function() {
    it("should remove the value", function() {
      value_wrapper = new ValueWrapper('test0');
      value_wrapper.save('hello world');
      expect(value_wrapper.val()).toEqual('hello world');

      value_wrapper.remove();
      expect(value_wrapper.val()).toEqual(undefined);
    });
  });
});

