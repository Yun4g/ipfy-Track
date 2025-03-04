import { useState } from "react";
import UseFetch from "./useFetch";
import { useEffect } from "react";  
import IpStore from "../stores/ipStore";
import MapComponent from "./map";


function IpSearch() {
  const [ipAddress, setIpAddress] = useState(
    localStorage.getItem("ipAddress") || "8.8.8.8"
  );
  const storedUrl = localStorage.getItem("fetch");
  const [fetch, setFetch] = useState(storedUrl || null);
  const setLocation = IpStore((state) => state.setLocation );
  const {data, loading, error} = UseFetch(fetch); 




   useEffect(() => {
    if (data && !loading && !error) {
        setLocation(data.ip, data.latitude, data.longitude);
    }
}, [data, loading, error, setLocation]);

    const handleSearch = () => {
        const url = `https://ipapi.co/${ipAddress}/json/`;
        setFetch(url);
        localStorage.setItem("fetch", url); 
    }
    console.log(data)

   

 const handleChanges = (e) => {
    const input = e.target.value;
    localStorage.setItem('ipAddress', input);
     setIpAddress(e.target.value)
    }

    useEffect(() => {
        if (fetch) {
          localStorage.setItem("fetch", fetch);
        }
      }, [fetch]);

  

    return (
        <div className=" bgIpaddress flex flex-col gap-4 items-center pt-5 md:pt-11  pb-6 md:pb-0 bg-cover bg-center bg-no-repeat w-full h-fit md:h-2/5">
             <h1 className=" text-2xl md:text-4xl  font-semibold text-white  ">IP Address Tracker</h1>

                <div className=" w-4/5  md:w-[490px] mt-8 rounded-xl flex  h-16 md:h-14 bg-white overflow-hidden" >
                     <input
                    type="text"
                     value={ipAddress}
                     onChange={(e) => handleChanges(e)}
                     id="ip-address-input"
                     name="ip-address-input"
                     required
                      className=" ps-5 outline-none w-[90%]" placeholder="Enter Ip address" />
                     <button onClick={handleSearch} className=" bg-black flex justify-center items-center h-full w-[10%]">
                         <img src="images/icon-arrow.svg" alt="" />
                     </button>
                </div> 

                <div className=" md:flex gap-7 md:gap-3 h-fit md:h-36  p-4 md:p-8 bg-white shadow-md shadow-slate-500 md:absolute z-50  text-center  top-40 md:top-56 rounded-lg w-4/5 border">
                 <div className=" md:w-2/6 h-full border-e-2">
                    <p className=" text-slate-500 font-bold">IP ADDRESS</p>
                    {
                        loading ? <h2>Loading...</h2> : error ? <h2>Error...</h2> : <h2 className="  md:text-lg lg:text-2xl font-bold">{data.ip}</h2>
                    }
                 </div>
                 <div className=" md:w-2/6 h-full border-e-2">
                    <p className=" text-slate-500 font-bold">LOCATION</p>
                     {
                        loading ? <h2>Loading...</h2> : error ? <h2>INvalid ip address or "This is a reserved/private IP"</h2> : <h2 className=" md:text-lg lg:text-2xl font-bold"> {data.country_name}, {data.city} {data.reason}</h2> 
                     }
                 </div>
                 <div className=" md:w-2/6 h-full border-e-2">
                    <p className=" text-slate-500 font-bold">TIMEZONE</p>
                    <h2>
                        {
                            loading ? <h2>Loading...</h2> : error ? <h2>Error...</h2> : <h2 className=" md:text-lg lg:text-2xl font-bold">{data.timezone} {data.reason}</h2>
                        }
                    </h2>
                 </div>

                 <div className=" md:w-2/6">
                    <p className=" text-slate-500 font-bold"> ISP</p>
                    
                    <h2>

                        { 
                            loading ? <h2>Loading...</h2> : error ? <h2>Error...</h2> : <h2 className=" text-lg lg:text-2xl font-bold">{data.org} {data.reason}</h2>
                        }
                    </h2>
                 </div>
                </div>

        </div>
    );
}

export default IpSearch;