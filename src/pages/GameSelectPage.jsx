import { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import AvailableGames from "../components/modals/AvailableGames"

export default function GameSelect({currentUser, currentGame, logOut ,setCurrentGame}){
    const [modal, setModal] = useState(false)
    const [availableGames, setAvailableGames] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3001/games')
            .then(resp=> resp.json())  
            .then(games => setAvailableGames(games))
    },[])


    function addGame(game){
        let newGames = [...currentUser.games, game]   
        fetch(`http://localhost:3001/users/${currentUser.id}`,{
            method:"PATCH",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify({
                games: newGames,
            })
        }).then(()=>setCurrentGame(game.name))
        
    }
    let playedGames  = [...new Set(currentUser.games)]
    console.log(currentUser.games)
    console.log(playedGames)

    return(
        <>
        <Header currentGame={currentGame} currentUser={currentUser} logOut={logOut} setCurrentGame={setCurrentGame}/>
        <div className="game-select">
            <ul className="games">
                {
                    playedGames
                    ?playedGames.map(game=>{
                        return (
                            <li key={game.id} className={game.name} onClick={()=>{
                                setCurrentGame(game.name)
                            }}>
                                <h1 className="game-title">{game.name}</h1>
                            </li>
                        )
                    })
                    : <></>
                }
                <li className="add-new-game">
                    <button 
                        onClick={()=>{
                            setModal(true)
                        }}
                    ><h1>+</h1></button>
                </li>
            </ul>
            {modal
            ?<AvailableGames currentUser={currentUser} addGame={addGame} setModal={setModal} availableGames={availableGames}/>
            :null
            }
        </div>
        </>
    )
}