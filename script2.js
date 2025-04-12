document.addEventListener('DOMContentLoaded', function() {
    const products = [
      {
        id: 1,
        name: "Купальник для художественной гимнастики",
        price: 9500,
        image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg",
        category: "women"
      },
      {
        id: 2,
        name: "Топ для тренировок",
        price: 3200,
        image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg",
        category: "women"
      },
      {
        id: 3,
        name: "Костюм для фигурного катания",
        price: 12800,
        image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg",
        category: "women"
      },
      {
        id: 4,
        name: "Шорты для тренировок",
        price: 2800,
        image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg",
        category: "men"
      },
      {
        id: 5,
        name: "Футболка спортивная",
        price: 1900,
        image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg",
        category: "men"
      },
      {
        id: 6,
        name: "Легинсы для йоги",
        price: 4200,
        image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg",
        category: "women"
      },
      {
        id: 7,
        name: "Детский купальник",
        price: 3600,
        image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg",
        category: "children"
      },
      {
        id: 8,
        name: "Костюм для гимнастики детский",
        price: 4900,
        image: "https://i.pinimg.com/736x/08/4d/c2/084dc248f6d899391fbcba92d76050fc.jpg",
        category: "children"
      }
    ];
  
    const productsPerPage = 6;
    let currentPage = 1;
  
    function renderProducts() {
      const productsContainer = document.getElementById('products-container');
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
      productsContainer.innerHTML = '';
  
      if (currentProducts.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">Товары отсутствуют</p>';
        return;
      }
  
      currentProducts.forEach(product => {
        const productHTML = `
          <div class="product-item">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
              <h3 class="product-name">${product.name}</h3>
              <p class="product-price">${product.price.toLocaleString('ru-RU')} ₽</p>
            </div>
          </div>
        `;
        productsContainer.insertAdjacentHTML('beforeend', productHTML);
      });
    }
  
    function renderPagination() {
      const paginationContainer = document.getElementById('pagination');
      const totalPages = Math.ceil(products.length / productsPerPage);
  
      if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
      }
  
      let paginationHTML = `
        <button class="pagination-button prev" ${currentPage === 1 ? 'disabled' : ''}>
          <i class="fas fa-chevron-left"></i>
        </button>
      `;
  
      for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
          <button class="pagination-button ${currentPage === i ? 'active' : ''}">
            ${i}
          </button>
        `;
      }
  
      paginationHTML += `
        <button class="pagination-button next" ${currentPage === totalPages ? 'disabled' : ''}>
          <i class="fas fa-chevron-right"></i>
        </button>
      `;
  
      paginationContainer.innerHTML = paginationHTML;
  
      // Добавляем обработчики событий
      document.querySelector('.pagination-button.prev').addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderProducts();
          renderPagination();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  
      document.querySelector('.pagination-button.next').addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderProducts();
          renderPagination();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  
      document.querySelectorAll('.pagination-button:not(.prev):not(.next)').forEach((button, index) => {
        button.addEventListener('click', () => {
          currentPage = index + 1;
          renderProducts();
          renderPagination();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }
  
    // Инициализация
    renderProducts();
    renderPagination();
  });