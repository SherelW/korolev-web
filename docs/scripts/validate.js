class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.successMessage = document.getElementById('successMessage');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Реальная валидация при вводе
        this.setupRealTimeValidation();
    }

    setupRealTimeValidation() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        nameInput.addEventListener('input', () => this.validateName());
        emailInput.addEventListener('input', () => this.validateEmail());
        messageInput.addEventListener('input', () => this.validateMessage());
    }

    handleSubmit() {
        const isValid = this.validateForm();

        if (isValid) {
            this.sendFormData();
        } else {
            this.showFormErrors();
        }
    }

    validateForm() {
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isMessageValid = this.validateMessage();

        return isNameValid && isEmailValid && isMessageValid;
    }

    validateName() {
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        const name = nameInput.value.trim();

        this.clearError(nameInput, nameError);

        if (name === '') {
            this.showError(nameInput, nameError, 'Поле имени обязательно для заполнения');
            return false;
        }

        if (name.length < 2) {
            this.showError(nameInput, nameError, 'Имя должно содержать минимум 2 символа');
            return false;
        }

        if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(name)) {
            this.showError(nameInput, nameError, 'Имя может содержать только буквы, пробелы и дефисы');
            return false;
        }

        this.showSuccess(nameInput);
        return true;
    }

    validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const email = emailInput.value.trim();

        this.clearError(emailInput, emailError);

        if (email === '') {
            this.showError(emailInput, emailError, 'Поле email обязательно для заполнения');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showError(emailInput, emailError, 'Введите корректный email адрес');
            return false;
        }

        this.showSuccess(emailInput);
        return true;
    }

    validateMessage() {
        const messageInput = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        const message = messageInput.value.trim();

        this.clearError(messageInput, messageError);

        if (message === '') {
            this.showError(messageInput, messageError, 'Поле сообщения обязательно для заполнения');
            return false;
        }

        if (message.length < 10) {
            this.showError(messageInput, messageError, 'Сообщение должно содержать минимум 10 символов');
            return false;
        }

        if (message.length > 1000) {
            this.showError(messageInput, messageError, 'Сообщение не должно превышать 1000 символов');
            return false;
        }

        this.showSuccess(messageInput);
        return true;
    }

    showError(input, errorElement, message) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = message;
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 300);
    }

    showSuccess(input) {
        input.classList.remove('error');
        input.classList.add('success');
    }

    clearError(input, errorElement) {
        input.classList.remove('error', 'success');
        errorElement.textContent = '';
    }

    showFormErrors() {
        // Анимация для привлечения внимания к ошибкам
        const errorInputs = this.form.querySelectorAll('.error');
        errorInputs.forEach(input => {
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 300);
        });
    }

    sendFormData() {
        const formData = new FormData(this.form);
        const submitBtn = this.form.querySelector('.submit-btn');
        
        // Имитация отправки данных
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        // В реальном проекте здесь был бы fetch запрос
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
            this.clearAllValidations();
            
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить сообщение';
        }, 1500);
    }

    showSuccessMessage() {
        this.successMessage.style.display = 'block';
        
        setTimeout(() => {
            this.successMessage.style.display = 'none';
        }, 5000);
    }

    clearAllValidations() {
        const inputs = this.form.querySelectorAll('.form-input, .form-textarea');
        const errorMessages = this.form.querySelectorAll('.error-message');
        
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
        });
        
        errorMessages.forEach(error => {
            error.textContent = '';
        });
    }
}

// Инициализация формы при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    new ContactForm();
});