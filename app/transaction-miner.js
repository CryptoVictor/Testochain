// Copyright (c) 2022 Victor Garcia | Special Thanks: David Joseph Katz
// Distributed under the MIT software license, see the accompanying
// file LICENSE.txt or https://opensource.org/licenses/MIT

const Transaction = require('../wallet/transaction');

class TransactionMiner {

    constructor({blockchain, transactionPool, wallet, pubsub}) {

        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;

    }

    mineTransactions() {

        const validTransactions = this.transactionPool.validTransactions();

        validTransactions.push(
            Transaction.rewardTransaction({minerWallet: this.wallet})
        );

        this.blockchain.addBlock({data: validTransactions});

        this.pubsub.broadcastChain();

        this.transactionPool.clear();
        
    }

}

module.exports = TransactionMiner;
