import axios from "axios";
import { useEffect, useState } from "react";


const Private = ({history}) => {

    const [error,setError] = useState("")
    const [data,setData] = useState("")

    useEffect(()=>{

        const fetchData = async ()=>{

            const config = {

                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

                try {


                    const {data} = await axios.get("/api/private",config)

                    setData(data.data)



                } catch (error) {

                    localStorage.removeItem("authToken")

                    setError("not autorized to access content please Login")
                    
                }


        }


        fetchData()
        

       



    },[])

    const logoutHandler =()=>{


        localStorage.removeItem("authToken")
        history.push("/login");
    }

    return error ? (<span>{error}</span>):( <div className="container">


        {data}

        <button onClick={logoutHandler}>Logout</button>
    </div> );
}
 
export default Private;