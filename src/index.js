const { container } = require('../../codeceptjs')
const axios = require('../../axios').default


axios.interceptors.request.use(function (config) {
  const allure = container.plugins('allure')
  allure.addAttachment(`${config.method} ${config.url}`, JSON.stringify(config.data ?? {}), 'application/json')
  return config
}, function (error) {
  const allure = container.plugins('allure')
  const config = error.config
  allure.addAttachment(`${config.method} ${config.url}`, JSON.stringify(config.data ?? {}), 'application/json')
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  const allure = container.plugins('allure')
  allure.addAttachment('response', JSON.stringify(response.data ?? {}), 'application/json')

  return response
}, function (error) {
  const allure = container.plugins('allure')
  allure.addAttachment(`response`, error.response ? JSON.stringify(error.response.data ?? {}) : error.toString(), 'application/json')
  return Promise.reject(error)
})

module.exports = function () {

}
