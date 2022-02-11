import Button from "../Button";

export default function Header({currentGame ,setCurrentGame, logOut, currentUser}){

    return(
        <div className="header">
            <div className="logo">
                <h2>{currentGame}</h2>
            </div>
            <div className="greeting">
                {currentUser?(
                    <>
                    <div>
                     <h2>Hello {currentUser.username}</h2>
                    <h4>Current Money: {currentUser.money}</h4>

                    </div>
                     <img src={`https://robohash.org/${currentUser.id}`} alt="" />
                     
                    </>
                ):null}
              
            </div>
            <div className="account-buttons">
                {
                    !currentGame? null
                    :(
                        <button onClick={()=>{
                            setCurrentGame("")
                        }}>
                            Back to Games
                        </button>)
                
                }

                
                <button onClick={()=>{
                    logOut()
                }}>Log Out</button>
            </div>
        </div>

    )
}