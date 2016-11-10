declare class Mock {
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
    functionCalled(functionName: string, args?: any[]): any;
    /**
     * This function returns the number of times the specified function has been
     * called.
     *
     * @param functionName
     * @returns {number}
     */
    getFunctionCallCount(functionName: string): number;
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
    getFunctionArgs(functionName: string, callCount?: number): any[];
    /**
     * This function sets the return value of the function under test when
     * it is called.
     *
     * @param functionName
     * @param returnValue
     * @param callCount
     * @returns {null}
     */
    setFunctionReturnValue(functionName: string, returnValue: any, callCount: number): any;
    private getFunctionReturnValue(functionName, callCount);
}
export = Mock;
