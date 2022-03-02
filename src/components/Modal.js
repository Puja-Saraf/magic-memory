import ReactDOM from 'react-dom'
import './Modal.css'

export default function Modal({suffleCards, turns}) {
  return ReactDOM.createPortal((
    <div className="modal-backdrop">
      <div className="modal">
        <h3>You completed in {turns} turns!</h3>
        <h3>Play Again to improve you score!</h3>
        <button onClick={()=>{suffleCards()}}>Play Again</button>
      </div>
    </div>
  ), document.body)
}