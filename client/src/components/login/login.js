import { useState } from "react";
import axios from "axios";
const Login =()=>{
    const [login, setLogin]= useState({userName:"", password:"" })
    const handleLogin=()=>{
        axios({
            url: "http://localhost:3001/user/login",
            method:"POST",
            headers:{

            },
            data: {username: login.userName, password: login.password}

        }).then((val)=>{
            //console.log(res)
            localStorage.setItem("Token", "");
            document.cookie =`authToken: ${val.data.authToken}`    //making interpolated
        }).catch((err)=>{
            console.log(err);
        })
    }
    return(
        <>
        <div>
            <form>
                <div>
                    <label for="username">UserName:</label>
                </div>
                <div>
                    <input id="username" type="text" onChange={(e)=>{setLogin({...login, userName: e.target.value})}} />
                </div>
                <div>
                    <label for="password">Password:</label>
                </div>
                <div>
                    <input id="password" type="password" onChange={(e)=>{setLogin({...login, password: e.target.value})}}/>
                </div>
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
        </div>
        </>
    )
}
export default Login;