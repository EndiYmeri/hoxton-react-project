import CardElement from "./CardElement"

export default function CardsOnHand({cardsToShow}){
    return(
        <ul>
        {cardsToShow.map((card, index) =>{
            return (
              <CardElement card={card} index={index}/>
            )
        })}
        </ul>
    )
}