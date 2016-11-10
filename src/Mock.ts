class Mock {
    private _functionCalls = [];
    private _functionReturnValues = [];

    constructor() {

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
    public functionCalled(functionName:string, args = []):any {
        let functionCallData = { 'name': functionName, 'args': args };
        this._functionCalls.push(functionCallData);
        let callCount = this.getFunctionCallCount(functionName);
        let returnVal = this.getFunctionReturnValue(functionName, callCount);

        return returnVal;
    }

    /**
     * This function returns the number of times the specified function has been
     * called.
     *
     * @param functionName
     * @returns {number}
     */
    public getFunctionCallCount(functionName:string):number {
        if(functionName.length === 0) {
            throw new Error('Function name cannot be empty');
        }

        let count = 0;

        for(let i = 0; i < this._functionCalls.length; i++) {
            if(this._functionCalls[i]['name'] === functionName) {
                count++;
            }
        }

        return count;
    }

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
    public getFunctionArgs(functionName:string, callCount = 1):any[] {
        if(functionName.length === 0) {
            throw new Error('Function name cannot be empty');
        }

        if(callCount < 1) {
            throw new Error('Call count must be greater than or equal to 1');
        }

        let count = 0;

        for(let i = 0; i < this._functionCalls.length; i++) {
            if(this._functionCalls[i]['name'] === functionName) {
                count++;
            }

            if(count === callCount) {
                return this._functionCalls[i]['args'];
            }
        }

        let message = 'The given call count is less than the number of '
            + 'times the method was called.'
            + ' Function Name = ' + functionName + ', '
            + ' Given Call Count = ' + callCount + ', '
            + ' Actual Call Count = ' + count;

        throw new Error(message);
    }

    /**
     * This function sets the return value of the function under test when it
     * is called.
     *
     * @param functionName
     * @param returnValue
     * @param callCount
     * @returns {null}
     */
    public setFunctionReturnValue(functionName:string, returnValue:any, callCount?:number):any {
        if(functionName.length === 0) {
            throw new Error('Function name cannot be empty');
        }

        for(let i = 0; i < this._functionReturnValues.length; i++) {
            let data = this._functionReturnValues[i];

            if(data['name'] == functionName && data['callCount'] == callCount) {
                data['return'] = returnValue;
                return;
            }
        }

        let returnData = { 'name': functionName, 'return': returnValue, 'callCount': callCount };
        this._functionReturnValues.push(returnData);
    }

    private getFunctionReturnValue(functionName:string, callCount:number):any {
        if(functionName.length === 0) {
            throw new Error('Function name cannot be empty');
        }

        let functionReturnData = this._functionReturnValues;

        for(let i = 0; i < functionReturnData.length; i++) {
            let data = functionReturnData[i];

            if(data['name'] == functionName && data['callCount'] == callCount) {
                return data['return'];
            }
        }

        for(let i = 0; i < functionReturnData.length; i++) {
            let data = functionReturnData[i];

            if(data['name'] == functionName && data['callCount'] == null) {
                return data['return'];
            }
        }

        return null;
    }
}

export = Mock;