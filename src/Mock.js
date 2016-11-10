"use strict";
var Mock = (function () {
    function Mock() {
    }
    /**
     *
     * This function should be called whenever a method in the class under test is
     * called. It returns the previously specified return value for the specified
     * method. Lastly, a call to this method should completely replace of the body
     * of the method under test
     *
     * @param functionName
     * @param args
     * @returns {null}
     */
    Mock.prototype.functionCalled = function (functionName, args) {
        if (args === void 0) { args = []; }
        return null;
    };
    /**
     * This function returns the number of times the specified function has been
     * called.
     *
     * @param functionName
     * @returns {number}
     */
    Mock.prototype.getFunctionCallCount = function (functionName) {
        return 0;
    };
    /**
     * This function returns the arguments supplied to a function for
     * the specified call count. For example, to retrieve the arguments
     * supplied to a method on the third time it was called, use a
     * callCount of 3. The supplied arguments are returned in the
     * form of an array.
     *
     * @param functionName
     * @param callCount
     * @returns {Array}
     */
    Mock.prototype.getFunctionArgs = function (functionName, callCount) {
        if (callCount === void 0) { callCount = 1; }
        return [];
    };
    /**
     * This function sets the return value of the function under test when
     * it is called.
     *
     * @param functionName
     * @param returnValue
     * @param callCount
     * @returns {null}
     */
    Mock.prototype.setFunctionReturnValue = function (functionName, returnValue, callCount) {
        return null;
    };
    Mock.prototype.getFunctionReturnValue = function (functionName, callCount) {
        return null;
    };
    return Mock;
}());
module.exports = Mock;
