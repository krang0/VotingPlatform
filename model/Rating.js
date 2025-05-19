const mongoose = require('mongoose');

// Puanlama Şeması
const ratingSchema = new mongoose.Schema({
    project_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Proje ID
    rating: { type: Number, required: true, min: 1, max: 5 }, // 1-5 Arasında Puan
    user_id: { type: mongoose.Schema.Types.ObjectId, required: false }, // Kullanıcı ID
    rated_at: { type: Date, default: Date.now }, // Puanlama Tarihi
});

// Modeli Dışa Aktar
module.exports = mongoose.model('Rating', ratingSchema);
