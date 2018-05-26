import 'mocha';
import { expect } from 'chai';
import { isFSA, isThenable, isFunction } from '../src/utils';

describe('Utils unit tests', () => {
  let result;

  describe('isFSA', () => {
    describe('when called with no arguments', () => {
      beforeEach(() => {
        result = isFSA();
      });

      it('should return false', () => {
        expect(result).to.be.false;
      });
    });

    describe('when called with empty object', () => {
      beforeEach(() => {
        result = isFSA({});
      });

      it('should return false', () => {
        expect(result).to.be.false;
      });
    });

    describe('when called with object with invalid props', () => {
      beforeEach(() => {
        result = isFSA({ invalidProp: true });
      });

      it('should return false', () => {
        expect(result).to.be.false;
      });
    });

    describe('when called with object with valid props', () => {
      beforeEach(() => {
        result = isFSA({ type: 'GET_ITEM', payload: {}, error: false, meta: []});
      });

      it('should return true', () => {
        expect(result).to.be.true;
      });
    });
  });

  describe('isThenable', () => {
    describe('when called with no arguments', () => {
      beforeEach(() => {
        result = isThenable();
      });

      it('should return false', () => {
        expect(result).to.be.false;
      });
    });

    describe('when called with function', () => {
      beforeEach(() => {
        result = isThenable( () => { /* empty function */});
      });

      it('should return false', () => {
        expect(result).to.be.false;
      });
    });

    describe('when called with object with not-a-function in then', () => {
      beforeEach(() => {
        result = isThenable({ then: 1 });
      });

      it('should return false', () => {
        expect(result).to.be.false;
      });
    });

    describe('when called with object with function in then', () => {
      beforeEach(() => {
        result = isThenable({ then: () => { /* empty function */} });
      });

      it('should return true', () => {
        expect(result).to.be.true;
      });
    });
  });

  describe('isFunction', () => {
    describe('when called with no arguments', () => {
      beforeEach(() => {
        result = isFunction();
      });

      it('should return false', () => {
        expect(result).to.be.false;
      });
    });

    describe('when called with object', () => {
      beforeEach(() => {
        result = isFunction({ hello: 'world' });
      });

      it('should return false', () => {
        expect(result).to.be.false;
      });
    });

    describe('when called with function', () => {
      beforeEach(() => {
        result = isFunction(() => { /* empty function */});
      });

      it('should return true', () => {
        expect(result).to.be.true;
      });
    });
  });
});
