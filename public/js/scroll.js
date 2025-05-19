const targets = document.querySelectorAll('.target'); 
// DOM'da '.target' sınıfına sahip tüm öğeleri seçer ve bir NodeList döner.

const options = {
   threshold: 0.3 
   // Gözlemlenen öğenin görünürlüğünün %30'u viewport'a girdiğinde tetiklenecek.
};

const callBack = (entries) => {
   // IntersectionObserver tarafından tetiklenen geri çağırma fonksiyonu.
   entries.forEach((entry) => {
      // Her gözlemlenen öğe (entry) için işlem yapar.
      if (entry.isIntersecting) {
         // Eğer öğe viewport ile kesişiyorsa:
         entry.target.classList.add('active'); 
         // Öğeye 'active' sınıfı eklenir.
      } else {
         // Eğer öğe viewport ile kesişmiyorsa:
         entry.target.classList.remove('active'); 
         // Öğeden 'active' sınıfı kaldırılır.
      }
   });
};

var observer = new IntersectionObserver(callBack, options); 
// IntersectionObserver oluşturulur, geri çağırma fonksiyonu ve seçenekler atanır.

targets.forEach((target) => {
   observer.observe(target); 
   // Her '.target' öğesi gözlemciye kaydedilir.
});
