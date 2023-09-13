import { Box, Text } from '@chakra-ui/react'
import './App.css'
import AddItemForm from './components/AddItemForm'
import ChangedItems from './components/ChangedItems'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import { useHook } from './hooks/useFetch'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  const { loading } = useHook()

  return (
    <div className="App">
      <Header />
      {loading ? (
        <Box h="80vh">
          <Text fontFamily="Poppins">Načítavam...</Text>
        </Box>
      ) : (
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/changed" element={<ChangedItems />} />
              <Route path="/addNew" element={<AddItemForm />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default App
