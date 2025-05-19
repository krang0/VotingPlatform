const express = require('express'); 
// Express.js, Node.js için bir web uygulama çatısıdır.

const router = express.Router(); 
// Yeni bir router nesnesi oluşturulur.

const Rating = require('../model/Rating'); 
// Puanlama işlemleri için 'Rating' modeli içe aktarılır.

// Yeni Puan Ekle
router.post('/add', async (req, res) => {
    // '/add' rotası için bir POST isteği işleyicisi tanımlar.
    const { project_id, rating } = req.body; 
    // İstek gövdesinden proje ID'si ve kullanıcı tarafından verilen puan alınır.

    try {
        const ratings = await Rating.find({ project_id }); 
        // Belirli proje için tüm mevcut puanları veritabanından alır.

        const totalRatings = ratings.reduce((sum, r) => sum + r.rating, 0) + rating; 
        // Tüm puanların toplamını hesaplar ve yeni eklenen puanı ekler.

        const totalVotes = ratings.length + 1; 
        // Toplam oy sayısını hesaplar.

        const averageRating = totalRatings / totalVotes; 
        // Yeni ortalama puanı hesaplar.

        const newRating = new Rating({ project_id, rating }); 
        // Yeni bir Rating nesnesi oluşturur.

        await newRating.save(); 
        // Yeni puanı veritabanına kaydeder.

        res.status(201).json({ 
            message: 'Puan başarıyla kaydedildi!', 
            averageRating 
        }); 
        // Başarı mesajı ve ortalama puanı döndürür.
    } catch (error) {
        res.status(500).json({ 
            message: 'Puan kaydedilirken bir hata oluştu.', 
            error 
        }); 
        // Hata durumunda hata mesajı ve hata detaylarını döndürür.
    }
});

// Belirli Projenin Ortalama Puanını Getir
router.get('/:project_id', async (req, res) => {
    // '/:project_id' rotası için bir GET isteği işleyicisi tanımlar.
    const { project_id } = req.params; 
    // URL parametresinden proje ID'si alınır.

    try {
        const ratings = await Rating.find({ project_id }); 
        // Belirli proje için tüm mevcut puanları veritabanından alır.

        const totalRatings = ratings.reduce((sum, r) => sum + r.rating, 0); 
        // Tüm puanların toplamını hesaplar.

        const averageRating = totalRatings / ratings.length || 0; 
        // Ortalama puanı hesaplar; eğer puan yoksa 0 döndürür.

        res.status(200).json({ averageRating }); 
        // Ortalama puanı döndürür.
    } catch (error) {
        res.status(500).json({ 
            message: 'Puanlar alınırken bir hata oluştu.', 
            error 
        }); 
        // Hata durumunda hata mesajı ve hata detaylarını döndürür.
    }
});

module.exports = router; 
// Router dışa aktarılır, böylece başka dosyalarda kullanılabilir.
