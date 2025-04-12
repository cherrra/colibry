document.addEventListener('DOMContentLoaded', function() {
    // Render banner
    renderBanner();
    
    // Render featured products
    renderFeaturedProducts();
  });
  
  function renderBanner() {
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
    
    let bannerHTML = `
      <div class="relative h-[60vh] md:h-[70vh] overflow-hidden" id="banner-container">
    `;
    
    // Add slides
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
    
    // Add navigation arrows
    bannerHTML += `
      <button class="banner-nav prev" aria-label="Previous slide">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="banner-nav next" aria-label="Next slide">
        <i class="fas fa-chevron-right"></i>
      </button>
      
      <div class="banner-dots">
    `;
    
    // Add dots
    bannerData.forEach((_, index) => {
      bannerHTML += `
        <button class="banner-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>
      `;
    });
    
    bannerHTML += `</div></div>`;
    
    document.getElementById('banner').innerHTML = bannerHTML;
    
    // Banner functionality
    let currentSlide = 0;
    let isAnimating = false;
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    const prevButton = document.querySelector('.banner-nav.prev');
    const nextButton = document.querySelector('.banner-nav.next');
    
    function goToSlide(index) {
      if (isAnimating || index === currentSlide) return;
      
      isAnimating = true;
      
      // Hide current slide
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      
      // Show new slide
      currentSlide = index;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
      
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    }
    
    function goToPrevSlide() {
      const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
      goToSlide(newIndex);
    }
    
    function goToNextSlide() {
      const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
      goToSlide(newIndex);
    }
    
    // Event listeners
    prevButton.addEventListener('click', goToPrevSlide);
    nextButton.addEventListener('click', goToNextSlide);
    
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        goToSlide(index);
      });
    });
    
    // Auto slide
    let interval = setInterval(goToNextSlide, 5000);
    
    // Pause on hover
    const bannerContainer = document.getElementById('banner-container');
    bannerContainer.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });
    
    bannerContainer.addEventListener('mouseleave', () => {
      interval = setInterval(goToNextSlide, 5000);
    });
  }
  
  function renderFeaturedProducts() {
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
    
    const productsContainer = document.getElementById('featured-products');
    
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
      
      productsContainer.insertAdjacentHTML('beforeend', productHTML);
    });
  }