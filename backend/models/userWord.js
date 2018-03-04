var mongoose = require('mongoose');

module.exports = function (username) {
    if (mongoose.modelNames().indexOf(username + 'Word') > -1)
        return;

    var wordSchema = new mongoose.Schema({
        word: {
            type: String,
            required: true
        },
        posTag: {
            type: String,
            enum: [
                'n', // noun
                'prn', // pronoun
                'v', // verb
                'adv', // adverb
                'adj', // adjective
                'conj', // conjunction
                'pre', // preposition
                'int', // interjection
                'num', // numeral
                'det' // determiner
            ],
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
        relationScale: String,
        relations: [{
            wordId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: username + 'word'
            },
            scalePoint: {
                type: Number,
                min: -10,
                max: 10
            }
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
        },
        globalId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'word'
        }
    });

    mongoose.model(username + 'Word', wordSchema);
}