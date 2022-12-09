import axios from 'axios'

const url = '/api'

export const ping = () => {
  const request = axios.get('/')
  return request.then((response) => {
    return response
  })
}

export const getLogin = () => {
  const request = axios.get(`/login`)
  return request.then((response) => response.data)
}

export const getRegister = () => {
  const request = axios.get(`/signup`)
  return request.then((res) => res.data)
}

export const getEmailValidate = (params) => {
  const request = axios.get(`/validate/${params}`)
  return request.then((res) => res.data)
}

export const getForgot = () => {
  const request = axios.get(`/forgot`)
  return request.then((res) => res.data)
}

export const login = async (params) => {
  const response = await axios.post(`/login`, params)
  return response.data
}

export const logout = () => {
  const request = axios.get(`/logout`)
  return request.then((response) => response.data)
}

export const register = async (params) => {
  try {
    const response = await axios.post(`/signup`, params)
    return response.data
  } catch (err) {
    console.log('register error: ', err)
    return err.response.data
  }
}

export const forgotPw = async (params) => {
  const response = await axios.post(`/forgot`, params)
  return response.data
}

export const resetPw = async (params) => {
  const response = await axios.post(`/reset`, params)
  return response.data
}

export const editUser = async (params) => {
  //  console.log('editUser params',params)
  try {
    const res = await axios.post(`/edit`, params)
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export const contactForm = async (params) => {
  const res = await axios.post(`/contact`, params)
  return res.data
}
