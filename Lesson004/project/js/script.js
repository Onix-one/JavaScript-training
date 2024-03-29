/* Задание 1:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

/* Задание 2:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const promoAdvElements = document.querySelectorAll('.promo__adv img'),
        promoBgElement = document.querySelector('.promo__bg'),
        promoGenreElement = promoBgElement.querySelector('.promo__genre'),
        promoInteractiveListElement = document.querySelector('.promo__interactive-list'),
        submitButtonElement = document.querySelector('button'),
        inputElement = document.querySelectorAll('input')[1],
        checkBoxElement = document.querySelectorAll('input')[2];

    const removeAds = () => {
        promoAdvElements.forEach(item => item.remove());
    };

    const someChanges = () => {
        promoGenreElement.textContent = 'ДРАМА';

        promoBgElement.style.background = 'url("./img/bg.jpg") center center/cover no-repeat';
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    const clearElement = (element) => {
        element.innerHTML = null;
    };

    const createMovieList = (films, element) => {
        clearElement(element);
        sortArr(films);
        films.forEach((film, index) => {
            element.innerHTML += `
                <li class="promo__interactive-item">${index + 1} ${film}
                    <div class="delete"></div>
                </li>
                `;
        });
        addEventDeleteMovie(films, element);
        addEventAddMovie(films, element);
    };

    const addEventAddMovie = (films, element) => {
        submitButtonElement.addEventListener('click', (event) => {
            event.preventDefault();

            let filmName = inputElement.value;
            if (inputElement.value) {

                if (filmName.length > 20) {
                    filmName = `${filmName.substring(0, 21)}...`;
                }

                films.push(filmName.toUpperCase());

                createMovieList(films, element);

                if (checkBoxElement.checked) {
                    console.log("Добавляем любимый фильм");
                }
                inputElement.value = '';
            }
        });
    };

    const addEventDeleteMovie = (films, element) => {
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                films.splice(i, 1);
                createMovieList(films, element);
            });
        });
    };

    removeAds();
    someChanges();
    createMovieList(movieDB.movies, promoInteractiveListElement);

});




