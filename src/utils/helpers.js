const jwt = require('jsonwebtoken');
const get = require('lodash/get');
const { md5, sha1 } = require('hash-util');

function hash(password) {
    return md5(sha1(password));
}

function getTokenFromRequest(request) {
    if (
        !request.headers.authorization ||
        request.headers.authorization.split(' ')[0] !== 'Bearer'
    ) {
        return;
    }

    // The authorization header format is: "Bearer eyJhbGciOiJIUzI1NiIsInR5..."
    return request.headers.authorization.split(' ')[1];
}

function getPayloadFromToken(token) {
    return jwt.verify(token, process.env.SECRET);
}

function getUserIdFromRequest(request) {
    const token = getTokenFromRequest(request);
    const decoded = getPayloadFromToken(token);

    return get(decoded, 'user.id');
}

module.exports = {
    hash,
    getTokenFromRequest,
    getPayloadFromToken,
    getUserIdFromRequest
};
