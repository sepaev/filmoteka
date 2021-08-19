import LocalizedStrings from 'localized-strings';
import Notiflix from "notiflix";

import { getRefsLocals } from "./refs"
export const getLang = () => {
    const lang = localStorage.getItem('language');
    if (lang) {
        document.scrollingElement.lang = (lang[3] + lang[4]).toLowerCase();
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
export const doNotification = (en, ru, ua, method) =>{
    switch (getLang()) {
        case 'en-US':
            Notiflix.Notify[method](en);
            break;
        case 'ru-RU':
            Notiflix.Notify[method](ru);
            break;
        case 'uk-UA':
            Notiflix.Notify[method](ua);
            break;
    }
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
            watched_text: "watched",
            queue_text: "queue",
            vote_text: "Vote / Votes",
            popularity_text: "Popularity",
            title_orign_text: "Original Title",
            genre_text: "Genre",
            about_text: "About",
            add_to_watched_text: "add to watched",
            add_to_queue_text: "add to queue",
            remove_from_watched_text: "remove from watched",
            remove_from_queue_text: "remove from queue",
            close_devs_text: "close",
            team_devs_text: 'Team "ReacTeam"',
            control_info_text: 'Controls',
            sign_nav_text: 'Sign in',
            sign_up_name_text: 'Name',
            sign_up_mail_text: 'E-mail',
            sign_up_password_text: 'Password',
            sign_up_confirm_text: 'Confirm password',
            sign_up_sex_text: 'Sex:',
            sign_up_male_text: 'male',
            sign_up_female_text: 'female',
            sign_up_other_text: 'will be a secret',
            sign_up_button_text: 'Sign up',
            sign_in_name_text: 'Name',
            sign_in_mail_text: 'E-mail',
            sign_in_password_text: 'Password',
            sign_in_confirm_text: 'Confirm password',
            sign_in_sex_text: 'Sex:',
            sign_in_male_text: 'male',
            sign_in_female_text: 'female',
            sign_in_other_text: 'will be a secret',
            sign_in_button_text: 'Sign up',
            go_to_page_input_text: 'Type page number',
            go_to_page_button_text: 'Go to',
            // sign_up_status_text: '',
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
            watched_text: "просмотренные",
            queue_text: "запланированные",
            vote_text: "Голосов",
            popularity_text: "Популярность",
            title_orign_text: "Оригинальное название",
            genre_text: "Жанр",
            about_text: "Описание фильма",
            add_to_watched_text: "добавить к просмотренным",
            add_to_queue_text: "смотреть позже",
            remove_from_watched_text: "удалить из просмотренных",
            remove_from_queue_text: "удалить из ожидаемых",
            close_devs_text: "закрыть",
            team_devs_text: 'Команда "ReacTeam"',
            control_info_text: 'Управление',
            sign_nav_text: 'Вход',
            sign_up_name_text: 'Имя',
            sign_up_mail_text: 'Почта',
            sign_up_password_text: 'Введите пароль',
            sign_up_confirm_text: 'Повторно введите пароль',
            sign_up_sex_text: 'Я - ',
            sign_up_male_text: 'мужчина',
            sign_up_female_text: 'женщина',
            sign_up_other_text: 'не важно',
            sign_up_button_text: 'Зарегистрироваться',
            sign_in_name_text: 'Имя',
            sign_in_mail_text: 'Почта',
            sign_in_password_text: 'Введите пароль',
            sign_in_confirm_text: 'Повторно введите пароль',
            sign_in_sex_text: 'Я - ',
            sign_in_male_text: 'мужчина',
            sign_in_female_text: 'женщина',
            sign_in_other_text: 'не важно',
            sign_in_button_text: 'Зарегистрироваться',
            go_to_page_input_text: 'Введите номер страницы',
            go_to_page_button_text: 'Перейти',
            // sign_up_status_text: '',
        },
        'uk-UA': {
            trending_text: "У тренді",
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
            watched_text: "переглянуті",
            queue_text: "заплановані",
            vote_text: "Голосів",
            popularity_text: "Вподобань",
            title_orign_text: "Оригінальна назва",
            genre_text: "Жанр",
            about_text: "Про фільм",
            add_to_watched_text: "додати до переглянутих",
            add_to_queue_text: "дивитися потім",
            remove_from_watched_text: "передивитися знов",
            remove_from_queue_text: "вже подивився",
            close_devs_text: "закрити",
            team_devs_text: 'Команда "ReacTeam"',
            control_info_text: 'Керування',
            sign_nav_text: 'Вхід',
            sign_up_name_text: 'Ім`я',
            sign_up_mail_text: 'Пошта',
            sign_up_password_text: 'Введіть пароль',
            sign_up_confirm_text: 'Повторно введіть пароль',
            sign_up_sex_text: 'Я - ',
            sign_up_male_text: 'чоловік',
            sign_up_female_text: 'жінка',
            sign_up_other_text: 'не важливо',
            sign_up_button_text: 'Зареєструватися',
            sign_in_name_text: 'Ім`я',
            sign_in_mail_text: 'Пошта',
            sign_in_password_text: 'Введіть пароль',
            sign_in_confirm_text: 'Повторно введіть пароль',
            sign_in_sex_text: 'Я - ',
            sign_in_male_text: 'чоловік',
            sign_in_female_text: 'жінка',
            sign_in_other_text: 'не важливо',
            sign_in_button_text: 'Зареєструватися',
            go_to_page_input_text: 'Ввеіть номер сторінки',
            go_to_page_button_text: 'Перейти',
            // sign_up_status_text: '',
        },
    },
    {
        customLanguageInterface: getCustomInterfaceLanguage,
    });

    return strings;
};

let strings = getLocalsStrings();

export const doLocalization = () => {
  const localRefs = getRefsLocals();
  const totalSrtings = Object.keys(localRefs).length;
  for (let i = 0; i < totalSrtings; i++) {
    const refName = Object.keys(localRefs)[i];
    const ref = localRefs[refName];
    const string = refName.slice(0, length-3) + 'text'; //меняю ref на text например button_ref >> button_text
    if (ref) {
      if (ref.nodeName === 'INPUT') {
          ref.placeholder = strings.getString(string);
      } else {
          ref.textContent = strings.getString(string);
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