import AceButton from "./AceButton";

export default function AceButtons({gameState, setGameState}){
    return(
        <>
        {
            gameState.showAceValueButton? 
            ( 
              <div className='ace-value-buttons'>
                <AceButton setGameState={setGameState} gameState={gameState} value={11}/>
                <AceButton setGameState={setGameState} gameState={gameState} value={1}/>
              </div>
              )
          : null
          }
          </>
    )
}