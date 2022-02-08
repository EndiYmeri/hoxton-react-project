export default function GameSelect({currentUser,setCurrentGame}){
    
    return(
        <div className="game-select">
            <ul className="games">
                {
                    currentUser.games
                    ?currentUser.games.map(game=>{
                        return (
                            <li key={game.id} className={game.name}>
                                <h1 className="game-title">{game.name}</h1>
                            </li>
                        )
                    })
                    : <></>
                }
            </ul>
        </div>
    )
}