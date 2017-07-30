var expect = require('expect');

// import isRealString
var {isRealString} = require('./validation');

// expect isRealString
//  reject emtyp strng
//  reject string with only spaces
//  allow string with non white chars

describe('real string test', () => {

    it('should reject empty', () => {
        var str = "";
        expect(isRealString(str)).toBe(false);
    });

     it('should reject non string values', () => {
        var str = 44;
        expect(isRealString(str)).toBe(false);
    });

    it('should reject str with only spaces', () => {
        var str = "     ";
        expect(isRealString(str)).toBe(false);
    });

    it('should allow non white', () => {
        var str = "   2 3  ";
        expect(isRealString(str)).toBe(true);
    });

});