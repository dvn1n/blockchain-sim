const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [new Block(0, Date.now(), "Genesis Block", "0")];
        this.diff = 3;
    }

    getLastestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createBlock(block) {
        block.previousHash = this.getLastestBlock().hash;
        block.mineBlock(this.diff);
        this.chain.push(block);
    }

    getChain() {
        return this.chain;
    }
}

module.exports = Blockchain;