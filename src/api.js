import axios from 'axios'
const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        // key: 'AIzaSyAqVe1WifyviIQ72ndJjcKtTj3mwvgfIwk',
        key: 'AIzaSyCvuJej25d_-vSAtdP8AFtuNIEtTPvT4yI'
        // key: 'AIzaSyAn5KR21i6IADlubXbyk3yYWIA_nGhDZVU'
        // key: 'AIzaSyDOQ72rUVfOTOVWjMyNuZF_CyeT0ZezVio'
        // key:'AIzaSyB2C_qIgJ8pNviv2Qj-WP8rKk4yupqYroM'

        // key: 'AIzaSyDDCyB6mYABG5IcXLL5S96MYplTelzEHD8'
    }
})

export default request