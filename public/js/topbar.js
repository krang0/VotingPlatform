const topbar = document.getElementById('topbar'); 
// DOM'da 'id' değeri 'topbar' olan öğeyi seçer ve bir değişkene atar.

const searchEngine = document.getElementById('searchEngine'); 
// DOM'da 'id' değeri 'searchEngine' olan öğeyi seçer ve bir değişkene atar.

topbar.addEventListener('click', () => {
   // 'topbar' öğesine bir tıklama olayı dinleyicisi eklenir.
   searchEngine.classList.toggle('active'); 
   // 'searchEngine' öğesinin sınıf listesinde 'active' sınıfı varsa kaldırır, yoksa ekler.
});
