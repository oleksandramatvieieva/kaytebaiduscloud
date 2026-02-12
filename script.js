document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.getElementById('image-slideshow');
    
    if (slideshowContainer) {
        const slideUrls = [
            "image/sliders/IMG_1899.jpg",
            "image/sliders/IMG_1900.jpg",
            "image/sliders/IMG_1873.jpg",
            "image/sliders/5.png"
        ];

        let currentSlide = 0;

        function createSlides() {
            slideUrls.forEach(url => {
                const slide = document.createElement('div');
                slide.classList.add('slide');
                slide.style.backgroundImage = `url('${url}')`;
                slideshowContainer.appendChild(slide);
            });
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
    
    document.querySelectorAll('[data-bg-url]').forEach(section => {
        const url = section.getAttribute('data-bg-url');
        section.style.backgroundImage = `url('${url}')`;
    });

    // --- ДОДАЄМО СВАЙПИ ДЛЯ МОДАЛКИ ПРИ ЗАВАНТАЖЕННІ ---
    const modalImage = document.getElementById('modal-main-image');
    let touchStartX = 0;
    let touchEndX = 0;

    if (modalImage) {
        modalImage.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        modalImage.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const threshold = 50; // Чутливість свайпу
        if (touchStartX - touchEndX > threshold) {
            changeSlide(1); // Свайп вліво -> вперед
        } else if (touchEndX - touchStartX > threshold) {
            changeSlide(-1); // Свайп вправо -> назад
        }
    }
});

let currentImageIndex = 0;
let currentImages = [];

function openProduct(element) {
    const modal = document.getElementById('product-modal');
    const imagesString = element.getAttribute('data-images');
    
    if (imagesString) {
        currentImages = imagesString.split(',').map(item => item.trim());
    } else {
        const mainImg = element.querySelector('img').src;
        currentImages = [mainImg];
    }
    
    currentImageIndex = 0;
    updateModalImage();
    
    const buttons = document.querySelectorAll('.slider-btn');
    if (currentImages.length > 1) {
        buttons.forEach(btn => btn.style.display = 'block');
    } else {
        buttons.forEach(btn => btn.style.display = 'none');
    }

    modal.style.display = 'flex'; 
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function changeSlide(direction) {
    if (currentImages.length <= 1) return; // Якщо одне фото, не гортаємо
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