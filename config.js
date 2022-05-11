// Copyright (c) 2022 Victor Garcia | Special Thanks: David Joseph Katz
// Distributed under the MIT software license, see the accompanying
// file LICENSE or https://opensource.org/licenses/MIT

const MINE_RATE = 30000;
const INITIAL_DIFFICULTY = 1;

const isDevelopment = process.env.ENV === 'development';

const GENESIS_DATA = {
  timestamp: 1,
  lastHash: '0',
  hash: '1',
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: []
};


const STARTING_BALANCE = isDevelopment ?
    200:
    0
const REWARD_INPUT = { address: '*authorized-reward*' };
const MINING_REWARD = 50;

module.exports = {
  GENESIS_DATA,
  MINE_RATE,
  STARTING_BALANCE,
  REWARD_INPUT,
  MINING_REWARD
};
