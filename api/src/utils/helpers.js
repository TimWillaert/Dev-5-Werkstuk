const { v1: uuidv1 } = require("uuid");
const sortObject = require('sort-object-keys');
const { all } = require("../server");

const Helpers = {
  generateUUID: () => {
    const uuid = uuidv1();
    return uuid;
  },

  checkParameters: (expectedParameters, givenParameters, allowOtherParameters) => {
    if(
      typeof expectedParameters == "object" &&
      typeof givenParameters == "object" &&
      typeof allowOtherParameters == "boolean"
    ) {
      let sortedExpectedParams = sortObject(expectedParameters);
      let sortedGivenParams = sortObject(givenParameters);
      let matchingParameters = 0;
      for(const requiredParam in sortedExpectedParams){
        if(
          requiredParam in sortedGivenParams &&
          typeof sortedGivenParams[requiredParam] == expectedParameters[requiredParam]
        ) {
          matchingParameters++;
        }
      }
      if(Object.keys(sortedGivenParams).length > matchingParameters && allowOtherParameters == false){
        return false;
      } else if(Object.keys(sortedGivenParams).length > matchingParameters && allowOtherParameters == true){
        return true;
      } else if(matchingParameters < Object.keys(sortedExpectedParams).length){
        return false;
      } else if(matchingParameters == Object.keys(sortedExpectedParams).length){
        return true;
      } else{
        return false;
      }
    }
    return 400;
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
