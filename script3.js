document.addEventListener('DOMContentLoaded', function() {
    // Обработка формы
    const form = document.getElementById('collective-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Получаем данные формы
      const formData = {
        name: form.elements['name'].value,
        phone: form.elements['phone'].value,
        message: form.elements['message'].value
      };
      
      // Валидация
      if (!formData.name || !formData.phone || !formData.message) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
      }
      
      // Имитация отправки
      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправка...';
      
      // В реальном приложении здесь был бы fetch или XMLHttpRequest
      setTimeout(() => {
        // Показываем сообщение об успехе
        formMessage.textContent = 'Спасибо! Ваша заявка отправлена. Наш менеджер свяжется с вами в ближайшее время для обсуждения деталей.';
        formMessage.classList.add('success');
        
        // Сбрасываем форму
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить заявку';
        
        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
          formMessage.classList.remove('success');
        }, 5000);
      }, 1000);
    });
  });