const { v1: uuidv1 } = require("uuid");

const Helpers = {
  generateUUID: () => {
    const uuid = uuidv1();
    return uuid;
  },

  /*
   * lengthCheck: function(string)
   * Requirements:
   *  - 1 param
   *  - Param has to be of type string
   *  - String has a limit of max 50 chars
   *  - First letter of string must be uppercase
   * Return true if all requirements pass
   * Return undefined if no paramater was passed along
   * Return false otherwise
   */
  lengthCheck: (inputString) => {
    if (!inputString) return undefined;
    if (
      typeof inputString == "string" &&
      inputString.length <= 50 &&
      inputString.charAt(0) === inputString.charAt(0).toUpperCase()
    ) {
      return true;
    }
    return false;
  },
};

module.exports = Helpers;
