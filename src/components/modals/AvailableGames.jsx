export default function AvailableGames({currentUser, addGame, setModal, availableGames}){
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <span className="closeModal"
                        onClick={()=>{
                            setModal(false)
                        }}
                    >X</span>
                    <h1>Add new game</h1>
                    <div className="available-games">
                        <ul className="games">
                            {
                                availableGames
                                ?availableGames.map((game, index) =>{
                                    return(
                                        <li key={index}
                                            onClick={()=>{
                                                addGame(game)
                                            }}
                                        >{game.name}</li>
                                    )
                                })
                                : "No Games Found"
                            }
                        </ul>
                    </div>
               </div>
            </div>
        </>
    )
}