var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('shoud generate correct object', () => {
        const from = "ola";
        const text = "ma kota";

        var mess = generateMessage(from, text);
        expect(mess).toExist().toBeAn('object').toInclude({from, text});
        expect(mess.createdAt).toBeA('number');
    })
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const lat = 11;
        const long = 13;
        const from = "ola";
        const url = "https://www.google.com/maps?q=11,13";

        var mess = generateLocationMessage(from, lat, long);
        expect(mess.url).toBe(url);
        expect(mess).toExist().toBeAn('object').toInclude({from, url});
    })
})