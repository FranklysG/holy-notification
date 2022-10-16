import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://www.abibliadigital.com.br/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios