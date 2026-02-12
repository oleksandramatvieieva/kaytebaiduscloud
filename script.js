document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.getElementById('image-slideshow');
    
    // Перевіряємо, чи існує контейнер слайдера на цій сторінці
    if (slideshowContainer) {
        const slideUrls = [
            "img/slider/IMG_1899.jpg",
            "img/slider/IMG_1900.jpg",
            "img/slider/IMG_1873.jpg",
            "img/slider/5.png"
        ];

        let currentSlide = 0;

        function createSlides() {
            slideUrls.forEach(url => {
                const slide = document.createElement('div');
                slide.classList.add('slide');
                slide.style.backgroundImage = `url('${url}')`;
                slideshowContainer.appendChild(slide);
            });
            // Додаємо клас active тільки якщо слайди створилися
            if (slideshowContainer.children.length > 0) {
                slideshowContainer.children[0].classList.add('active');
            }
        }

        function nextSlide() {
            const slides = slideshowContainer.getElementsByClassName('slide');
            if (slides.length === 0) return;
            
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        createSlides();
        setInterval(nextSlide, 4000);
    }
    
    // Встановлення фонових зображень через data-attribute
    document.querySelectorAll('[data-bg-url]').forEach(section => {
        const url = section.getAttribute('data-bg-url');
        section.style.backgroundImage = `url('${url}')`;
    });
});

let currentImageIndex = 0;
let currentImages = [];

function openProduct(element) {
    const modal = document.getElementById('product-modal');
    
    // Отримуємо ТІЛЬКИ картинки
    const imagesString = element.getAttribute('data-images');
    
    if (imagesString) {
        currentImages = imagesString.split(',').map(item => item.trim());
    } else {
        // Якщо раптом забули додати слайдер, беремо основне фото
        const mainImg = element.querySelector('img').src;
        currentImages = [mainImg];
    }
    
    // Скидаємо на перше фото
    currentImageIndex = 0;
    updateModalImage();
    
    // Показуємо стрілочки тільки якщо фоток більше ніж 1
    const buttons = document.querySelectorAll('.slider-btn');
    if (currentImages.length > 1) {
        buttons.forEach(btn => btn.style.display = 'block');
    } else {
        buttons.forEach(btn => btn.style.display = 'none');
    }

    // Показуємо вікно (flex, щоб працювало центрування)
    modal.style.display = 'flex'; 
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function changeSlide(direction) {
    currentImageIndex += direction;
    if (currentImageIndex >= currentImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = currentImages.length - 1;
    }
    updateModalImage();
}

function updateModalImage() {
    const imgElement = document.getElementById('modal-main-image');
    if(currentImages.length > 0) {
        imgElement.src = currentImages[currentImageIndex];
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target == modal) {
        closeModal();
    }
}