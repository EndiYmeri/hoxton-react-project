export default function AceButton({setGameState, gameState, value}){
    return(
        <button 
        onClick={()=>{
        setGameState({...gameState, playerAceValue: value})
        }}>
        Ace {value}
      </button>
    )
}