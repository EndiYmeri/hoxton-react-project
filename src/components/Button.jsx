export default function Button({func, text}){
    return (
      <button 
        onClick={func}
        className="button simpleButton"
        >{text}</button>


    )
}