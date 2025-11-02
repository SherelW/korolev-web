class PortfolioModal {
    constructor() {
        this.currentModal = null;
        this.currentGallery = null;
        this.currentIndex = 0;
        this.totalImages = 0;
        this.init();
    }

    init() {
        // Обработчики для карточек проектов
        document.querySelectorAll('.modal-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });

        // Обработчики для кнопок закрытия
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                this.closeAllModals();
            });
        });

        // Закрытие по клику на фон
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAllModals();
                }
            });
        });

        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    openModal(modalId) {
        // Закрываем все модалки перед открытием новой
        this.closeAllModals();
        
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '15px'; // Предотвращает смещение контента
            
            this.currentModal = modal;
            this.initGallery(modal);
        }
    }

    initGallery(modal) {
        const gallery = modal.querySelector('.modal-gallery');
        if (!gallery) return;

        this.currentGallery = gallery;
        
        const thumbnails = gallery.querySelectorAll('.modal-gallery-thumbnails img');
        this.totalImages = thumbnails.length;
        
        // Находим активную миниатюру или устанавливаем первую
        const activeThumb = gallery.querySelector('.modal-gallery-thumbnails img.active');
        this.currentIndex = activeThumb ? parseInt(activeThumb.getAttribute('data-index')) : 0;

        // Инициализируем первую картинку
        this.updateMainImage();

        // Обработчики для миниатюр
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateMainImage();
            });
        });

        // Обработчики для кнопок навигации
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');

        if (prevBtn) {
            prevBtn.onclick = () => {
                this.prevImage();
            };
        }

        if (nextBtn) {
            nextBtn.onclick = () => {
                this.nextImage();
            };
        }

        // Обновляем счетчик
        this.updateGalleryCounter();
    }

    updateGalleryCounter() {
        if (!this.currentGallery) return;
        
        const counter = this.currentGallery.querySelector('.gallery-counter');
        if (counter) {
            counter.textContent = `${this.currentIndex + 1} / ${this.totalImages}`;
        }
    }

    updateMainImage() {
        if (!this.currentGallery) return;

        const mainImg = this.currentGallery.querySelector('.modal-gallery-main');
        const thumbnails = this.currentGallery.querySelectorAll('.modal-gallery-thumbnails img');

        if (mainImg && thumbnails[this.currentIndex]) {
            // Обновляем основное изображение
            mainImg.src = thumbnails[this.currentIndex].src;
            mainImg.alt = thumbnails[this.currentIndex].alt;

            // Обновляем активную миниатюру
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnails[this.currentIndex].classList.add('active');

            // Обновляем счетчик
            this.updateGalleryCounter();
        }
    }

    nextImage() {
        if (this.totalImages === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.totalImages;
        this.updateMainImage();
    }

    prevImage() {
        if (this.totalImages === 0) return;
        this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.updateMainImage();
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        this.currentModal = null;
        this.currentGallery = null;
        this.currentIndex = 0;
    }
}

// Инициализация когда DOM загружен
document.addEventListener('DOMContentLoaded', function() {
    const modalManager = new PortfolioModal();

    // Добавляем обработку клавиш для листания фото
    document.addEventListener('keydown', function(e) {
        if (modalManager.currentGallery) {
            switch(e.key) {
                case 'ArrowLeft':
                    modalManager.prevImage();
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    modalManager.nextImage();
                    e.preventDefault();
                    break;
            }
        }
    });
});