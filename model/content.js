const mongoose = require('mongoose'); 
// Mongoose, MongoDB ile çalışmak için kullanılan bir kütüphanedir.

const Schema = mongoose.Schema; 
// Mongoose'un 'Schema' sınıfı, veritabanı şemasını tanımlamak için kullanılır.

const { join } = require('path'); 
// 'path' modülü, dosya ve dizin yollarını yönetmek için kullanılır.

const nowTime = require(join(__dirname, '..', 'helpers', 'nowTime.js')); 
// 'nowTime' fonksiyonu, 'helpers' klasöründen içe aktarılır. Bu fonksiyon, geçerli tarihi döndürür.

const contentSchema = new Schema({
   // 'contentSchema', içerik verileri için bir şema tanımlar.
   title: { type: String, require }, 
   // İçeriğin başlığı bir string olmalıdır (require: zorunlu alan).

   imgURL: { type: String, require }, 
   // İçeriğin görsel URL'si bir string olmalıdır (require: zorunlu alan).

   content: { type: String, require }, 
   // İçeriğin açıklama metni bir string olmalıdır (require: zorunlu alan).

   author: { type: String, require }, 
   // İçeriğin yazarı bir string olmalıdır (require: zorunlu alan).

   date: { type: String, default: nowTime() } 
   // İçeriğin oluşturulma tarihi, varsayılan olarak 'nowTime()' fonksiyonundan alınır.
});

const Contents = mongoose.model('Contents', contentSchema); 
// 'Contents' modeli, 'contentSchema' şemasına dayalı olarak oluşturulur ve MongoDB'de 'Contents' koleksiyonu ile ilişkilendirilir.

module.exports = Contents; 
// 'Contents' modeli dışa aktarılır, böylece başka dosyalarda kullanılabilir.
