import axios from 'axios'

const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content

if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token
}

const instance = axios.create({
  baseURL: '/',
  withCredentials: true,
})

export default instance