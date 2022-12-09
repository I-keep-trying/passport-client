import React, { useContext, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import {
  Error,
  Home,
  Login,
  Profile,
  Register,
  About,
  Account,
  EditProfile,
  ChangePw,
  ForgotPw,
  Header,
  Footer,
  Notifications,
  Loading,
  Contact,
  Layout,
  TermsPrivacy,
  Code,
  Post1,
  Post2,
} from './components'
import { authContext } from './context/auth-context'
import { useDisclosure, Center } from '@chakra-ui/react'
import './App.css'

const ProtectedRoute = ({ children }) => {
  const ctx = useContext(authContext)

  if (!ctx.isLoggedIn) {
    return <Navigate to="/home" replace />
  }

  return children
}

function App() {
  const ctx = useContext(authContext)

  const { onOpen } = useDisclosure()

  useEffect(() => {
    onOpen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ctx.loading ? (
    <>
      <Center w="100%" h={window.innerHeight}>
        <Loading stroke="#b83280" />
      </Center>
    </>
  ) : (
    <>
      <Router>
        <Header />
        <Notifications />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="post1" element={<Post1 />} />
            <Route path="post2" element={<Post2 />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="terms" element={<TermsPrivacy />} />
            <Route path="code" element={<Code />} />
            <Route
              path="user"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="changepw"
              element={
                <ProtectedRoute>
                  <ChangePw />
                </ProtectedRoute>
              }
            />
            <Route path="forgot" element={<ForgotPw />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
