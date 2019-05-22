import axios from 'axios'

export default async ({ Vue }) => {
  //let baseURL = 'http://127.0.0.1:3000'
  //let baseURL = 'http://172.16.1.22:3333/'
  let baseURL = 'https://pos-api-test.herokuapp.com/'

  Vue.prototype.$axios = axios.create({
    baseURL
  })
}
