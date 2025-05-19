const nowTime = () => {
   // 'nowTime' fonksiyonu, geçerli tarihi 'gün.ay.yıl' formatında döndürür.

   const date = new Date(); 
   // Yeni bir Date nesnesi oluşturulur, bu nesne geçerli tarihi ve saati içerir.

   const day = date.getDate(); 
   // Geçerli tarihin günü (1-31) alınır.

   const month = date.getMonth(); 
   // Geçerli tarihin ayı (0-11 arası, Ocak = 0) alınır.

   const year = date.getFullYear(); 
   // Geçerli yıl (4 basamaklı) alınır.

   const allDate = `${day}.${month + 1}.${year}`; 
   // Ay değerine 1 eklenerek (çünkü ay 0 tabanlıdır), tarih 'gün.ay.yıl' formatında birleştirilir.

   return allDate; 
   // Formatlanmış tarih döndürülür.
}

module.exports = nowTime; 
// 'nowTime' fonksiyonu dışa aktarılır, böylece başka dosyalarda kullanılabilir.
