const MatchDatabase = require('../db');

function trimRequestParams (match) {
    return {
        id: match.id,
        matchid: match.matchId,
        team: parseInt(match.team),
        time_stamp: parseInt(match.timeStamp),
        alliance: match.alliance,
        number: parseInt(match.number)
    }
}

function MatchService () {
    this.db = new MatchDatabase();
}

MatchService.prototype.getAll = function () {
    return this.db.getAll()
        .then(matches => matches.map(m => Object.assign({}, m, { data: JSON.parse(m.data) })));
};

MatchService.prototype.get = function (filter) {
    return this.db.get(trimRequestParams(filter))
        .then(matches => matches.map(m => Object.assign({}, m, { data: JSON.parse(m.data) })));
};

MatchService.prototype.create = function (match) {
    const formatted = {
        id: match.id,
        matchId: match.matchId,
        team: parseInt(match.team),
        timeStamp: parseInt(match.timeStamp),
        alliance: match.alliance,
        number: parseInt(match.number),
        data: match.data
    };
    return this.db.insert(formatted);
};

module.exports = MatchService;