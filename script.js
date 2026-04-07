const observerOptions = {
    threshold: 0.2 // 當 20% 的區塊進入畫面時觸發
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.content').style.opacity = "1";
            entry.target.querySelector('.content').style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.parallax-section').forEach(section => {
    const content = section.querySelector('.content');
    // 初始化隱藏狀態
    content.style.opacity = "0";
    content.style.transform = "translateY(50px)";
    content.style.transition = "all 1s ease-out";
    
    observer.observe(section);
});

let currentLang = 'zh'; // 預設語言

function toggleLanguage() {
    // 1. 切換語言狀態
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    
    // 2. 更新按鈕文字 (顯示接下來可以切換到的語言)
    const langBtn = document.getElementById('lang-btn');
    langBtn.innerText = currentLang === 'zh' ? 'EN' : 'CN';

    // 3. 取得所有需要翻譯的元素
    const translatableElements = document.querySelectorAll('[data-zh]');

    translatableElements.forEach(el => {
        // 先稍微透明，營造切換感
        el.style.opacity = 0;
        
        setTimeout(() => {
            // 根據當前語言替換內容
            if (currentLang === 'en') {
                el.innerText = el.getAttribute('data-en');
            } else {
                el.innerText = el.getAttribute('data-zh');
            }
            // 恢復顯示
            el.style.opacity = 1;
        }, 300);
    });

    localStorage.setItem('preferredLang', currentLang);
}