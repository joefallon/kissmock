"use strict";
var Mock = require('../src/Mock');
var chai = require('chai');
describe('Mock', function () {
    var assert = chai.assert;
    describe('#setFunctionReturnValue', function () {
        it('overwrites previous value when call count provided', function (done) {
            var mock = new Mock();
            mock.setFunctionReturnValue('testFunction', 'a', 1);
            mock.setFunctionReturnValue('testFunction', 'b', 2);
            mock.setFunctionReturnValue('testFunction', 'c', 1);
            var retValue = mock.functionCalled('testFunction', [1, 2]);
            assert.equal(retValue, 'c');
            done();
        });
        it('overwrites previous value when call count not provided', function (done) {
            var mock = new Mock();
            mock.setFunctionReturnValue('testFunction', 'a');
            mock.setFunctionReturnValue('testFunction', 'b');
            var retValue = mock.functionCalled('testFunction', [1, 2]);
            assert.equal(retValue, 'b');
            done();
        });
        it('throws an Error on empty functionName', function (done) {
            var mock = new Mock();
            try {
                mock.setFunctionReturnValue('', null);
            }
            catch (err) {
                assert.isTrue(err instanceof Error);
                assert.equal(err.message, 'Function name cannot be empty');
                done();
                return;
            }
            assert.fail();
            done();
        });
    });
    describe('#functionCalled', function () {
        it('returns the correct value', function (done) {
            var mock = new Mock();
            mock.setFunctionReturnValue('testFunction', 'a', 1);
            mock.setFunctionReturnValue('testFunction', 'b', 2);
            mock.setFunctionReturnValue('testFunction', 'c', 3);
            mock.setFunctionReturnValue('testFunction', 'd', 4);
            assert.equal(mock.functionCalled('testFunction', [1, 2]), 'a');
            assert.equal(mock.functionCalled('testFunction', [3, 4]), 'b');
            assert.equal(mock.functionCalled('testFunction', [5, 6]), 'c');
            assert.equal(mock.functionCalled('testFunction', [7, 8]), 'd');
            mock.setFunctionReturnValue('otherFunction', 'z');
            assert.equal(mock.functionCalled('otherFunction', [1, 2]), 'z');
            assert.equal(mock.functionCalled('otherFunction', [3, 4]), 'z');
            done();
        });
    });
    describe('#getFunctionArgs', function () {
        it('returns the correct arguments', function (done) {
            var mock = new Mock();
            mock.functionCalled('testFunction', [1, 2]);
            var args = mock.getFunctionArgs('testFunction', 1);
            assert.equal(args[0], 1);
            assert.equal(args[1], 2);
            mock.functionCalled('testFunction', [3, 4]);
            args = mock.getFunctionArgs('testFunction', 2);
            assert.equal(args[0], 3);
            assert.equal(args[1], 4);
            mock.functionCalled('testFunction', [5, 6]);
            args = mock.getFunctionArgs('testFunction', 3);
            assert.equal(args[0], 5);
            assert.equal(args[1], 6);
            mock.functionCalled('testFunction', [7, 8]);
            args = mock.getFunctionArgs('testFunction', 4);
            assert.equal(args[0], 7);
            assert.equal(args[1], 8);
            done();
        });
        it('throws Error if callCount too high', function (done) {
            var mock = new Mock();
            try {
                mock.functionCalled('testFunction');
                mock.getFunctionArgs('testFunction', 2);
            }
            catch (err) {
                assert.isTrue(err instanceof Error);
                done();
                return;
            }
            assert.fail();
            done();
        });
        it('throws Error on callCount less than 1', function (done) {
            var mock = new Mock();
            try {
                mock.getFunctionArgs('testFunction', 0);
            }
            catch (err) {
                assert.isTrue(err instanceof Error);
                done();
                return;
            }
            assert.fail();
            done();
        });
    });
    describe('#getFunctionCallCount', function () {
        it('throws an Error on empty function name', function (done) {
            var mock = new Mock();
            try {
                mock.getFunctionCallCount('');
            }
            catch (err) {
                assert.isTrue(err instanceof Error);
                assert.equal(err.message, 'Function name cannot be empty');
                done();
                return;
            }
            assert.fail();
            done();
        });
        it('returns the correct count', function (done) {
            var mock = new Mock();
            var count = mock.getFunctionCallCount('testMethod');
            assert.equal(count, 0);
            mock.functionCalled('testMethod');
            count = mock.getFunctionCallCount('testMethod');
            assert.equal(count, 1);
            mock.functionCalled('testMethod');
            count = mock.getFunctionCallCount('testMethod');
            assert.equal(count, 2);
            mock.functionCalled('otherMethod');
            count = mock.getFunctionCallCount('otherMethod');
            assert.equal(count, 1);
            count = mock.getFunctionCallCount('testMethod');
            assert.equal(count, 2);
            mock.functionCalled('thirdMethod', [1, 2]);
            count = mock.getFunctionCallCount('thirdMethod');
            assert.equal(count, 1);
            count = mock.getFunctionCallCount('testMethod');
            assert.equal(count, 2);
            done();
        });
    });
});
