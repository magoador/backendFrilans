const mongoose = require('mongoose');

const workTypeSchema = new mongoose.Schema({
    name: {
        type: String,
    }
});

const WorkType = mongoose.model('WorkType', workTypeSchema);

module.exports = WorkType;
