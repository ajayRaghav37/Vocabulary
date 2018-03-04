var mongoose = require('mongoose');

module.exports = function (username) {
    var wordSchema = new mongoose.Schema({
        word: {
            type: String,
            required: true
        },
        meaning: String,
        connotation: {
            type: Number,
            min: -10,
            max: 10,
            required: true,
            default: 0
        },
        examples: [String],
        related: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: username + 'Word'
        }],
        imgUrls: [String],
        stats: {
            correct: {
                type: Number,
                default: 0,
                required: true
            },
            total: {
                type: Number,
                default: 0,
                required: true
            }
        }
    });

    mongoose.model(username + 'Word', wordSchema);
}