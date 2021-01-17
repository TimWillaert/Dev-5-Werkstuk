const { v1: uuidv1 } = require("uuid");
const sortObject = require('sort-object-keys');

const Helpers = {
  /**
  * generateUUID generates a v1 UUID
  * @param: none
  * @returns: v1 UUID
  */
  generateUUID: () => {
    const uuid = uuidv1();
    return uuid;
  },

  /**
  * checkParameters checks if all expected parameters are present and of the right type
  * @param:
  * - expectedParameters: object (list of expected properties and their type)
  *   - for example: {uuid: 'string', name: 'string'}
  * - givenParameters: object (list of given parameters and their value)
  *   - for example: {uuid: 'e89a4df0-58df-11eb-9bcd-e7a81d580945', name: 'Tim}
  * - allowOtherParameters: boolean (allow more parameters to be present than the expected ones)
  * @returns: 
  * - 400 if not all 3 parameters are present or their types are wrong
  * - true if all expected parameters are present and of the right type
  * - false if not all expected parameters are present and/or of the wrong type
  */
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
};

module.exports = Helpers;
