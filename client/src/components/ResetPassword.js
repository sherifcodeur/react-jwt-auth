import axios from "axios";
import { useState } from "react";

import ('./ResetPassword.css')


const ResetPassword = ({history,match}) => {


    const [password,setPassword] = useState("")
    const [passwordConfirm,setPasswordConfirm] = useState("")

    const [error,setError]= useState("")
    const [success,setSuccess] = useState("")


    const handleSubmit = async (e)=>{


        e.preventDefault();

        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };

          if (password !== passwordConfirm) {
            setPassword("");
            setPasswordConfirm("");
            setTimeout(() => {
              setError("");
            }, 5000);
            return setError("Passwords don't match");
          }

      

                try {

                    const {data} = await axios.put(`/api/auth/password-reset/${match.params.resetToken}`,{password},config)



                    setSuccess(data.data)



                    
                } catch (error) {

                    setError("error in setting up your new password")

                
                    
                }


       






    }


    return ( <div className="resetpassword-screen">

                <form className="resetpassword-screen__form" onSubmit={handleSubmit}>

                <h3 className="resetpassword-screen__title">Choose a New Password</h3>

                {error && <span className="error-message">{error}</span>}

                {success && <span className="success-message">{success}</span>}


                <div className="form-group">

                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} name="" id="" required />

                </div>

                <div className="form-group">

                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input type="password" onChange={(e)=>setPasswordConfirm(e.target.value)} value={passwordConfirm} name="" id="passwordConfirm" required />

                </div>



                <button className="btn" type="submit">Submit</button>


                </form>
    </div> );
}
 
export default ResetPassword;