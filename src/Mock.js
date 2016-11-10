"use strict";
var Mock = (function () {
    function Mock() {
        this._functionCalls = [];
        this._functionReturnValues = [];
    }
    /**
     * This function should be called whenever a method in the class under test is
     * called. It returns the previously specified return value for the specified
     * method. Lastly, a call to this function should completely replace of the body
     * of the function under test
     *
     * @param functionName
     * @param args
     * @returns {null}
     */
    Mock.prototype.functionCalled = function (functionName, args) {
        if (args === void 0) { args = []; }
        var functionCallData = { 'name': functionName, 'args': args };
        this._functionCalls.push(functionCallData);
        var callCount = this.getFunctionCallCount(functionName);
        var returnVal = this.getFunctionReturnValue(functionName, callCount);
        return returnVal;
    };
    /**
     * This function returns the number of times the specified function has been
     * called.
     *
     * @param functionName
     * @returns {number}
     */
    Mock.prototype.getFunctionCallCount = function (functionName) {
        if (functionName.length === 0) {
            throw new Error('Function name cannot be empty');
        }
        var count = 0;
        for (var i = 0; i < this._functionCalls.length; i++) {
            if (this._functionCalls[i]['name'] === functionName) {
                count++;
            }
        }
        return count;
    };
    /**
     * This function returns the arguments supplied to a function for the specified
     * call count. For example, to retrieve the arguments supplied to a function on
     * the third time it was called, use a callCount of 3. The supplied arguments
     * are returned in the form of an array.
     *
     * @param functionName
     * @param callCount
     * @returns {Array}
     */
    Mock.prototype.getFunctionArgs = function (functionName, callCount) {
        if (callCount === void 0) { callCount = 1; }
        if (functionName.length === 0) {
            throw new Error('Function name cannot be empty');
        }
        if (callCount < 1) {
            throw new Error('Call count must be greater than or equal to 1');
        }
        var count = 0;
        for (var i = 0; i < this._functionCalls.length; i++) {
            if (this._functionCalls[i]['name'] === functionName) {
                count++;
            }
            if (count === callCount) {
                return this._functionCalls[i]['args'];
            }
        }
        var message = 'The given call count is less than the number of '
            + 'times the method was called.'
            + ' Function Name = ' + functionName + ', '
            + ' Given Call Count = ' + callCount + ', '
            + ' Actual Call Count = ' + count;
        throw new Error(message);
    };
    /**
     * This function sets the return value of the function under test when it
     * is called.
     *
     * @param functionName
     * @param returnValue
     * @param callCount
     * @returns {null}
     */
    Mock.prototype.setFunctionReturnValue = function (functionName, returnValue, callCount) {
        if (functionName.length === 0) {
            throw new Error('Function name cannot be empty');
        }
        for (var i = 0; i < this._functionReturnValues.length; i++) {
            var data = this._functionReturnValues[i];
            if (data['name'] == functionName && data['callCount'] == callCount) {
                data['return'] = returnValue;
                return;
            }
        }
        var returnData = { 'name': functionName, 'return': returnValue, 'callCount': callCount };
        this._functionReturnValues.push(returnData);
    };
    Mock.prototype.getFunctionReturnValue = function (functionName, callCount) {
        if (functionName.length === 0) {
            throw new Error('Function name cannot be empty');
        }
        var functionReturnData = this._functionReturnValues;
        for (var i = 0; i < functionReturnData.length; i++) {
            var data = functionReturnData[i];
            if (data['name'] == functionName && data['callCount'] == callCount) {
                return data['return'];
            }
        }
        for (var i = 0; i < functionReturnData.length; i++) {
            var data = functionReturnData[i];
            if (data['name'] == functionName && data['callCount'] == null) {
                return data['return'];
            }
        }
        return null;
    };
    return Mock;
}());
module.exports = Mock;
