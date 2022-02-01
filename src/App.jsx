import { useEffect, useState } from 'react'
import './App.css'
import cards from './cards'
import AceButtons from './components/aceButtons/AceButtons'
import Button from './components/Button'
import CardsOnHand from './components/CardsOnHand'

function App() {

  const [cardsOnDeck, setCardsOnDeck] = useState([])

  const [gameState, setGameState ] = useState({
    pcCount: 0,
    currentPcHand: [],
    playerCount: 0,
    currentPlayerHand: [],
    playerAceValue : 1,
    showAceValueButton:false,
    gameStatus : ""
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
  function stand(){
    if(gameState.playerCount === 21){
      let newPcHand = [...gameState.currentPlayerHand, getCard()]
      setGameState(
        {
          ...gameState,
          currentPlayerHand: newPcHand,
        }
      )
    }
    if(gameState.playerCount > gameState.pcCount){
      let newPcHand = [...gameState.currentPlayerHand, getCard()]
      setGameState(
        {
          ...gameState,
          currentPlayerHand: newPcHand,
        }
      )
    }
    
  }
  function newGame(){

  }

  useEffect(()=>{
    setCardsOnDeck(cards)
  },[])

  useEffect(()=>{
    let playerNewCount = getPlayerCount(gameState.currentPlayerHand)
    let pcNewCount = getPlayerCount(gameState.currentPcHand)

    let newgameStatus = playerNewCount > 21? "You lost!" : ""
    let aceValueBUttonStatus = gameState.currentPlayerHand.some(card => card.value === "A")? true: false
    setGameState(
      {
        ...gameState,
        playerCount: playerNewCount,
        pcCount: pcNewCount,
        showAceValueButton: aceValueBUttonStatus,
        gameStatus: newgameStatus
      }
    )
  },[gameState.playerAceValue,gameState.currentPlayerHand, gameState.currentPcHand])

  return (
    <div className="App">
      <Button func={startGame} text={"Start Game"}/>
      {
        gameState.gameStatus === "You lost!"
        ? (
          <div className='action-buttons'>
            <h1>You lost!</h1>
            <Button func={newGame} text={"New Game"}/>
          </div>
        )
        :(
          <div className='action-buttons'>
            <Button func={hit} text={"Hit"}/>
            <Button func={stand} text={"Stand"}/>
          </div>
        )
      }
     
        <h1>Player Count: {gameState.playerCount}</h1>
      <AceButtons gameState={gameState} setGameState={setGameState} />
        <h3>Player Hand: </h3>
        <CardsOnHand cardsToShow={gameState.currentPlayerHand} />
        <h1>PC Count: {gameState.pcCount}</h1>
        <h3>PC Hand: {gameState.pcCount}</h3>
        <CardsOnHand cardsToShow={gameState.currentPcHand} />
    </div>
  )
}

export default App
