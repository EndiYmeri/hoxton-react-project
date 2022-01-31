export default function CardElement({card,index}){
    return(
        <li key={index} className={card.suit}>
            <h3>{card.value }</h3>
         </li>
    )
}