const express = require('express'); 
// Express.js, Node.js için bir web uygulama çatısıdır.

const router = express(); 
// Yeni bir router nesnesi oluşturulur.

const { join } = require('path'); 
// 'path' modülü, dosya ve dizin yollarını yönetmek için kullanılır.

const fs = require('fs'); 
// 'fs' modülü, dosya sistemi işlemleri için kullanılır.

const { names, sizeAndType, isThereFile } = require(join(__dirname, '..', 'helpers', 'files.js')); 
// Yardımcı işlevler içe aktarılır: dosya adlandırma, boyut ve tür kontrolü, dosya varlık kontrolü.

const Contents = require(join(__dirname, '..', 'model', 'content.js')); 
// 'Contents' modeli, içerik verilerini yönetmek için içe aktarılır.

// ? ADD PROCESS
// Sayfa ekleme formunu render eder.
router.get('/add', (req, res) => {
   if (!res.locals.userLink) {
      // Kullanıcı oturumu yoksa hata sayfasına yönlendirilir.
      res.redirect('/error');
   } else {
      // Kullanıcı oturumu varsa, ekleme sayfası gösterilir.
      res.render('admin/add');
   }
});

// Maksimum karakter limitleri
const MAX_TITLE_LENGTH = 100; 
const MAX_CONTENT_LENGTH = 300; 
const MAX_AUTHOR_LENGTH = 120; 

// İçerik ekleme işlemi
router.post('/add', (req, res) => {
   if (!res.locals.userLink) {
      // Kullanıcı oturumu yoksa hata sayfasına yönlendirilir.
      return res.redirect('/error');
   }

   if (!req.body || !req.files) {
      // Form verisi eksikse hata mesajı döner.
      return res.json({
         message: 'Form verisi eksik veya yüklenemedi.',
         case: false
      });
   }

   const { title, content, author } = req.body; 
   // Formdan alınan başlık, açıklama ve yazar bilgileri.

   const { files } = req.files; 
   // Yüklenen dosya bilgileri.

   // Eksik veri kontrolü
   if (!title) {
      return res.json({ message: 'Başlık alanı boş bırakılamaz.', case: false });
   }
   if (title.length > MAX_TITLE_LENGTH) {
      return res.json({ message: `Başlık ${MAX_TITLE_LENGTH} karakterden uzun olamaz.`, case: false });
   }

   if (!content) {
      return res.json({ message: 'Açıklama alanı boş bırakılamaz.', case: false });
   }
   if (content.length > MAX_CONTENT_LENGTH) {
      return res.json({ message: `Açıklama ${MAX_CONTENT_LENGTH} karakterden uzun olamaz.`, case: false });
   }

   if (!author) {
      return res.json({ message: 'Yazar bilgisi boş bırakılamaz.', case: false });
   }
   if (author.length > MAX_AUTHOR_LENGTH) {
      return res.json({ message: `Yazar bilgisi ${MAX_AUTHOR_LENGTH} karakterden uzun olamaz.`, case: false });
   }

   if (!files) {
      return res.json({ message: 'Bir görsel yüklemek zorunludur.', case: false });
   }

   // Dosya boyutu ve türü kontrolü
   sizeAndType(res, files, () => {
      const uniqueName = names(files); 
      // Dosya için benzersiz bir ad oluşturulur.

      files.mv(join(__dirname, '..', 'public', 'img', 'content', uniqueName), (err) => {
         // Dosya belirtilen dizine taşınır.
         if (err) {
            return res.json({
               message: 'Dosya yüklenirken bir hata oluştu.',
               case: false
            });
         }

         const newContent = Contents({
            // Yeni içerik oluşturulur ve veritabanına eklenir.
            title,
            imgURL: `/img/content/${uniqueName}`,
            content,
            author
         });

         newContent.save()
            .then(() => {
               // Başarılı kayıt mesajı döner.
               return res.json({ message: 'İçerik başarılı bir şekilde oluşturuldu.', case: true });
            })
            .catch((err) => {
               console.error(err);
               // Veritabanına kaydedilemediği durumdaki hata mesajı.
               return res.json({ message: 'İçerik veritabanına kaydedilemedi.', case: false });
            });
      });
   });
});

module.exports = router; 
// Router dışa aktarılır, böylece başka dosyalarda kullanılabilir.
