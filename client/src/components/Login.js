import axios from "axios";
import { useState ,useEffect} from "react";
import { Link } from 'react-router-dom';

import('./login.css')


const Login = ({history}) => {

    const [email,setEmail] = useState("")

    const [password,setPassword]= useState("")

    const [error,setError]= useState("")

    useEffect(()=>{

        if(localStorage.getItem("authToken")){

            history.push("/")
        }
    },[history]);



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

            history.push('/private')
            
        } catch (error) {

            setError(error.response.data.error)

            setTimeout(()=>{

                setError("")
            },5000)

            
            
        
            
        }

    }


    return ( <div className="login-screen">


    <form className="login-screen__form" onSubmit={handleSubmit}>

    <h3 className="register-login__title">Login</h3>

    {error && <span className="error-message">{error}</span>}

        <div className="form-group">


            <label htmlFor="email">Email</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} name="" id="" required />

        </div>

        <div className="form-group">

        <label htmlFor="password">
            Password:{" "}
            <Link to="/forgot-password" className="login-screen__forgotpassword">
              Forgot Password?
            </Link></label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} name="" id="" required />

        </div>

        <button className="btn btn-primary" type="submit">Login</button>

        <span className="login-screen__subtext">No account yet ? <Link to="/register">Register</Link></span>


    </form>




</div>  );
}
 
export default Login;