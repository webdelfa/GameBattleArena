// ---------------------- Список игр ---------------------------------------------
const swiper = new Swiper('.games-carousel', {
    loop: true, // Бесконечный цикл
    slidesPerView: 'auto', // Количество видимых слайдов
    // spaceBetween: 0, // Расстояние между слайдами
    centeredSlides: true, // Центрируем слайды
    navigation: {
        nextEl: '.games-carousel__control--next', // Кнопка "вперёд"
        prevEl: '.games-carousel__control--prev', // Кнопка "назад"
    },
    pagination: {
        el: '.games-carousel__indicators', // Индикаторы
        clickable: true, // Возможность клика
        bulletClass: 'games-carousel__indicator', // Класс индикатора
        bulletActiveClass: 'active', // Класс активного индикатора
    },
});

// ---------------------------- Прокрутка элементов расписания ------------------------------

const events = document.querySelector('.events');
const list = document.querySelector('.events__list');
let isDragging = false;
let startX, currentTranslate = 0;

// Вычисляем максимальное значение прокрутки
// 15 добавил чтобы последний элемент не прилипал к краю
const maxScroll = list.scrollWidth - events.clientWidth + 15;

// Проверяем, нужно ли включать прокрутку
const isScrollable = list.scrollWidth > events.clientWidth;

// Обработчики для мыши
events.addEventListener('mousedown', (e) => {
    if (!isScrollable) return; // Если прокрутка не нужна, выходим
    isDragging = true;
    startX = e.pageX;
    currentTranslate = getTranslateX(list); // Обновляем currentTranslate
    events.style.cursor = 'grabbing';
});

events.addEventListener('mousemove', (e) => {
    if (!isDragging || !isScrollable) return; // Если прокрутка не нужна, выходим
    e.preventDefault();
    const x = e.pageX - startX;
    let newTranslate = currentTranslate + x;

    // Ограничиваем прокрутку в пределах границ
    if (newTranslate > 0) newTranslate = 0; // Нельзя прокрутить влево за начало
    if (newTranslate < -maxScroll) newTranslate = -maxScroll; // Нельзя прокрутить вправо за конец

    list.style.transform = `translateX(${newTranslate}px)`;
});

events.addEventListener('mouseup', (e) => {
    if (!isDragging || !isScrollable) return; // Если прокрутка не нужна, выходим
    isDragging = false;
    events.style.cursor = 'grab';

    // Обновляем текущее значение translateX
    const x = e.pageX - startX;
    currentTranslate += x;

    // Ограничиваем текущее значение в пределах границ
    if (currentTranslate > 0) currentTranslate = 0;
    if (currentTranslate < -maxScroll) currentTranslate = -maxScroll;
});

events.addEventListener('mouseleave', () => {
    if (!isDragging || !isScrollable) return; // Если прокрутка не нужна, выходим
    isDragging = false;
    events.style.cursor = 'grab';
});

// Обработчики для тач-устройств
events.addEventListener('touchstart', (e) => {
    if (!isScrollable) return; // Если прокрутка не нужна, выходим
    isDragging = true;
    startX = e.touches[0].clientX;
    currentTranslate = getTranslateX(list); // Обновляем currentTranslate
});

events.addEventListener('touchmove', (e) => {
    if (!isDragging || !isScrollable) return; // Если прокрутка не нужна, выходим
    e.preventDefault();
    const x = e.touches[0].clientX - startX;
    let newTranslate = currentTranslate + x;

    // Ограничиваем прокрутку в пределах границ
    if (newTranslate > 0) newTranslate = 0; // Нельзя прокрутить влево за начало
    if (newTranslate < -maxScroll) newTranslate = -maxScroll; // Нельзя прокрутить вправо за конец

    list.style.transform = `translateX(${newTranslate}px)`;
});

events.addEventListener('touchend', () => {
    if (!isDragging || !isScrollable) return; // Если прокрутка не нужна, выходим
    isDragging = false;
});

// Функция для получения текущего значения translateX
function getTranslateX(element) {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrix(style.transform);
    return matrix.m41; // m41 соответствует translateX
}

// ------------------------------------ Аккордеон ---------------------------------------------
// Закрываем все ответы кроме первого
document.querySelectorAll('.questions-accordion__content').forEach((item, index) => {
    if (index !== 0) {
        item.classList.add('hidden');
    }
});
document.querySelectorAll('.questions-accordion__header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;

        // Закрываем другие открытые ответы
        document.querySelectorAll('.questions-accordion__content').forEach(item => {
            if (item !== content) {
                item.classList.add('hidden');
            }
        });

        // Переключаем отображение текущего ответа
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
        } else {
            content.classList.add('hidden');
        }
    });
});

// ---------------------------- Бургер --------------------------------
const burgerMenu = document.getElementById('burger');
const navMenu = document.querySelector('.header .nav');
const header = document.querySelector('.header');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    header.classList.toggle('fixed');
});
