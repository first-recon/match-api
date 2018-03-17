const MatchDatabase = require('../db');

function MatchService () {
    this.db = new MatchDatabase();
}

MatchService.prototype.getAll = function () {
    return this.db.getAll();
};

module.exports = MatchService;