import { useEffect, useState } from "react/cjs/react.development"
import LoginForm from "../components/modals/LoginForm"

export default function LoginPage({users, logIn, setCurrentUser }){
    const [modal, setModal] = useState(false)


    function addUser(newUsername, newFullName, newEmail){
        fetch('http://localhost:3001/users',{
            method:"POST",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: newUsername,
                fullName: newFullName,
                email: newEmail,
                games: [],
                money:200
            })
        }).then(resp=> resp.json()).then(newUser => logIn(newUser))
    }

    return ( 
        <div className="login-page">
            <div className="users">
                <ul>
                    <h1>Users</h1>
                    {
                        users.map(user=>{
                            return (
                                <li key={user.id} className="user"
                                    onClick={()=>{
                                        logIn(user)
                                    }}
                                >
                                    <div className="image">
                                        <img src={`https://robohash.org/${user.id}`} alt="" />
                                    </div>
                                    <div className="details">
                                        <p><strong>{user.username}</strong></p>
                                        <p>{user.fullName}</p>    
                                    </div>
                                </li>
                            )                            
                        })
                    }
                </ul>
            </div>
            <button 
                onClick={()=>{
                    setModal(true)
                }}
                className="">
                Add User
            </button>
            {modal
            ?<LoginForm addUser={addUser} setModal={setModal}/>
            :null
            }
        </div>        
    )
}