import axios from "axios";
import { useState } from "react";

import ('./ForgotPassword.css')


const ForgotPassword = () => {

    const [email,setEmail] = useState("")
    const [error,setError] = useState("")

    const [success,setSuccess] = useState("")



    const handleForgot = (e)=>{

        e.preventDefault();

        const sendResetEmail = async ()=>{

            const config = {
                header: {
                  "Content-Type": "application/json",
                },
              
            }

            try {

               const {data} = await axios.post("/api/auth/forgotpassword",{email},config)

               setSuccess(data.data)

                
            } catch (error) {

                setError("errur ici")

                setEmail("")

                setTimeout(()=>{
                    setError("")
                },5000)
                
            }

        }

        sendResetEmail()



    }



    return ( <div className="forgotpassword-screen">

        <form className="forgotpassword-screen__form" onSubmit={handleForgot}>

        <h3 className="forgotpassword-screen__title">Forgot Password</h3>

        {error && <span className="error-message">{error}</span>}

        {success && <span className="success-message">{success}</span>}

        <div className="form-group">

            <label htmlFor="email">Email</label>
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} name="email" id="" required placeholder="Enter email"/>      

        </div>

        <button className="btn btn-primary" type="submit">Send Email</button>
        
        </form>
    </div> );
}
 
export default ForgotPassword;