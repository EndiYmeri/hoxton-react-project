import { useEffect, useState } from "react/cjs/react.development"

export default function LoginPage({users, logIn, setCurrentUser }){

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
            <button className="">
                Add User
            </button>
        </div>        
    )
}