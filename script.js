// Ждем полной загрузки DOM перед выполнением скриптов
document.addEventListener('DOMContentLoaded', function() {
  // Инициализация бургер-меню
  initBurgerMenu();
  
  // Рендерим баннер сразу после загрузки страницы
  renderBanner();
  
  // Рендерим рекомендуемые товары
  renderFeaturedProducts();
});

// Функция для инициализации бургер-меню
function initBurgerMenu() {
  const burger = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  burger.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
  });
  
  // Закрытие меню при клике на ссылку
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
}

// Функция для создания и управления баннером-слайдером
function renderBanner() {
  // Данные для баннера - массив объектов с информацией о каждом слайде
  const bannerData = [
    {
      id: 1,
      title: "Новая коллекция 2025",
      description: "Элегантность и комфорт для ваших тренировок",
      image: "https://images.unsplash.com/photo-1615213253844-9a9f484daf1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "Индивидуальный пошив",
      description: "Создайте свой уникальный образ",
      image: "https://images.unsplash.com/photo-1615213253844-9a9f484daf1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: "Скидки до 30%",
      description: "На коллекцию прошлого сезона",
      image: "https://images.unsplash.com/photo-1603988363607-e1e4a554d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];
  
  // Начинаем формировать HTML для баннера
  let bannerHTML = `
    <div class="relative h-[60vh] md:h-[70vh] overflow-hidden" id="banner-container">
  `;
  
  // Добавляем слайды в баннер
  bannerData.forEach((slide, index) => {
    bannerHTML += `
      <div class="banner-slide ${index === 0 ? 'active' : ''}" data-id="${slide.id}">     
        <div class="bg-cover" style="background-image: url(${slide.image})"></div>
        <div class="bg-black"></div>
        <div class="banner-content">
          <div>
            <h2>${slide.title}</h2>
            <p>${slide.description}</p>
          </div>
        </div>
      </div>
    `;
  });
  
  // Добавляем кнопки навигации (влево/вправо)
  bannerHTML += `
    <button class="banner-nav prev" aria-label="Previous slide">
      <i class="fas fa-chevron-left"></i>
    </button>
    <button class="banner-nav next" aria-label="Next slide">
      <i class="fas fa-chevron-right"></i>
    </button>
      <div class="banner-dots">
  `;
  
  // Добавляем точки-индикаторы для каждого слайда
  bannerData.forEach((_, index) => {
    bannerHTML += `
      <button class="banner-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>
    `;
  });
  
  bannerHTML += `</div></div>`;
  
  // Вставляем готовый HTML баннера в DOM
  document.getElementById('banner').innerHTML = bannerHTML;
  
  // Логика работы слайдера
  let currentSlide = 0; // Текущий активный слайд
  let isAnimating = false; // Флаг анимации (чтобы предотвратить наложение анимаций)
  const slides = document.querySelectorAll('.banner-slide'); // Все слайды
  const dots = document.querySelectorAll('.banner-dot'); // Все точки-индикаторы
  const prevButton = document.querySelector('.banner-nav.prev'); // Кнопка "назад"
  const nextButton = document.querySelector('.banner-nav.next'); // Кнопка "вперед"
  
  // Функция переключения на конкретный слайд
  function goToSlide(index) {
    // Если идет анимация или запрашиваемый слайд уже активен - выходим
    if (isAnimating || index === currentSlide) return;
    
    isAnimating = true; // Устанавливаем флаг анимации
    
    // Скрываем текущий слайд
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Показываем новый слайд
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Сбрасываем флаг анимации через 500мс (длительность анимации)
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
  
  // Переход к предыдущему слайду
  function goToPrevSlide() {
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(newIndex);
  }
  
  // Переход к следующему слайду
  function goToNextSlide() {
    const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(newIndex);
  }
  
  // Навешиваем обработчики событий:
  
  // Клик по кнопке "назад"
  prevButton.addEventListener('click', goToPrevSlide);
  
  // Клик по кнопке "вперед"
  nextButton.addEventListener('click', goToNextSlide);
  
  // Клик по точкам-индикаторам
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      goToSlide(index);
    });
  });
  
  // Автоматическая прокрутка слайдов каждые 5 секунд
  let interval = setInterval(goToNextSlide, 5000);
  
  // Приостанавливаем автопрокрутку при наведении мыши на баннер
  const bannerContainer = document.getElementById('banner-container');
  bannerContainer.addEventListener('mouseenter', () => {
    clearInterval(interval);
  });
  
  // Возобновляем автопрокрутку, когда мышь убирают
  bannerContainer.addEventListener('mouseleave', () => {
    interval = setInterval(goToNextSlide, 5000);
  });
}

// Функция для отображения рекомендуемых товаров
function renderFeaturedProducts() {
  // Данные товаров - массив объектов
  const featuredProducts = [
    {
      id: 1,
      name: "Костюм1",
      price: 9500,
      image: "https://i.pinimg.com/736x/8d/0f/9a/8d0f9ad893bafd6a80b34dcf2354c463.jpg"
    },
    {
      id: 2,
      name: "Костюм2",
      price: 3200,
      image: "https://i.pinimg.com/736x/5f/2a/1a/5f2a1a8b876b87a94aeaf4da56e9c328.jpg"
    },
    {
      id: 3,
      name: "Костюм3",
      price: 12800,
      image: "https://i.pinimg.com/736x/74/b3/1c/74b31c0938c2942fbc68954a5bd7a8c8.jpg"
    }
  ];
  
  // Контейнер для товаров
  const productsContainer = document.getElementById('featured-products');
  
  // Для каждого товара создаем HTML-разметку и добавляем в контейнер
  featuredProducts.forEach(product => {
    const productHTML = `
      <div class="product-card">
        <div class="overflow-hidden">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="product-image"
          />
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">${product.price.toLocaleString('ru-RU')} ₽</p>
        </div>
      </div>
    `;
    
    // Вставляем HTML товара в конец контейнера
    productsContainer.insertAdjacentHTML('beforeend', productHTML);
  });
}