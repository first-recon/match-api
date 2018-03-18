const MatchDatabase = require('../db');

function MatchService () {
    this.db = new MatchDatabase();
}

MatchService.prototype.getAll = function () {
    return this.db.getAll();
};

MatchService.prototype.create = function (match) {
    const formatted = {
        id: match.id,
        match_id: match.matchId,
        team: parseInt(match.team),
        time_stamp: parseInt(match.timeStamp),
        alliance: match.alliance,
        data: JSON.stringify(match.data)
    };
    return this.db.insert(formatted);
};

module.exports = MatchService;