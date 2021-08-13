
    // Принимает имя ключа `keyName` по которому будет произведена выборка.
export const loadDataFromLS = (keyName) => {
    try {
        const string = localStorage.getItem(keyName);
        const data = JSON.parse(string);
        if(Array.isArray(data)) return data;
    } catch (err) {
        console.error('Get LocslStorage error: ', err);
    }
};

//  export const getMoviesLocalStorage = (key) => {        
//         const keyStorage = this.load(key);

//         if(Array.isArray(keyStorage)) return keyStorage;
        
//         this.save(key, []);
//         return [];
//     };
    
//     //Добавляет фильм : пушит переданный 'value' в LocalStorage с ключем 'key'
// export const  addMovieLocalStorage = (key, value) => {        
//         const dataFromLocalStorage = this.load(key);
//         this.save(key, [value, ...dataFromLocalStorage]);
//     };
    
// export const removeMovieLocalStorage = (key, value) => {
  
//         const dataFromLocalStorage = this.load(key);

//         const valueIndex = dataFromLocalStorage.indexOf(value);

//         if (0 <= valueIndex) { 
//             dataFromLocalStorage.splice(valueIndex, 1);

//             this.save(key, dataFromLocalStorage);
//         }
//     };

//     // Принимает ключ `key` и значение `value`.
// export const save = (key, value) => {
//     try {
//         const filmName = JSON.stringify(value);
//         localStorage.setItem(key, filmName);
//     } catch (err) {
//         console.error('Set state error: ', err);
//     }
// };
