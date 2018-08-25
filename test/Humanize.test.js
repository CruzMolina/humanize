var Humanize = artifacts.require("Humanize");

contract("Humanize", accounts => {
  beforeEach(async () => {
    HumanizeInstance = await Humanize.new();
  });
  it("...should store a string value", async () => {
    const string_value = "89";
    await HumanizeInstance.storeHash(string_value);
    const stored_value = await HumanizeInstance.ipfsHash.call();
    assert.strictEqual(
      stored_value,
      string_value,
      "The string value 89 was not stored."
    );
  });
  it("...should not store an int value", async () => {
    const int_value = -89;
    await HumanizeInstance.storeHash(int_value);
    const stored_value = await HumanizeInstance.ipfsHash.call();
    assert.strictEqual(stored_value, "", "The int value -89 was stored.");
  });
  it("...should not store a uint value", async () => {
    const uint_value = 89;
    await HumanizeInstance.storeHash(uint_value);
    const stored_value = await HumanizeInstance.ipfsHash.call();
    assert.strictEqual(stored_value, "", "The uint value 89 stored.");
  });
  it("...should not store a bool value", async () => {
    const bool_value = true;
    await HumanizeInstance.storeHash(bool_value);
    const stored_value = await HumanizeInstance.ipfsHash.call();
    assert.strictEqual(stored_value, "", "The bool value true was stored.");
  });
  it("...should not store an array", async () => {
    const array_value = ["this", "is", "a", "test", 42, 0x72e2];
    try {
      await HumanizeInstance.storeHash(array_value);
    } catch (error) {
      return;
    }
    assert.fail("The array value was stored");
  });
  it("...should not store an address/byte value", async () => {
    const address_byte_value = 0x72ba7d8e73fe8eb666ea66babc8116a41bfb10e2;
    await HumanizeInstance.storeHash(address_byte_value);
    const stored_value = await HumanizeInstance.ipfsHash.call();
    assert.strictEqual(stored_value, "", "The address/byte value was stored.");
  });
});
