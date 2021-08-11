const localStorageApi = {

    //Проверяет хранилище по ключу. Возвращает пустой массив - если не находит, и данные - если находит
    getMovies(key) {        
        const keyStorage = this.load(key);

        if(Array.isArray(keyStorage)) return keyStorage;
        
        this.save(key, []);
        return [];
    },
    
    //Добавляет фильм : пушит переданный 'value' в LocalStorage с ключем 'key'
    addMovie(key, value) {        
        const dataFromLocalStorage = this.load(key);
        this.save(key, [value, ...dataFromLocalStorage]);
    },
    
    removeMovie(key, value) {
  
        const dataFromLocalStorage = this.load(key);

        const valueIndex = dataFromLocalStorage.indexOf(value);

        if (0 <= valueIndex) { 
            dataFromLocalStorage.splice(valueIndex, 1);

            this.save(key, dataFromLocalStorage);
        }
     },


    // Принимает ключ `key` по которому будет произведена выборка.
    load(key){
        try {
            const filmName = localStorage.getItem(key);

            return filmName === null ? undefined : JSON.parse(filmName);
        } catch (err) {
            console.error('Get state error: ', err);
        }
    },

    // Принимает ключ `key` и значение `value`.
    save(key, value){
        try {
            const filmName = JSON.stringify(value);
            localStorage.setItem(key, filmName);
        } catch (err) {
            console.error('Set state error: ', err);
        }
    }
}
export default localStorageApi;