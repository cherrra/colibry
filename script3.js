// Ждем полной загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {

  const phoneElement = document.querySelector('.contact-info .phone');
  phoneElement.addEventListener('click', function() {
    const phoneNumber = this.textContent.trim().replace(/\D/g, '');
    window.location.href = `tel:${phoneNumber}`;
  });
  phoneElement.style.cursor = 'pointer'; 

  // Обработка клика на email
  const emailElement = document.querySelector('.contact-info .email');
  emailElement.addEventListener('click', function() {
    const email = this.textContent.trim();
    window.location.href = `mailto:${email}`;
  });
  emailElement.style.cursor = 'pointer'; 
  // Получаем все необходимые элементы со страницы:
  
  // Основная форма для отправки данных
  const form = document.getElementById('collective-form');
  
  // Кнопка отправки формы
  const submitBtn = document.getElementById('submit-btn');
  
  // Блок для вывода сообщений пользователю
  const formMessage = document.getElementById('form-message');
  
  // Ссылка на пользовательское соглашение
  const agreementLink = document.querySelector('.agreement-link');
  
  // Модальное окно с соглашением
  const modal = document.getElementById('agreement-modal');
  
  // Кнопка закрытия модального окна
  const closeModal = document.querySelector('.close-modal');

  // URL веб-приложения Google Apps Script, куда будут отправляться данные
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxGnlh-hjARzw19VYf31lqkRuJO-ZCyaslAtGyUF0gB8V8kMpEs3ROXnq2xzXQTLFxi5A/exec';

  // ================= ОБРАБОТКА МОДАЛЬНОГО ОКНА =================
  
  // Открытие модального окна при клике на ссылку соглашения
  agreementLink.addEventListener('click', function(e) {
    e.preventDefault(); // Отменяем стандартное поведение ссылки
    modal.style.display = 'block'; // Показываем модальное окно
  });

  // Закрытие модального окна при клике на крестик
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none'; // Скрываем модальное окно
  });

  // Закрытие модального окна при клике вне его области
  window.addEventListener('click', function(e) {
    if (e.target === modal) { // Если кликнули на фон модального окна
      modal.style.display = 'none'; // Скрываем модальное окно
    }
  });

  // ================= ОБРАБОТКА ОТПРАВКИ ФОРМЫ =================
  
  // Вешаем обработчик события отправки формы
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Отменяем стандартную отправку формы
    
    // Собираем данные формы в объект
    const formData = {
      name: form.elements['name'].value.trim(), // Имя (удаляем лишние пробелы)
      phone: form.elements['phone'].value.trim(), // Телефон
      email: form.elements['mail'].value.trim(), // Email
      message: form.elements['message'].value.trim(), // Сообщение
      agreement: form.elements['agreement'].checked, // Состояние чекбокса
      timestamp: new Date().toLocaleString() // Текущая дата и время
    };
    
    // Проверяем данные на валидность
    if (!validateForm(formData)) return; // Если не валидны - прерываем
    
    // Отправляем данные в Google Sheets
    sendToGoogleSheets(formData);
  });
  
  // ================= ФУНКЦИЯ ВАЛИДАЦИИ ФОРМЫ =================
  function validateForm(data) {
    // Проверка заполнения обязательных полей
    if (!data.name || !data.phone || !data.email || !data.message) {
      showFormMessage('Пожалуйста, заполните все обязательные поля', 'error');
      return false;
    }
    
    // Проверка согласия с условиями обработки данных
    if (!data.agreement) {
      showFormMessage('Необходимо согласиться с условиями обработки персональных данных', 'error');
      return false;
    }
    
    // Валидация email с помощью регулярного выражения
    if (!validateEmail(data.email)) {
      showFormMessage('Пожалуйста, введите корректный email', 'error');
      return false;
    }
    
    // Валидация телефона (минимум 10 цифр)
    if (!validatePhone(data.phone)) {
      showFormMessage('Пожалуйста, введите корректный номер телефона (минимум 10 цифр)', 'error');
      return false;
    }
    
    // Если все проверки пройдены
    return true;
  }
  
  // ================= ОТПРАВКА ДАННЫХ В GOOGLE SHEETS =================
  function sendToGoogleSheets(data) {
    // Блокируем кнопку отправки и меняем текст
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
    
    // Создаем объект FormData для передачи данных
    const payload = new FormData();
    payload.append('name', data.name); // Добавляем имя
    payload.append('phone', data.phone); // Добавляем телефон
    payload.append('email', data.email); // Добавляем email
    payload.append('message', data.message); // Добавляем сообщение
    
    // Отправляем данные на сервер с помощью Fetch API
    fetch(scriptURL, {
      method: 'POST', // Метод запроса
      body: payload, // Тело запроса (наши данные)
      mode: 'no-cors' // Режим без CORS (необходимо для Google Apps Script)
    })
    .then(() => {
      // В случае успешной отправки:
      showFormMessage('Спасибо! Ваша заявка отправлена.', 'success');
      form.reset(); // Очищаем форму
    })
    .catch(error => {
      // В случае ошибки:
      console.error('Error:', error); // Логируем ошибку в консоль
      showFormMessage('Ошибка при отправке. Пожалуйста, попробуйте еще раз.', 'error');
    })
    .finally(() => {
      // В любом случае (успех или ошибка):
      submitBtn.disabled = false; // Разблокируем кнопку
      submitBtn.textContent = 'Отправить заявку'; // Возвращаем исходный текст
    });
  }
  
  // ================= ФУНКЦИЯ ПОКАЗА СООБЩЕНИЙ =================
  function showFormMessage(message, type) {
    // Устанавливаем текст сообщения
    formMessage.textContent = message;
    
    // Сбрасываем классы и добавляем класс типа сообщения (success/error)
    formMessage.className = 'form-message';
    formMessage.classList.add(type);
    
    // Если сообщение не об ошибке, скрываем его через 5 секунд
    if (type !== 'error') {
      setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
      }, 5000);
    }
  }
  
  // ================= ФУНКЦИЯ ВАЛИДАЦИИ EMAIL =================
  function validateEmail(email) {
    // Регулярное выражение для проверки email:
    // - до @: любые символы кроме пробелов и @
    // - после @: любые символы кроме пробелов и @
    // - точка и домен: любые символы кроме пробелов и @
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email); // Возвращает true если email валиден
  }
  
  // ================= ФУНКЦИЯ ВАЛИДАЦИИ ТЕЛЕФОНА =================
  function validatePhone(phone) {
    // Удаляем все нецифровые символы из номера
    const digits = phone.replace(/\D/g, '');
    // Проверяем что осталось минимум 10 цифр
    return digits.length >= 10;
  }
});