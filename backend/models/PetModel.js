const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['זכר', 'נקבה'],
        required: true
    },
    animalType: {
        type: String,
        enum: ['dog', 'cat', 'other'],
    },
    breed: {
        type: String,
        enum: ['מעורב', 'שועלי', 'פינצר', 'האסקי סיבירי', 'טרייר', 'ביגל', 'רחוב', 'חתול פרסי', 'לברדור', 'רועה גרמני', 'שיצו','אחר'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['חדש באתר', 'אומץ', 'הוסר'],
        default: 'חדש באתר'
    },
    location: {
        type: String,
        enum: ['צפון', 'מרכז', 'דרום'],
        default: 'מרכז'
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium'
    },
    activity: {
        type: String,
        enum: ['low', 'moderate', 'high'],
        default: 'moderate'
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;