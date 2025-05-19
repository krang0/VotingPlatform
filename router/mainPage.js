const express = require('express'); 
// Express.js, Node.js için bir web uygulama çatısıdır.

const router = express.Router(); 
// Yeni bir router nesnesi oluşturulur.

const data = { 
   // Ana sayfa başlık verilerini tanımlayan bir nesne.
   imgURL: '/img/background/home.jpg', 
   // Sayfanın arka plan resmi için URL.

};

const { join } = require('path'); 
// 'path' modülü, dosya ve dizin yollarını yönetmek için kullanılır.

const Contents = require(join(__dirname, '..', 'model', 'content.js')); 
// 'Contents' modeli, içerik verilerini yönetmek için içe aktarılır.

router.get('/', async (req, res) => {
   // '/' rotası için bir GET isteği işleyicisi tanımlar.

   let contents = await Contents.find(); 
   // Veritabanındaki tüm içerik öğelerini alır.

   contents = contents.reverse(); 
   // İçerikleri ters çevirir (son eklenenler önce gösterilir).

   res.render('site/index', {
      // 'site/index' şablon dosyasını render eder (görselleştirir).

      headerData: data, 
      // Şablona 'headerData' değişkenini gönderir; bu, sayfa başlık bilgilerini içerir.

      contents: contents.map(item => item.toJSON()) 
      // Şablona 'contents' değişkenini gönderir; veriler JSON formatına dönüştürülür.
   });
});

module.exports = router; 
// Bu router, dışa aktarılır, böylece diğer dosyalarda kullanılabilir.
