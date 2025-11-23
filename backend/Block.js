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
        const dataStr = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce;
        return crypto.createHash('sha256').update(dataStr).digest('hex');
    }

    mineBlock(diff) {
        const target = Array(diff + 1).join('0')
        while (!this.hash.startsWith(target)){
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

module.exports = Block;