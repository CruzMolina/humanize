var Humanize = artifacts.require("Humanize");

contract("Humanize", accounts => {
  beforeEach(async () => {
    HumanizeInstance = await Humanize.new();
  });

  describe("storeHash", () => {
    // test to make sure storeHash stores string values for the caller
    it("...stores a string value for the caller", async () => {
      const string_value = "89";
      await HumanizeInstance.storeHash(string_value, { from: accounts[0] });
      const stored_value = await HumanizeInstance.ipfsHash(accounts[0]);
      assert.strictEqual(
        stored_value,
        string_value,
        "The string value 89 was not stored."
      );
    });

    // test to ensure storeHash stores string values ONLY for caller
    it("...cannot store a string value for someone other than caller", async () => {
      const string_value = "89";
      await HumanizeInstance.storeHash(string_value, { from: accounts[1] });
      const stored_value = await HumanizeInstance.ipfsHash(accounts[0]);
      assert.strictEqual(
        stored_value,
        "",
        "StoreHash was called by someone other than the caller!"
      );
    });

    // test to make sure storeHash cannot store int values
    it("...doesn't store an int value", async () => {
      const int_value = -89;
      await HumanizeInstance.storeHash(int_value, { from: accounts[0] });
      const stored_value = await HumanizeInstance.ipfsHash(accounts[0]);
      assert.strictEqual(stored_value, "", "The int value -89 was stored.");
    });

    // test to make sure storeHash cannot store uint values
    it("...doesn't store a uint value", async () => {
      const uint_value = 89;
      await HumanizeInstance.storeHash(uint_value, { from: accounts[0] });
      const stored_value = await HumanizeInstance.ipfsHash(accounts[0]);
      assert.strictEqual(stored_value, "", "The uint value 89 stored.");
    });

    // test to make sure storeHash cannot store bool values
    it("...doesn't store a bool value", async () => {
      const bool_value = true;
      await HumanizeInstance.storeHash(bool_value, { from: accounts[0] });
      const stored_value = await HumanizeInstance.ipfsHash(accounts[0]);
      assert.strictEqual(stored_value, "", "The bool value true was stored.");
    });

    // test to make sure storeHash cannot store an array
    it("...doesn't store an array", async () => {
      const array_value = ["this", "is", "a", "test", 42, 0x72e2];
      try {
        await HumanizeInstance.storeHash(array_value, { from: accounts[0] });
      } catch (error) {
        return;
      }
      assert.fail("The array value was stored");
    });

    // test to make sure storeHash cannot store an address/byte value
    it("...doesn't store an address/byte value", async () => {
      const address_byte_value = 0x72ba7d8e73fe8eb666ea66babc8116a41bfb10e2;
      await HumanizeInstance.storeHash(address_byte_value, {
        from: accounts[0]
      });
      const stored_value = await HumanizeInstance.ipfsHash(accounts[0]);
      assert.strictEqual(
        stored_value,
        "",
        "The address/byte value was stored."
      );
    });
  });
});
