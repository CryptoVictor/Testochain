// Copyright (c) 2022 Victor Garcia | Special Thanks: David Joseph Katz
// Distributed under the MIT software license, see the accompanying
// file LICENSE.txt or https://opensource.org/licenses/MIT

const crypto = require('crypto');

const cryptoHash = (...inputs) => {

    const hash = crypto.createHash('sha256');

    hash.update(inputs.map(input => JSON.stringify(input)).sort().join(' '));

    return hash.digest('hex');

};

module.exports = cryptoHash;
