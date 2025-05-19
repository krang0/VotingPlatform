const mongoose = require('mongoose');

// Çevre değişkeni kullanılarak URI tanımlanıyor
const DB_URL = process.env.MONGO_URI || 'mongodb://mongo:27017/Login'; // Docker için 'mongo' host adı

const conn = () => {
   mongoose.connect(DB_URL, {
      dbName: 'Login',
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => {
      console.log('Veritabanına bağlanıldı');
   })
   .catch((err) => {
      console.log('Veritabanı bağlantı hatası:', err);
   });
}

module.exports = conn;
