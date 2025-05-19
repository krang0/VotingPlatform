const express = require('express'); 
// Express.js, Node.js için bir web uygulama çatısıdır.

const router = express.Router(); 
// Yeni bir router nesnesi oluşturulur.

const { join } = require('path'); 
// 'path' modülü, dosya ve dizin yollarını yönetmek için kullanılır.

const Users = require(join(__dirname, '..', 'model', 'users.js')); 
// Kullanıcı veritabanı işlemleri için 'Users' modeli içe aktarılır.

// Login sayfasını render eder.
router.get('/', (req, res) => {
   if (res.locals.userLink) {
      // Eğer kullanıcı zaten giriş yapmışsa, hata sayfasına yönlendirilir.
      res.redirect('/error');
   } else {
      // Kullanıcı giriş yapmamışsa, login sayfası gösterilir.
      res.render('site/login');
   }
});

// Login işlemi
router.post('/', async (req, res) => {
   if (res.locals.userLink) {
      // Eğer kullanıcı zaten giriş yapmışsa, hata sayfasına yönlendirilir.
      res.redirect('/error');
   } else {
      if (res.locals.userLink) {
         // Eğer kullanıcı zaten giriş yapmışsa, hata mesajı döndürülür.
         res.json({
            message: 'Giriş yapılmış kişi istek atamaz',
            case: false
         });
      } else {
         if (!req.body) {
            // Eğer POST isteği gövdesi boşsa, hata mesajı döndürülür.
            res.json({
               message: 'Bilgiler gönderilemedi',
               case: false
            });
         } else {
            const { username, password } = req.body; 
            // İstek gövdesinden kullanıcı adı ve şifre alınır.

            if (!username || !password) {
               // Eğer kullanıcı adı veya şifre eksikse, hata mesajı döndürülür.
               return res.json({
                  message: 'Bilgiler gönderilemedi',
                  case: false
               });
            }

            const user = await Users.find({ username, password }); 
            // Kullanıcı adı ve şifre ile eşleşen kullanıcı veritabanında aranır.

            if (user.length !== 1) {
               // Eğer kullanıcı bulunamazsa, hata mesajı döndürülür.
               return res.json({
                  message: 'Kullanıcı bulunamadı',
                  case: false
               });
            }

            const id = user[0]._id; 
            // Bulunan kullanıcının benzersiz ID'si alınır.

            req.session.userID = String(id); 
            // Kullanıcı oturumuna ID atanır.

            return res.json({
               message: 'Giriş işlemi başarılı',
               case: true
            });
         }
      }
   }
});

// Logout işlemi
router.get('/logout', async (req, res) => {
   if (res.locals.userLink) {
      // Eğer kullanıcı oturumu varsa:
      req.session.destroy(); 
      // Kullanıcı oturumu sona erdirilir.
      res.redirect('/'); 
      // Ana sayfaya yönlendirilir.
   } else {
      // Eğer oturum yoksa, hata sayfasına yönlendirilir.
      res.redirect('/error');
   }
});

module.exports = router; 
// Router dışa aktarılır, böylece başka dosyalarda kullanılabilir.
