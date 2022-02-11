
import react from 'react'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import BlackJack from './pages/blackJack';
import GameSelect from './pages/GameSelectPage';
import LoginPage from './pages/loginPage';
import './styles/App.css'
import './styles/Header.css'
import './styles/LoginPage.css'
import './styles/GameSelect.css'


function App() {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [currentGame, setCurrentGame] = useState("")
  const [modal, setModal] = useState(false)

  useEffect(()=>{
      fetch("http://localhost:3001/users")
          .then(resp=> resp.json())
              .then(users => setUsers(users))

      },[])
  const navigate = useNavigate()
  
  function logIn (user) {
    setCurrentUser(user)
  }
  useEffect(()=>{
    !currentUser? navigate('/login'):null  
  },[])

  useEffect(()=>{
    currentUser? currentGame? navigate(`/${currentGame}`): navigate('/game-select'):navigate('/login')
  },[currentUser,currentGame])

  function logOut () {
    setCurrentUser(null)
    setCurrentGame("")
    navigate('/login')
  }
  return (
    <div className="App">
        <Routes>
          <Route 
              index 
              element={
                  <Navigate  
                    replace 
                    to='/login'/>
                  } 
          />
          <Route 
          path="/login"  
          element={
            <LoginPage 
              users={users} 
              logIn={logIn}
              setCurrentUser={setCurrentUser}
              />
            } 
        /> 
        <Route 
        path="/game-select"  
        element={
          <GameSelect
            currentGame={currentGame}
            logOut={logOut} 
            currentUser={currentUser} 
            setCurrentGame={setCurrentGame}
            />
          } 
        />            
          <Route 
          path="/blackjack"  
          element={
            <BlackJack
              currentGame={currentGame}
              currentUser={currentUser} 
              setCurrentUser={setCurrentUser}
              logOut={logOut} 
              setCurrentGame={setCurrentGame}
              />
            } 
        />      
        </Routes>
    </div>
  )
}
export default App