const mongoose = require('mongoose');
const ClickSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    ipAddress: { type: String },
    referrer: { type: String },
    geo: {
        city: { type: String },
        country: { type: String }
    }
});

const UrlSchema = new mongoose.Schema({
    shortCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    longUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        required: true
    },
    clicks: [ClickSchema] 
});

module.exports = mongoose.model('Url', UrlSchema);