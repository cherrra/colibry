// Ждем полной загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {
  // Получаем элементы формы
  const form = document.getElementById('collective-form'); // Основная форма
  const submitBtn = document.getElementById('submit-btn'); // Кнопка отправки
  const formMessage = document.getElementById('form-message'); // Блок для сообщений
  
  // Элементы модального окна с пользовательским соглашением
  const agreementLink = document.querySelector('.agreement-link'); // Ссылка на соглашение
  const modal = document.getElementById('agreement-modal'); // Само модальное окно
  const closeModal = document.querySelector('.close-modal'); // Кнопка закрытия

  // 1. ОТКРЫТИЕ МОДАЛЬНОГО ОКНА СОГЛАШЕНИЯ
  agreementLink.addEventListener('click', function(e) {
    e.preventDefault(); // Отменяем стандартное поведение ссылки
    modal.style.display = 'block'; // Показываем модальное окно
  });

  // 2. ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
  // При клике на крестик
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  // При клике вне модального окна
  window.addEventListener('click', function(e) {
    if (e.target === modal) { // Если кликнули на фон
      modal.style.display = 'none';
    }
  });

  // 3. ОБРАБОТКА ОТПРАВКИ ФОРМЫ
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Отменяем стандартную отправку формы
    
    // Собираем данные формы в объект
    const formData = {
      name: form.elements['name'].value, // Имя
      phone: form.elements['phone'].value, // Телефон
      email: form.elements['mail'].value, // Email
      message: form.elements['message'].value, // Сообщение
      agreement: form.elements['agreement'].checked // Чекбокс согласия
    };
    
    // 4. ВАЛИДАЦИЯ ДАННЫХ
    // Проверка заполнения обязательных полей
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      showFormMessage('Пожалуйста, заполните все обязательные поля', 'error');
      return; // Прерываем выполнение
    }
    
    // Проверка согласия с условиями
    if (!formData.agreement) {
      showFormMessage('Необходимо согласиться с условиями обработки персональных данных', 'error');
      return;
    }
    
    // Валидация email с помощью регулярного выражения
    if (!validateEmail(formData.email)) {
      showFormMessage('Пожалуйста, введите корректный email', 'error');
      return;
    }
    
    // Валидация телефона (должен содержать минимум 10 цифр)
    if (!validatePhone(formData.phone)) {
      showFormMessage('Пожалуйста, введите корректный номер телефона', 'error');
      return;
    }
    
    // 5. ИМИТАЦИЯ ОТПРАВКИ ФОРМЫ
    submitBtn.disabled = true; // Блокируем кнопку
    submitBtn.textContent = 'Отправка...'; // Меняем текст
    
    // Имитация AJAX-запроса (в реальном коде здесь был бы fetch или XMLHttpRequest)
    setTimeout(() => {
      // Показываем сообщение об успехе
      showFormMessage('Спасибо! Ваша заявка отправлена. Наш менеджер свяжется с вами в ближайшее время для обсуждения деталей.', 'success');
      
      // Сбрасываем форму
      form.reset();
      // Разблокируем кнопку
      submitBtn.disabled = false;
      // Возвращаем исходный текст
      submitBtn.textContent = 'Отправить заявку';
    }, 1000); // Задержка 1 секунда для имитации
  });
  
  // 6. ФУНКЦИЯ ПОКАЗА СООБЩЕНИЙ
  function showFormMessage(message, type) {
    formMessage.textContent = message; // Устанавливаем текст
    formMessage.className = 'form-message'; // Сбрасываем классы
    formMessage.classList.add(type); // Добавляем класс типа сообщения
    
    // Автоматически скрываем сообщение через 5 секунд (кроме ошибок)
    if (type !== 'error') {
      setTimeout(() => {
        formMessage.classList.remove(type);
      }, 5000);
    }
  }
  
  // 7. ФУНКЦИЯ ВАЛИДАЦИИ EMAIL
  function validateEmail(email) {
    // Регулярное выражение для проверки email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email); // Возвращает true/false
  }
  
  // 8. ФУНКЦИЯ ВАЛИДАЦИИ ТЕЛЕФОНА
  function validatePhone(phone) {
    // Удаляем все нецифровые символы
    const digits = phone.replace(/\D/g, '');
    // Проверяем что осталось минимум 10 цифр
    return digits.length >= 10;
  }
});