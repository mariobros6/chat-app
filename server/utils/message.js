var moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from: from,
        text: text,
        //createdAt: new Date().getTime()
        createdAt: moment().valueOf()
    }
}

var generateLocationMessage = (from, latitude, longtitude) => {
    return {
        from: from,
        url: `https://www.google.com/maps?q=${latitude},${longtitude}`,
        //createdAt: new Date().getTime()
        createdAt: moment().valueOf()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}