import { useState } from "react";
import axios from "axios";
const Signup =()=>{
    const [signUpState, setSignupState] =useState({});
    const signupForm =[
        {
            attr: "username", 
            type:"text", 
            id:"username", 
            lable:"UserName:"
        },
        {
            attr: "email", 
            type:"email", 
            id:"email", 
            lable:"Email:" 
        },
        // {
        //     attr: "phone_no", 
        //     type:"email", 
        //     id:"phone_no", 
        //     lable:"Mobile_No:" 
        // },
        {
            attr: "password", 
            type:"password", 
            id:"password", 
            lable:"Password:"
        }
    ]
    const handleUserAdd =()=>{
        //need state for getting the data
        console.log(signUpState);
        // for API call we need axios in client-side
        axios({
            url: "http://localhost:3001/user/signup",
            method:"POST",
            headers:{

            },
            data: signUpState

        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err);
        })
    }
    const handleInputChange =(e, id)=>{
        // if(id === "phone_no"){
        //     e.target.value = parseInt(e.target.value)
        // }
        //[id]  username n password will show but
        //id : only show id value
        setSignupState({...signUpState, [id]: e.target.value})
    }
    return(
        <>
        <div>
            <form>
                {signupForm.map((formKey) =>{
                    return(
                        <div>
                            <div>
                                <label for={formKey.id}>{formKey.lable}</label>
                            </div>
                            <div>
                                <input type={formKey.type} id={formKey.id}  onChange={(e)=> {handleInputChange(e, formKey.id)}}/>
                            </div>
                        </div>
                    )
                })}
            </form><br/>
            <button type="submit" onClick={handleUserAdd}>Submit</button>
        </div>
        </>
    )
}
export default Signup;