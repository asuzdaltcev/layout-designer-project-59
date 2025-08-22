// Основной JavaScript файл
document.addEventListener('DOMContentLoaded', function() {
  console.log('Проект загружен!');
  
  // Инициализация Bootstrap компонентов
  initBootstrapComponents();
  
  // Добавление анимаций
  addAnimations();
});

// Инициализация Bootstrap компонентов
function initBootstrapComponents() {
  // Инициализация всех tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Инициализация всех popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
}

// Добавление анимаций
function addAnimations() {
  // Анимация появления карточек
  const cards = document.querySelectorAll('.card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Утилиты
const utils = {
  // Форматирование даты
  formatDate: function(date) {
    return new Intl.DateTimeFormat('ru-RU').format(date);
  },
  
  // Генерация случайного ID
  generateId: function() {
    return Math.random().toString(36).substr(2, 9);
  },
  
  // Проверка поддержки localStorage
  isLocalStorageSupported: function() {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(e) {
      return false;
    }
  }
};

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { utils };
}
