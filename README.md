kissmock
========
By [Joe Fallon](http://blog.joefallon.net)

> **A simple and quick mocking library for JavaScript written in TypeScript.**
    
Installation
------------
The easiest way to install kissmock is with npm. 

```
npm install kissmock --save
```

Mock
----
`Mock` is an extremely simple to understand and extremely fast 
stubbing and mocking solution. All types of mocking and stubbing 
needs can be satisfied via its use.

### Features

`Mock` has the following features and benefits:

*   Full suite of unit tests.
*   It can be integrated into any existing project.
*   Can be fully understood in just a few moments.
*   Written in TypeScript.
*   Extremely fast.

### Class Functions

```typescript
functionCalled(functionName:string, args = []):any;
setFunctionReturnValue(functionName:string, returnValue:any, callCount?:number):any;
getFunctionCallCount(functionName:string):number;
getFunctionArgs(functionName:string, callCount = 1):any[];
```

### Overview

The use of Mock requires the cooperation of three different classes:

1.  The class under test.
2.  The unit test class that contains the methods for testing the 
    class under test.
3.  The mock/stub (the same class satisfies both needs) class for 
    the class under test.

### Usage

This is a class that has a dependency that will be mocked out.

```typescript
class ProductionClass {
    public exampleFunction(dependency:DependencyClass) {
        let param1 = 5;
        let param2 = 'abc';
        let result = dependency.timeConsumingCalculation(param1, param2);

        return result;
    }
}
```

This is the class that will be mocked out:

```typescript
class DependencyClass {
    public timeConsumingCalculation(param1:number, param2:string):number {
        // perform very time consuming calculations...
        return 42;
    }
}
```

This is the `DependencyClass` fully mocked/stubbed out:

```typescript
var Mock = require('kissmock');

class DependencyClassMock extends DependencyClass {
    public _mock:Mock;

    // Replace the default constructor.
    public construct() {
        this._mock = new Mock();
    }

    public timeConsumingCalculation(param1:number, param2:string):number {
        // The contents every public method is replaced with the following.
        let args = [param1, param2];
        return this._mock.functionCalled('timeConsumingCalculation', args);
    }
}
```

Finally, here is the unit test that ties it all together:

```typescript
describe('ExampleClass', () => {
    describe('#exampleFunction', () => {
        it('has correct object interactions', (done) => {
            let dependencyMock = new DependencyClassMock();
            dependencyMock._mock.setFunctionReturnValue('timeConsumingCalculation', 42);
            
            // Create the class under test.
            let productionClass = new ProductionClass();
            let result = productionClass.exampleFunction(dependencyMock);
    
            // Assert the return value matches what is expected.
            assert.equal(42, result);
    
            // Assert the method was called exactly once.
            let callCount = dependencyMock._mock.getFunctionCallCount('timeConsumingCalculation');
            assert.equal(1, callCount);
    
            // Assert the proper arguments were passed to the method.
            let args = dependencyMock._mock.getFunctionArgs('timeConsumingCalculation', 1);
            assert.equal(5, args[0]);
            assert.equal('abc', args[1]);
            
            done();
        });
    });
});
```

### Performance

The mocks can be used as stubs by simply not asserting on any of the functions in
the instance of `Mock` held by the mock/stub class. Since no reflection, eval,
or injection is used, the mock/stub classes are extremely fast.
