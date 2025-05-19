const fs = require('fs') 
// 'fs' modülü dosya sistemi işlemleri için kullanılır.

const names = (files) => {
   // 'names' fonksiyonu, bir dosya için benzersiz bir isim oluşturur.
   let extension = files.mimetype.split('/')[1]; 
   // Dosyanın MIME türünden uzantıyı alır (örneğin, 'image/jpeg' -> 'jpeg').
   let uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}`; 
   // Benzersiz bir isim oluşturmak için zaman damgası ve rastgele bir sayı kullanılır.
   let allName = `${uniqueName}.${extension}`; 
   // Benzersiz ismi dosya uzantısı ile birleştirir.
   return allName; 
   // Tam ismi döndürür.
}

const sizeAndType = (res, files, callBack) => {
   // 'sizeAndType' fonksiyonu, dosyanın boyutunu ve türünü kontrol eder.
   let size = files.size; 
   // Dosyanın boyutunu alır.
   let types = files.mimetype; 
   // Dosyanın MIME türünü alır.
   if (size > 1024 * 1024 * 5) { 
      // Eğer dosya boyutu 5MB'dan büyükse:
      return res.json({
         message: 'Dosya boyutu istenilen boyutta değil!', 
         // Hata mesajı döner.
         case: false
      });
   } else {
      if (types === 'image/jpg' || types === 'image/jpeg' || types === 'image/png' || types === 'image/gif') {
         // Eğer dosya türü belirtilen resim formatlarından biriyse:
         callBack(); 
         // Belirtilen callback fonksiyonu çağrılır.
      } else {
         return res.json({
            message: 'Dosya türü sadece resim olmalıdır!', 
            // Hata mesajı döner.
            case: false
         });
      }
   }
}

const isThereFile = (filePath) => {
   // 'isThereFile' fonksiyonu, belirli bir dosyanın var olup olmadığını kontrol eder.
   try {
      fs.accessSync(filePath, fs.constants.F_OK); 
      // Belirtilen dosya yoluna erişim kontrol edilir.
      return true; 
      // Eğer erişim sağlanabiliyorsa, true döner.
   } catch {
      return false; 
      // Hata durumunda, dosyanın var olmadığı kabul edilir.
   }
}

module.exports = { names, sizeAndType, isThereFile };
// 'names', 'sizeAndType' ve 'isThereFile' fonksiyonları dışa aktarılır, böylece başka dosyalarda kullanılabilir.
