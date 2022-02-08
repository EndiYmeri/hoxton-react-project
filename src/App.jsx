
import react from 'react'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import BlackJack from './pages/blackJack';
import GameSelect from './pages/GameSelectPage';
import LoginPage from './pages/loginPage';
import './styles/App.css'
import './styles/LoginPage.css'
import './styles/GameSelect.css'


function App() {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [currentGame, setCurrentGame] = useState(null)
  const [modal, setModal] = useState(false)

  useEffect(()=>{
      fetch("http://localhost:3001/users")
          .then(resp=> resp.json())
              .then(users => setUsers(users))

      },[])
  const navigate = useNavigate()
  
  function logIn (user) {
    localStorage.setItem("user",JSON.stringify(user))
    // set user in state as the current user
    setCurrentUser(user)
    // navigate to the main page

    navigate('/game-select')
  }
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user) logIn(user)
  },[])

  function logOut () {
    localStorage.removeItem("user")
    setCurrentUser(null)
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
            currentUser={currentUser} 
            setCurrentGame={setCurrentGame}
            />
          } 
        />            
          <Route 
          path="/blackjack"  
          element={
            <BlackJack
              currentUser={currentUser} 
              logOut={logOut} 
              />
            } 
        />      
        </Routes>
    </div>
  )
}
export default App