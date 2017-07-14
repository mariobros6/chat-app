var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('shoud generate correct object', () => {
        const from = "ola";
        const text = "ma kota";

        var mess = generateMessage(from, text);
        expect(mess).toExist().toBeAn('object').toInclude({from, text});
        expect(mess.createdAt).toBeA('number');
    })
});