var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var absenceSchema = Schema({
    userid: String,
    name: String,
    startDate: { type: Date },
    endDate: { type: Date },
    startTime: { type: Date },
    endTime: { type: Date },
    reason: String,
    description: String,
    communication: { type: Object }
});

module.exports = mongoose.model('Absence', absenceSchema);