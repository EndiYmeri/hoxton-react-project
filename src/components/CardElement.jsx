export default function CardElement({card,index}){
    return(
        <li key={index} className={card.suit}>
            <h2>{card.value }</h2>
         </li>
    )
}