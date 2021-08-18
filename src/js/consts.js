import { getLocalsStrings, getLang } from './localization';

export const consts = {
    DEBOUNCE_DELAY: 300,
    API_KEY: "8948cf34f147d17edd39edcb74badce4",
    API_URL: "https://api.themoviedb.org/3/",
    LANGUAGE: getLang(),
    // LANGUAGE: 'ru-RU',
    // LANGUAGE: 'uk-UA',
};

export const genres = {
    en: [
        { id: 28,       name: "Action" },
        { id: 12,       name: "Adventure" },
        { id: 16,       name: "Animation" },
        { id: 35,       name: "Comedy" },
        { id: 80,       name: "Crime" },
        { id: 99,       name: "Documentary" },
        { id: 18,       name: "Drama" },
        { id: 10751,    name: "Family" },
        { id: 14,       name: "Fantasy" },
        { id: 36,       name: "History" },
        { id: 27,       name: "Horror" },
        { id: 10402,    name: "Music" },
        { id: 9648,     name: "Mystery" },
        { id: 10749,    name: "Romance" },
        { id: 878,      name: "Science Fiction" },
        { id: 10770,    name: "TV Movie" },
        { id: 53,       name: "Thriller" },
        { id: 10752,    name: "War" },
        { id: 37,       name: "Western" },
    ],
    ru: [
        { id: 28,       name: "боевик"},
        { id: 12,       name: "приключения"},
        { id: 16,       name: "мультфильм"},
        { id: 35,       name: "комедия"},
        { id: 80,       name: "криминал"},
        { id: 99,       name: "документальный"},
        { id: 18,       name: "драма"},
        { id: 10751,    name: "семейный"},
        { id: 14,       name: "фэнтези"},
        { id: 36,       name: "история"},
        { id: 27,       name: "ужасы"},
        { id: 10402,    name: "музыка"},
        { id: 9648,     name: "детектив"},
        { id: 10749,    name: "мелодрама"},
        { id: 878,      name: "фантастика"},
        { id: 10770,    name: "телевизионный фильм"},
        { id: 53,       name: "триллер"},
        { id: 10752,    name: "военный"},
        { id: 37,       name: "вестерн"}
        ],
    uk: [
        { id: 28,       name: "Бойовик" },
        { id: 12,       name: "Пригоди"},
        { id: 16,       name: "Мультфільм"},
        { id: 35,       name: "Комедія"},
        { id: 80,       name: "Кримінал"},
        { id: 99,       name: "Документальний"},
        { id: 18,       name: "Драма"},
        { id: 10751,    name: "Сімейний"},
        { id: 14,       name: "Фентезі"},
        { id: 36,       name: "Історичний"},
        { id: 27,       name: "Жахи"},
        { id: 10402,    name: "Музика"},
        { id: 9648,     name: "Детектив"},
        { id: 10749,    name: "Мелодрама"},
        { id: 878,      name: "Фантастика"},
        { id: 10770,    name: "Телефільм"},
        { id: 53,       name: "Трилер"},
        { id: 10752,    name: "Військовий"},
        { id: 37,       name: "Вестерн"}],
};   

export const locals = getLocalsStrings();


