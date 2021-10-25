



import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import ('./register.css')

const Register = ({history}) => {

    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [passwordConfirm,setPasswordConfirm] = useState("");
    const [error,setError]= useState("")


    useEffect(()=>{

        if(localStorage.getItem("authToken")){

            history.push("/")
        }
    },[history]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("submited")

        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };

          if(password !== passwordConfirm){

            setPassword("");
            setPasswordConfirm("");
            setTimeout(()=>{
                setError("")
            },5000)

            return setError("Passwords do not match")
          }

        try {

            // console.log(username,email,password)
            
            const {data} = await axios.post("/api/auth/register",{

            username,
            email,
            password,
             },config);

             localStorage.setItem("authToken", data.token);

             history.push("/");

        } catch (error) {

            setError(error.response.data.error)

            setTimeout(()=>{

                setError("")
            },5000)

            console.log("erreur 2",error)
            
        }
       
    }


    return ( <div className="register-screen">


        <form className="register-screen__form" onSubmit={handleSubmit}>

            <h3 className="register-screen__title">Register</h3>

            {error && <span className="error-message">{error}</span>}

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

            <div className="form-group">

                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input type="password" onChange={(e)=>setPasswordConfirm(e.target.value)} value={passwordConfirm} name="" id="passwordConfirm" required />

            </div>

            <span className="register-screen__subtext">Already Have an Account ? <Link to="/login">Login</Link></span>

            <button className="btn" type="submit">Submit</button>


        </form>




    </div> );
}
 
export default Register;