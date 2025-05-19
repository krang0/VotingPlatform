const express = require('express'); 
// Express.js, Node.js için bir web uygulama çatısıdır.

const router = express.Router(); 
// Yeni bir router nesnesi oluşturur. Bu, yönlendirme işlemleri için kullanılır.

const data = { 
   // "about" sayfasına özel başlık verilerini tanımlayan bir nesne.
   imgURL: '/img/background/about.jpg', 
   // Sayfanın arka plan resmi için URL.

};

router.get('/', (req, res) => {
   // '/' rotası için bir GET isteği işleyicisi tanımlar.

   res.render('site/about', {
      // 'site/about' şablon dosyasını render eder (görselleştirir).

      headerData: data 
      // Şablona 'headerData' değişkenini gönderir; bu, sayfa içeriğini dinamik hale getirmek için kullanılır.
   });
});

module.exports = router; 
// Bu router, dışa aktarılır, böylece diğer dosyalarda kullanılabilir.
