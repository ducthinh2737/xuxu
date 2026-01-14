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

// Đợi trang web tải xong mới thực thi code
document.getElementById('quoteForm').addEventListener('submit', function(event) {
    // 1. Chặn trang web tải lại khi nhấn Submit
    event.preventDefault();

    // 2. Lấy dữ liệu từ các ô Input
    const customerData = {
        name: document.getElementById('fullName').value,
        phone: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        content: document.getElementById('message').value,
        date: new Date().toLocaleString() // Lưu cả thời gian khách điền
    };

    // 3. Lấy danh sách khách hàng cũ từ LocalStorage (nếu có)
    // Nếu chưa có thì tạo mảng rỗng []
    let listCustomer = JSON.parse(localStorage.getItem('customers')) || [];

    // 4. Thêm khách hàng mới vào mảng danh sách
    listCustomer.push(customerData);

    // 5. Lưu mảng mới quay trở lại LocalStorage
    localStorage.setItem('customers', JSON.stringify(listCustomer));

    // 6. Thông báo và Reset form
    alert('🎊 Chúc mừng! Thông báo của bạn đã được gửi thành công.');
    this.reset(); 
    
    console.log('Dữ liệu hiện có trong LocalStorage:', listCustomer);
});