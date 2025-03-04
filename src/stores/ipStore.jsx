import { create } from "zustand"


const IpStore = create((set)=>({
    ipAddress : '',
    latitude : '',
    longitude : '',
  
    setLocation: (ip, lat, lon) => set({ latitude: lat, longitude: lon }),
    
})) 


export default IpStore