const mongoose = require('mongoose'); 
// Mongoose, MongoDB ile çalışmak için kullanılan bir kütüphanedir.

const Schema = mongoose.Schema; 
// Mongoose'un 'Schema' sınıfı, veritabanı şemasını tanımlamak için kullanılır.

const userSchema = new Schema({
   // 'userSchema', kullanıcı bilgileri için bir şema tanımlar.
   email: { type: String, require }, 
   // Kullanıcının e-posta adresi (String türünde, zorunlu bir alan).

   username: { type: String, require }, 
   // Kullanıcının kullanıcı adı (String türünde, zorunlu bir alan).

   password: { type: String, require } 
   // Kullanıcının şifresi (String türünde, zorunlu bir alan).
});

const Users = mongoose.model('Users', userSchema); 
// 'Users' modeli, 'userSchema' şemasına dayalı olarak oluşturulur ve MongoDB'de 'Users' koleksiyonu ile ilişkilendirilir.

module.exports = Users; 
// 'Users' modeli dışa aktarılır, böylece başka dosyalarda kullanılabilir.
