import { useEffect, useState } from 'react'
import './App.css'
import Modal from './components/Modal'
import SingleCard from './components/SingleCard'

const cardImages=[
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {

  const[cards, setCards]=useState([])
  const[turns, setTurns]=useState(0)
  const[choiceOne, setChoiceOne]= useState(null)
  const[choiceTwo, setChoiceTwo]= useState(null)
  const[disabled, setDisabled]= useState(false)
  const[showModal, setShowModal]= useState(false)
  const[num, setNum]= useState(0)

  const shuffleCards=()=>{
    setShowModal(false)
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(()=> Math.random()-0.5)
      .map((card)=>({...card, id:Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setNum(0)
  }

  // console.log(cards, turns)

  const handleChoice=(card)=>{
    // console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true)

      if(choiceOne.src===choiceTwo.src){
        // console.log('match')
        setCards(prevCards => {
          return prevCards.map(card=>{
            if(card.src===choiceOne.src){
              setNum(prevNum=> prevNum+0.5)
              return {...card, matched: true}
            }
            else{
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        // console.log("don't match")
        setTimeout(()=>resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // console.log(cards)

  const resetTurn=()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns=> prevTurns+1)
    setDisabled(false)
  }

  useEffect(()=>{
    shuffleCards()
  },[])

  useEffect(()=>{
    if(num===12){
      setTimeout(()=>setShowModal(true), 1000)
    }
  },[num])

  return (
    <div className="App">
      {showModal && <Modal turns={turns} suffleCards={shuffleCards} />}
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <h3>Turns: {turns}</h3>
      <div className='card-grid'>
        {cards.map(card=>(
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card===choiceOne || card===choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App