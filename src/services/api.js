import axios from 'axios'

const url = '/api'

export const ping = () => {
  const request = axios.get(url)
  return request.then((response) => {
    return response
  })
}

export const getLogin = () => {
  const request = axios.get(`${url}/login`)
  return request.then((response) => response.data)
}

export const getRegister = () => {
  const request = axios.get(`${url}/signup`)
  return request.then((res) => res.data)
}

export const getEmailValidate = (params) => {
  const request = axios.get(`${url}/validate/${params}`)
  return request.then((res) => res.data)
}

export const getForgot = () => {
  const request = axios.get(`${url}/forgot`)
  return request.then((res) => res.data)
}

export const login = async (params) => {
  const response = await axios.post(`${url}/login`, params)
  return response.data
}

export const logout = () => {
  const request = axios.get(`${url}/logout`)
  return request.then((response) => response.data)
}

export const register = async (params) => {
  try {
    const response = await axios.post(`${url}/signup`, params)
    return response.data
  } catch (err) {
    console.log('register error: ', err)
    return err.response.data
  }
}

export const forgotPw = async (params) => {
  const response = await axios.post(`${url}/forgot`, params)
  return response.data
}

export const resetPw = async (params) => {
  const response = await axios.post(`${url}/reset`, params)
  return response.data
}

export const editUser = async (params) => {
  try {
    const res = await axios.post(`${url}/edit`, params)
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export const contactForm = async (params) => {
  const res = await axios.post(`${url}/contact`, params)
  return res.data
}
