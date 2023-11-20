import { Box, Text } from '@chakra-ui/react'
import './App.css'
import AddItemForm from './components/AddItemForm'
import ChangedItems from './components/ChangedItems'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import { useHook } from './hooks/useFetch'
import { useAuth } from './store/authContext'
import { Route, Routes } from 'react-router-dom'
import Facturation from './pages/Facturation'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Shifts from './pages/Shifts'
import Profile from './pages/Profile'
import InitalLogin from './pages/InitalLogin'
function App() {
  const { loading } = useHook()
  const { currentUser } = useAuth()

  return (
    <div className="App">
      <Header />
      {!currentUser ? (
        <Login h="4rem" />
      ) : loading ? (
        <Box h="80vh">
          <Text fontFamily="Poppins">Načítavam...</Text>
        </Box>
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/changed" element={<ChangedItems />} />
            <Route path="/addNew" element={<AddItemForm />} />
            <Route path="/facturation" element={<Facturation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/shifts" element={<Shifts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/inital-login" element={<Login />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default App
