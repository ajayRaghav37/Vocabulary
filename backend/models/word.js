var mongoose = require('mongoose');

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
        ref: 'word'
    }],
    imgUrls: [String]
});

mongoose.model('word', wordSchema);