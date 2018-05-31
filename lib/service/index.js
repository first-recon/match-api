const MatchDatabase = require('../db');

function MatchService () {
    this.db = new MatchDatabase();
}

MatchService.prototype.getAll = function () {
    return this.db.getAll()
        .then(matches => matches.map(m => Object.assign({}, m, { data: JSON.parse(m.data) })));
};

MatchService.prototype.create = function (match) {
    const formatted = {
        id: match.id,
        matchId: match.matchId,
        team: parseInt(match.team),
        timeStamp: parseInt(match.timeStamp),
        alliance: match.alliance,
        number: parseInt(match.number !== undefined || match.matchId.split('-')[1]),
        data: match.data
    };
    return this.db.insert(formatted);
};

module.exports = MatchService;