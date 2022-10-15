import axios from 'axios'
const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        key: 'AIzaSyAqVe1WifyviIQ72ndJjcKtTj3mwvgfIwk'
        // key: 'AIzaSyDGe80ek36c7vAjDD9rX9utJZhNMpNW5nk'
    }
})

export default request