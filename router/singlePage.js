// express modülünü dahil et
const express = require('express');
// Yeni bir router nesnesi oluştur
const router = express.Router();
// path modülünden 'join' metodunu çıkar
const { join } = require('path');
// Belirtilen yoldaki Contents modelini içeri aktar
const Contents = require(join(__dirname, '..', 'model', 'content.js'));

// Dinamik 'id' parametresini kabul eden bir GET route'u tanımla
router.get('/:id', async (req, res) => {
   // İstekten 'id' parametresini al
   const { id } = req.params;
   // Contents modelini kullanarak ID'ye göre bir kayıt ara (asenkron işlem)
   const data = await Contents.findById(id);
   // 'site/single' görünümünü, bulunan verilerle render et
   // Eğer veri bulunamazsa boş bir dizi gönder; bulunursa veriyi JSON formatına çevir
   res.render('site/single', {
      data: !data ? [] : data.toJSON()
   });
});

// Bu router'ı uygulamanın diğer bölümlerinde kullanılmak üzere dışa aktar
module.exports = router;
