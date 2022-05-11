// Copyright (c) 2022 Victor Garcia | Special Thanks: David Joseph Katz
// Distributed under the MIT software license, see the accompanying
// file LICENSE.txt or https://opensource.org/licenses/MIT

const PubNub = require('pubnub');

const credentials = {

    "Put your pubnub keys here!!!"

};

const CHANNELS = {

  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION'

};

class PubSub {
  constructor({ blockchain, transactionPool, wallet }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;

    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.listener());
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction)
    });
  }

  subscribeToChannels() {
    this.pubnub.subscribe({
      channels: [Object.values(CHANNELS)]
    });
  }

  listener() {
    return {
      message: messageObject => {
        const { channel, message } = messageObject;

        console.log(`Message received. Channel: ${channel}. Message: ${message}`);
        const parsedMessage = JSON.parse(message);

        switch(channel) {
          case CHANNELS.BLOCKCHAIN:
            if (this.blockchain.replaceChain(parsedMessage, true, true) === true) {
              this.transactionPool.clearBlockchainTransactions(parsedMessage);
            };
            break;
          case CHANNELS.TRANSACTION:
            if (parsedMessage.input.address !== this.wallet.publicKey)
                {
                  this.transactionPool.setTransaction(parsedMessage);
                }else{
                  console.log('TRANSACTION broadcast recieved from self, ignoring..');
                }
            break;
          default:
            return;
        }
      }
    }
  }

    publish({channel, message}) {

        this.pubnub.publish({channel,message});

    }

    broadcastChain() {
      this.publish({
        channel: CHANNELS.BLOCKCHAIN,
        message: JSON.stringify(this.blockchain.chain)
      });
    }

    broadcastTransaction(transaction) {
      this.publish({
        channel: CHANNELS.TRANSACTION,
        message: JSON.stringify(transaction)
      });
    }

}

module.exports = PubSub;
