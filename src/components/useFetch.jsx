import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function    UseFetch(url) {
    const storedData = localStorage.getItem('data');
    const parsedData = storedData ? JSON.parse(storedData) : null;


    const [data, setData] = useState(parsedData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   useEffect(()=>{
    const FetchData = async () => {
        setLoading(true);
        try {
         const response = await axios.get(url);
      
                 if (response.status !== 200) {
                       throw new Error("Error fetching data");
                   }   
            localStorage.setItem('data', JSON.stringify(response.data));       
            setData(response.data);
      
            } catch (error) {
             setError(error);
              console.log(error);     
        } finally {
         console.log("fetching data");
         setError(null);
         setLoading(false);
        }       
       }

       FetchData()
   },[url])
  

      return {data, loading, error}
}

export default UseFetch;