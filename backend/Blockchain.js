const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [new Block(0, Date.now(), "Genesis Block", "0")];
    }

    getLastestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createBlock(block) {
        block.previousHash = this.getLastestBlock().hash;
        block.hash = block.calculateHash();
        this.chain.push(block);
    }

    getChain() {
        return this.chain;
    }
}

module.exports = Blockchain;