const crypto = require('crypto');

const genertateToken =()=>crypto.randomBytes(32).toString('hex');

module.exports={genertateToken};