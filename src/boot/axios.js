import axios from 'axios'

export default async ({ Vue }) => {
  //let baseURL = ' http://localhost:3000'
  let baseURL = 'https://pos-api-test.herokuapp.com/'

  Vue.prototype.$axios = axios.create({
    baseURL
  })
}
