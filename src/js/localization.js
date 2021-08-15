import LocalizedStrings from 'localized-strings';
// import Notiflix from "notiflix";
import { getRefsLocals } from "./refs"
export const getLang = () => {
    const lang = localStorage.getItem('language');
    if (lang) {
        document.scrollingElement.lang = (lang[3]+lang[4]).toLowerCase();
        return lang;
    } else {
        localStorage.setItem('language', 'en-US');
        document.scrollingElement.lang = 'en';
        return 'en-US';
    };
};

function getCustomInterfaceLanguage() {
  return getLang();
}

export const getLocalsStrings = () => {
    let strings = new LocalizedStrings({
        'en-US': {
            trending_text: "Trending",
            latest_text: "Latest",
            now_playing_text: "Now Playing",
            popular_text: "Popular",  
            top_rated_text: "Top Rated",  
            upcoming_text: "Upcoming",
            filmoteka_text: "Filmoteka",
            search_films_text: "Search films",
            home_text: "HOME",
            my_library_text: "MY LIBRARY",
            rights_text: "All Rights Reserved",
            devs_text: "Developed with",
            by_text: "by",
            watched_text: "WATCHED",
            queue_text: "QUEUE",
            vote_text: "Vote / Votes",
            popularity_text: "Popularity",
            title_orign_text: "Original Title",
            genre_text: "Genre",
            about_text: "About",
            add_to_watched_text: "add to watched",
            add_to_queue_text: "add to queue",
            close_devs_text: "close",
            team_devs_text: 'Team "ReacTeam"',
            control_info_text: 'Controls',
        },
        'ru-RU': {
            trending_text: "В Тренде",
            latest_text: "Последние",
            now_playing_text: "Сейчас в прокате",
            popular_text: "Популярные",  
            top_rated_text: "За рейтингом",  
            upcoming_text: "Скоро в прокате",
            filmoteka_text: "Фильмотека",
            search_films_text: "Поиск фильмов",
            home_text: "ГЛАВНАЯ",
            my_library_text: "МОЯ БИБЛИОТЕКА",
            rights_text: "Все права защищены",
            devs_text: "Разработано с",
            by_text: "студентами",
            watched_text: "ПРОСМОТРЕННЫЕ",
            queue_text: "ЗАПЛАНИРОВАННЫЕ",
            vote_text: "Голосов",
            popularity_text: "Популярность",
            title_orign_text: "Оригинальное название",
            genre_text: "Жанр",
            about_text: "Описание фильма",
            add_to_watched_text: "добавить к просмотренным",
            add_to_queue_text: "смотреть позже",
            close_devs_text: "закрыть",
            team_devs_text: 'Команда "ReacTeam"',
            control_info_text: 'Управление',
        },
        'uk-UA': {
            trending_text: "В Тренді",
            latest_text: "Останні",
            now_playing_text: "Зараз в прокаті",
            popular_text: "Популярні",  
            top_rated_text: "За рейтингом",  
            upcoming_text: "Скоро в прокаті",
            filmoteka_text: "Фільмотека",
            search_films_text: "Пошук фільмів",
            home_text: "ГОЛОВНА",
            my_library_text: "МОЯ БІБЛІОТЕКА",
            rights_text: "Всі права захищені   ",
            devs_text: "Розроблено з",
            by_text: "студентами",
            watched_text: "ПЕРЕГЛЯНУТІ",
            queue_text: "ЗАПЛАНОВАНІ",
            vote_text: "Голосів",
            popularity_text: "Вподобань",
            title_orign_text: "Оригінальна назва",
            genre_text: "Жанр",
            about_text: "Про фільм",
            add_to_watched_text: "додати до переглянутих",
            add_to_queue_text: "дивитися потім",
            close_devs_text: "закрити",
            team_devs_text: 'Команда "ReacTeam"',
            control_info_text: 'Керування',
        },
    },
    {
        customLanguageInterface: getCustomInterfaceLanguage,
    });

    return strings;
};

let strings = getLocalsStrings();

export const doLocalisation = () => {
    const localRefs = getRefsLocals();
    for (let i = 0; i < Object.keys(localRefs).length; i++) {
        const ref = localRefs[Object.keys(localRefs)[i]];
        const name = Object.keys(localRefs)[i].split('_ref')[0]
        if (ref) {
            if (ref.nodeName === 'INPUT') {
                ref.placeholder = strings.getString(name+'_text');
            } else {
                ref.textContent = strings.getString(name+'_text');
            }
        };
    };
};

export const changeLanguage = (newLang) => {
    const currentLang = localStorage.getItem('language');
    if (currentLang !== newLang) {
        localStorage.setItem('language', newLang);
        location.reload();
    }
}