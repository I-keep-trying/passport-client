import React, { useState } from 'react'
import { useDeviceSelectors } from 'react-device-detect'
import {
  login,
  logout,
  register,
  forgotPw,
  editUser,
  resetPw,
  getLogin,
  getRegister,
  getForgot,
  ping,
  contactForm,
} from '../services/api'

export const authContext = React.createContext({})

export const AuthContext = (props) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data] = useDeviceSelectors(window.navigator.userAgent)
  const [emailErr, setEmailErr] = useState(null) // This is specifically for email validation, not passed to notifications

  const pingServer = () => {
    ping()
      .then((res) => {
        setUserData({
          city: res.data.city,
          state: res.data.state_prov,
          country: res.data.country_name,
          IP: res.data.ip,
          os: `${data.osName} ${data.osVersion} `,
          browser: data.browserName,
          ua: data.getUA,
        })
        return res.data
      })
      .catch((err) => {
        console.log('ping/getData error: ', err)
        setMessage({
          type: 'error',
          text: 'Sorry, there was a problem with the data service.',
        })
      })
  }

  const loginPage = () => {
    getLogin().then((res) => {
      return res
    })
  }

  const registerPage = () => {
    getRegister().then((res) => res)
  }

  const forgotPage = () => {
    getForgot().then((res) => res)
  }

  const handleRegister = async (params) => {
    try {
      setLoading(true)
      const res = await register(params)     
      setLoading(false)
      if (res.error) {
        setMessage({ type: 'error', text: res.message })
        return res.error
      }
      setUser({
        name: params.name,
        email: params.email,
        avatar: params.avatar,
      })
      setMessage({
        type: 'success',
        text: `Welcome, ${params.name}! 😊 Now go check your email. `,
      })
      return res
    } catch (err) {
      console.log('signup error: ', err)
      setMessage({ type: 'error', text: `Something went wrong. 😟 ` })
      return err
    }
  }

  const handleLogin = async (params) => {
    try {
      setLoading(true)
      const res = await login(params)
      setLoading(false)

      if (!res.id) {
        setMessage({ type: 'error', text: 'Server response error' })
        return res
      }
      setUser({
        id: res.id,
        name: res.name,
        email: res.email,
        avatar: res.avatar,
      })
      setLoggedIn(true)
      !message &&
        setMessage({ type: 'success', text: `Hello, ${res.name}! 😊 ` })
      return res
    } catch (err) {
      console.log('Login error: ', err)
      setLoggedIn(false)
      setLoading(false)
      setMessage({ type: 'error', text: `Something went wrong. 😟 ` })
      return err
    }
  }

  const handleEdit = async (params) => {
    console.log('edit user params', params)
    try {
      setLoading(true)
      const res = await editUser(params)
      console.log('Edit res', res)
      setLoading(false)
      setMessage({ type: 'success', text: res.message })
      setUser({
        ...user,
        name: params.name,
        avatar: params.avatar,
      })
      return res
    } catch (err) {
      setMessage({ type: 'error', text: `Something went wrong. 😟 ` })
      return err
    }
  }

  const handleLogout = () => {
    logout()
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log('GET logout error: ', err)
        return err
      })
    setMessage({ type: 'success', text: `Successfully logged out. 😊 ` })

    setLoggedIn(false)
    setUser(null)
  }

  const handleForgot = async (params) => {
    try {
      setLoading(true)
      const res = await forgotPw(params)
      res.success
        ? setMessage({ type: 'success', text: res.message })
        : setMessage({ type: 'error', text: `Something went wrong. 😟 ` })
      setLoading(false)
      return res
    } catch (err) {
      setMessage({ type: 'error', text: `Something went wrong. 😟 ` })
      setLoading(false)
      return err
    }
  }

  const handleReset = async (params) => {
    try {
      setLoading(true)
      const res = await resetPw(params)
      res.success
        ? setMessage({ type: 'success', text: res.message })
        : setMessage({ type: 'error', text: `Something went wrong. 😟 ` })
      setLoading(false)
      return res
    } catch (err) {
      setMessage({ type: 'error', text: ` 😟 ${err.response.data.message} ` })
      setLoading(false)
      return err
    }
  }

  const handleContactForm = async (params) => {
    try {
      setLoading(true)
      if (params.message.length > 5000) {
        setLoading(false)
        return setMessage({
          type: 'error',
          text: `Message length exceeds limit.`,
        })
      }
      const res = await contactForm(params)
      res.success
        ? setMessage({ type: 'success', text: res.message })
        : setMessage({ type: 'error', text: `Something went wrong. 😟 ` })
      setLoading(false)
      return res
    } catch (err) {
      console.log('contact form error: ', err)
    }
  }

  return (
    <authContext.Provider
      value={{
        pingServer: pingServer,
        loginPage: loginPage,
        registerPage: registerPage,
        forgotPage: forgotPage,
        userData: userData,
        isLoggedIn: loggedIn,
        user: user,
        setUser: setUser,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        handleRegister: handleRegister,
        message: message,
        setMessage: setMessage,
        handleForgot: handleForgot,
        handleReset: handleReset,
        handleEdit: handleEdit,
        loading: loading,
        handleContactForm: handleContactForm,
        emailErr: emailErr,
      }}
    >
      {props.children}
    </authContext.Provider>
  )
}

export default AuthContext
