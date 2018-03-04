var mongoose = require('mongoose');

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
            ref: 'word'
        },
        scalePoint: {
            type: Number,
            min: -10,
            max: 10
        }
    }],
    imgUrls: [String],
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedBy: String,
    updatedAt: Date
});

mongoose.model('word', wordSchema);