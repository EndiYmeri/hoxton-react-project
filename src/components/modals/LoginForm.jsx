export default function LoginForm({addUser, setModal}){
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="closeModal"
                    onClick={()=>{
                        setModal(false)
                    }}
                >X</span>
                <h1>Add new user form</h1>
                <form
                    onSubmit={(e)=>{
                        e.preventDefault()
                        // @ts-ignore
                        addUser(e.target.username.value, e.target.fullName.value, e.target.email.value)  
                        // @ts-ignore
                        e.target.reset()  
                    }}
                    >
                    <label htmlFor="username">
                        Username:
                        <input type="text" name="username" id="username" />
                    </label>                
                    <label htmlFor="fullName">
                        Full name:
                        <input type="text" name="fullName" id="fullName" />
                    </label>                
                    <label htmlFor="email">
                        Email:
                        <input type="email" name="email" id="email" />
                    </label>     
                    <button type="submit">Add New User</button>           
                </form>
            </div>
    </div>
    )
}