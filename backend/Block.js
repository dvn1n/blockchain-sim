const crypto = require('crypto');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this. previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.createHash('sha256').update(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).digest('hex');
    }

    mineBlock(diff) {
        while (!this.hash.startsWith(Array(diff + 1).join('0'))){
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

module.exports = Block;