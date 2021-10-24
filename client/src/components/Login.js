import axios from "axios";
import { useState } from "react";

import('./login.css')


const Login = ({history}) => {

    const [email,setEmail] = useState("")

    const [password,setPassword]= useState("")

    const handleSubmit = async(e)=>{

        e.preventDefault();

        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };

        try {

            const {data} = await axios.post("/api/auth/login",{

                email,
                password,
            },config)

            localStorage.setItem("authToken", data.token);

            history.push('/')
            
        } catch (error) {

            console.log(error)
            
        }

    }


    return ( <div className="login-screen">


    <form className="login-screen__form" onSubmit={handleSubmit}>

        <div className="form-group">

            <label htmlFor="email">Email</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} name="" id="" required />

        </div>

        <div className="form-group">

            <label htmlFor="password">Password</label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} name="" id="" required />

        </div>

        <button className="btn" type="submit">Submit</button>


    </form>




</div>  );
}
 
export default Login;