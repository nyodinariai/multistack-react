const url = 'http://localhost:5000/api/'

export const ApiService = {
    get(endPoint = ''){
        return fetch(url + endPoint)
            .then(response => response.json())
    }
}