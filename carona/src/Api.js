import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://back-carona.azurewebsites.net'
    baseURL: 'http://localhost:8080'
})

export default api