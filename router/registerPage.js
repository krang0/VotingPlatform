const express = require('express'); 
// Express.js, Node.js için bir web uygulama çatısıdır.

const router = express.Router(); 
// Yeni bir router nesnesi oluşturulur.

const { join } = require('path'); 
// 'path' modülü, dosya ve dizin yollarını yönetmek için kullanılır.

const Users = require(join(__dirname, '..', 'model', 'users.js')); 
// Kullanıcı işlemleri için 'Users' modeli içe aktarılır.

// Register sayfasını render eder.
router.get('/', (req, res) => {
   if (res.locals.userLink) {
      // Eğer kullanıcı zaten giriş yapmışsa, hata sayfasına yönlendirilir.
      res.redirect('/error');
   } else {
      // Kullanıcı giriş yapmamışsa, register (kayıt ol) sayfası gösterilir.
      res.render('site/register');
   }
});

// Kullanıcı kayıt işlemi
router.post('/', async (req, res) => {
   if (res.locals.userLink) {
      // Eğer kullanıcı zaten giriş yapmışsa, hata sayfasına yönlendirilir.
      return res.redirect('/error');
   }

   if (!req.body) {
      // Eğer POST isteği gövdesi boşsa, hata mesajı döndürülür.
      return res.json({
         message: 'Veri iletilemedi!',
         case: false
      });
   }

   const { email, username, password } = req.body; 
   // İstek gövdesinden email, kullanıcı adı ve şifre alınır.

   // Zorunlu alan kontrolü
   if (!email || !username || !password) {
      return res.json({
         message: 'Tüm alanlar zorunludur!',
         case: false
      });
   }

   // Email doğrulama
   const biruniEmailPattern = /@(st\.)?biruni\.edu\.tr$/; 
   // Biruni Üniversitesi'ne ait e-posta adresi deseni.
   if (!biruniEmailPattern.test(email)) {
      return res.json({
         message: 'Biruni Üniversitesi e-posta adresi gereklidir!',
         case: false
      });
   }

   // Kullanıcının zaten var olup olmadığını kontrol eder
   const user = await Users.find({ email, password }); 
   if (user.length !== 0) {
      return res.json({
         message: 'Kullanıcı zaten kayıtlıdır',
         case: false
      });
   }

   // Yeni kullanıcıyı kaydet
   const newUser = Users({
      email,
      username,
      password
   });

   newUser.save()
      .then(() => {
         // Başarılı kayıt durumunda mesaj döner.
         return res.json({
            message: 'Kullanıcı kaydı başarılı bir şekilde oluşturuldu!',
            case: true
         });
      })
      .catch(err => {
         console.log(err);
         // Hata durumunda mesaj döner.
         return res.json({
            message: 'Beklenilmeyen bir hata oluştu',
            case: false
         });
      });
});

module.exports = router; 
// Router dışa aktarılır, böylece başka dosyalarda kullanılabilir.
