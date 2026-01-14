// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(n) {
    showSlide(n);
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Auto slide every 4 seconds
setInterval(nextSlide, 4000);

// Form submission
function handleSubmit(e) {
    e.preventDefault();
    alert('🎊 Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ liên hệ trong thời gian sớm nhất. Chúc mừng năm mới Ất Tỵ 2026!');
    e.target.reset();
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});