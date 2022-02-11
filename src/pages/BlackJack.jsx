import { useEffect, useState } from 'react'
import cards from '../cards'
import AceButtons from '../components/aceButtons/AceButtons'
import Button from '../components/Button'
import CardsOnHand from '../components/CardsOnHand'
import Header from '../components/Header/Header'

function BlackJack({currentUser,setCurrentUser, logOut, currentGame,setCurrentGame}) {

  const [cardsOnDeck, setCardsOnDeck] = useState([])

  const [gameState, setGameState ] = useState({
    pcCount: 0,
    currentPcHand: [],
    playerCount: 0,
    currentPlayerHand: [],
    playerAceValue : 1,
    showAceValueButton:false,
    stand:false,
    gameStatus : "",
    gameStarted: false,
    tripleDeck: null,
    currentBet: 10,
    money: currentUser? currentUser.money: 0
  })

  function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getCard(){
    let randomNumber =  getRandomArbitrary(0,cardsOnDeck.length)

    let cardReceived = cardsOnDeck[randomNumber]

    let cardsLeftOnDeck = cardsOnDeck
    cardsLeftOnDeck.splice(randomNumber, 1)

    setCardsOnDeck(cardsLeftOnDeck)
    
    return cardReceived
  }
  function startGame(){
    const playerInitialHand = [getCard(), getCard()]
    const pcInitialHand = [getCard(), getCard()]

    setGameState(
      {
        ...gameState,
        currentPlayerHand: playerInitialHand,
        currentPcHand: pcInitialHand,
        stand:false,
        gameStarted:true
      }
    ) 
  }
  function hit(){
    let newPlayerHand = [...gameState.currentPlayerHand, getCard()]
    setGameState(
      {
        ...gameState,
        currentPlayerHand: newPlayerHand,
      }
    )
  }
  function getPlayerCount(hand){
    let count = 0
    hand.map(card =>{
      let value = card.value
      if(card.value === "J" || card.value === "Q" || card.value === "K"){
        value = 10
      }
      if(card.value === "A"){
        value = gameState.playerAceValue
      }
      count = count + value
    })
    return count
  }
  function addNewCardOnPcHand(){
    let newPcHand = [...gameState.currentPcHand, getCard()]
    setGameState(
      {
        ...gameState,
        currentPcHand: newPcHand,
      }
    )
  }

  function stand(){
    setGameState({
      ...gameState,     
      stand:true
    })
  }

  function changeGameStatus(text){
    setGameState(
      {
        ...gameState,
        gameStatus: text
      }
      )
  }
  useEffect(()=>{
    if(gameState.stand){

      if(gameState.playerCount > gameState.pcCount ){
        addNewCardOnPcHand()
      }
      if(gameState.pcCount > gameState.playerCount && gameState.pcCount <= 21){
        changeGameStatus("You Lost!")
        }
      if(gameState.pcCount > 21){
        changeGameStatus("You Win!")
        }
      if(gameState.pcCount === gameState.playerCount){
        changeGameStatus("Its a draw!")
      }
    }
  },[gameState.pcCount,gameState.stand])

  function newGame(){
    startGame()
  }

  useEffect(()=>{
    if(gameState.tripleDeck){
      let newCards = cards.concat(cards.concat(cards))
      setCardsOnDeck(newCards)
    }
    else{
      
      let newCards = cards  
      setCardsOnDeck(newCards)
    }
  },[gameState.tripleDeck])

  useEffect(()=>{
    setCardsOnDeck(cards)
  },[])

  useEffect(()=>{
    let playerNewCount = getPlayerCount(gameState.currentPlayerHand)
    let pcNewCount = getPlayerCount(gameState.currentPcHand)
    let newMoney = gameState.money
    let newCurrentBet = gameState.currentBet
    let newgameStatus = playerNewCount > 21? "You Lost!" : ""
    let aceValueBUttonStatus = gameState.currentPlayerHand.some(card => card.value === "A")? true: false
    
    if(gameState.gameStatus === "You Lost!"){
      newMoney = gameState.money - gameState.currentBet  
      newCurrentBet = 10
    }
    if(gameState.gameStatus === "You Win!"){
      newMoney = gameState.money + gameState.currentBet  
      newCurrentBet = 10
    }
    
    setGameState(
      {
        ...gameState,
        playerCount: playerNewCount,
        pcCount: pcNewCount,
        showAceValueButton: aceValueBUttonStatus,
        gameStatus: newgameStatus,
        money: newMoney,
        currentBet:newCurrentBet
      }
    )
  },[gameState.playerAceValue,gameState.currentPlayerHand, gameState.currentPcHand])

  useEffect(()=>{
    currentUser?
      fetch(`http://localhost:3001/users/${currentUser.id}`,{
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          money: gameState.money
        })
      }).then(resp =>resp.json()).then(updatedUser => setCurrentUser({...currentUser, money:updatedUser.money}))
     :null 
  },[gameState.gameStatus, gameState.money])
  return (
    <>
    <Header currentGame={currentGame} setCurrentGame={setCurrentGame}logOut={logOut} currentUser={currentUser}  />
    <div className="blackjack-game">
      <div className='cardsDeck'>
          <ul>
            {cardsOnDeck.map((card,index)=>{
              return (
                  <li key={index} className='facedownCard card'></li>
              )
              })}
          </ul>
      </div>
      <div className='main'>
        {
          cardsOnDeck.length > 10
          ?(
            !gameState.gameStarted
              ?
              (<>
                <Button func={startGame} text={"Start Game"}/>
                <label htmlFor="tripleDeck">
                Triple Deck
                  <input type="checkbox" name="tripleDeck" id="tripleDeck"
                  onChange={()=>{
                    setGameState({
                      ...gameState, tripleDeck:!gameState.tripleDeck
                    })
                  }} 
                  />
                </label>
              </>
              )
              :(
                gameState.gameStatus
                ? 
                  <div className='action-buttons'>
                    <h1>{gameState.gameStatus}</h1>
                    <Button func={newGame} text={"New Game"}/>
                  </div>
                :(
                    <div className='action-buttons'>
                      <label htmlFor="label">
                      <span>Bet: </span>
                        <input 
                          type="number" 
                          name="bet" 
                          id="bet"
                          min={10}
                          max={currentUser.money}
                          defaultValue={10}
                          onChange={(e)=>{
                            setGameState({...gameState, currentBet : Number(e.target.value)})
                          }}
                          />
                      </label>
                      <div>
                        <Button func={hit} text={"Hit"}/>
                        <Button func={stand} text={"Stand"}/>
                      </div>
                    </div>
                )
              )
          )
          :(
            <button 
              onClick={()=>{
                let shuffledCards = cards
                setCardsOnDeck(shuffledCards)
              }}
            >Shuffle Cards</button>
          )
            }
                <div className='players'>
                  <div className="player">
                    <h1>Player Count: {gameState.playerCount}</h1>
                    <h3>Player Hand: </h3>
                    <CardsOnHand cardsToShow={gameState.currentPlayerHand} />
                    <AceButtons gameState={gameState} setGameState={setGameState} />
                  </div>
                  <div className="pc">
                    <h1>PC Count: {gameState.pcCount}</h1>
                    <h3>PC Hand: {gameState.pcCount}</h3>
                    <CardsOnHand cardsToShow={gameState.currentPcHand} />
                  </div>
                </div>
      </div>

    </div>
    </>

  )
}

export default BlackJack
