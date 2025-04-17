// Ожидаем полной загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {
  // Массив объектов с данными о товарах
  const products = [
    {
      id: 1,
      name: "Купальник для художественной гимнастики",
      price: 9500,
      image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg"
    },
    {
      id: 2,
      name: "Топ для тренировок",
      price: 3200,
      image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg"
    },
    {
      id: 3,
      name: "Костюм для фигурного катания",
      price: 12800,
      image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg"
    },
    {
      id: 4,
      name: "Шорты для тренировок",
      price: 2800,
      image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg"
    },
    {
      id: 5,
      name: "Футболка спортивная",
      price: 1900,
      image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg"
    },
    {
      id: 6,
      name: "Легинсы для йоги",
      price: 4200,
      image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg"
    },
    {
      id: 7,
      name: "Детский купальник",
      price: 3600,
      image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg"
    },
    {
      id: 8,
      name: "Костюм для гимнастики детский",
      price: 4900,
      image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg"
    }
  ];
  
  // Количество товаров на одной странице
  const productsPerPage = 6;
  // Текущая страница (начинаем с 1)
  let currentPage = 1;

  // Функция отображения товаров на текущей странице
  function renderProducts() {
    // Контейнер для товаров
    const productsContainer = document.getElementById('products-container');
    
    // Рассчитываем индексы товаров для текущей страницы
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    
    // Получаем подмассив товаров для текущей страницы
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Очищаем контейнер
    productsContainer.innerHTML = '';

    // Если товаров нет - показываем сообщение
    if (currentProducts.length === 0) {
      productsContainer.innerHTML = '<p class="no-products">Товары отсутствуют</p>';
      return;
    }

    // Для каждого товара создаем HTML-разметку
    currentProducts.forEach(product => {
      const productHTML = `
        <div class="product-item">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <!-- Форматируем цену в русский формат -->
            <p class="product-price">${product.price.toLocaleString('ru-RU')} ₽</p>
          </div>
        </div>
      `;
      // Добавляем товар в контейнер
      productsContainer.insertAdjacentHTML('beforeend', productHTML);
    });
  }

  // Функция отображения пагинации
  function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    // Общее количество страниц
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Если всего 1 страница - скрываем пагинацию
    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    // Начинаем формировать HTML пагинации
    let paginationHTML = `
      <!-- Кнопка "Назад" (disabled если на первой странице) -->
      <button class="pagination-button prev" ${currentPage === 1 ? 'disabled' : ''}>
        <i class="fas fa-chevron-left"></i>
      </button>
    `;

    // Добавляем кнопки с номерами страниц
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `
        <button class="pagination-button ${currentPage === i ? 'active' : ''}">
          ${i}
        </button>
      `;
    }

    // Кнопка "Вперед" (disabled если на последней странице)
    paginationHTML += `
      <button class="pagination-button next" ${currentPage === totalPages ? 'disabled' : ''}>
        <i class="fas fa-chevron-right"></i>
      </button>
    `;

    // Вставляем пагинацию в DOM
    paginationContainer.innerHTML = paginationHTML;

    // Обработчик для кнопки "Назад"
    document.querySelector('.pagination-button.prev').addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderProducts(); // Перерисовываем товары
        renderPagination(); // Обновляем пагинацию
        // Плавная прокрутка вверх
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Обработчик для кнопки "Вперед"
    document.querySelector('.pagination-button.next').addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
        renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Обработчики для кнопок с номерами страниц
    document.querySelectorAll('.pagination-button:not(.prev):not(.next)').forEach((button, index) => {
      button.addEventListener('click', () => {
        currentPage = index + 1; // Нумерация с 1
        renderProducts();
        renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // Инициализация - первая отрисовка
  renderProducts();
  renderPagination();
});