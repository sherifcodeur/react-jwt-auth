



import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import ('./register.css')

const Register = ({history}) => {

    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("submited")

        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };

        try {

            // console.log(username,email,password)
            
            const {data} = await axios.post("/api/auth/register",{

            username,
            email,
            password,
             },config);

             //localStorage.setItem("authToken", data.token);

             history.push("/");

        } catch (error) {

            console.log("erreur 2",error)
            
        }
       
    }


    return ( <div className="register-screen">


        <form className="register-screen__form" onSubmit={handleSubmit}>

            <div className="form-group">

                <label htmlFor="username">Username</label>
                <input type="text" onChange={(e)=>{setUsername(e.target.value)}} value={username} name="username" id="" required />

            </div>


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




    </div> );
}
 
export default Register;