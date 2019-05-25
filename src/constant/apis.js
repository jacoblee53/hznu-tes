var mode = process.env.REACT_APP_MY_VAR
var API_SERVER = ''

if (mode === 'development') {
  API_SERVER = 'http://127.0.0.1:4000'
}

if (mode === 'production') {
  API_SERVER = 'http://39.106.86.250:4000'
}

export { API_SERVER }