module.exports = function (config) {
    return {
        selectAll: (opts) => `select * from ${config.schema}.${config.table}`,
        insert: (opts) => {
            const keys = Object.keys(opts);
            const values = keys.map(k => opts[k]);
            const columns = keys.join(',');
            const quotedVals = values.map(v => typeof v === 'string' ? `'${v}'` : v).join(',');;
            return `insert into ${config.schema}.${config.table} (${columns}) values (${quotedVals})`;
        }
    };
}