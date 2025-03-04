import './App.css'
import './index.css'; 
import IpSearch from './components/IpSearch'
import MapComponent from './components/map';
import IpStore from './stores/ipStore';

function App() {
  const latitude = IpStore((state) => state.latitude);
  const longitude = IpStore((state) => state.longitude);
  console.log( latitude, longitude)

  return (
    <main className=' h-full w-full'>
       <IpSearch/>
       <div className=' w-full  h-1/2  md:h-3/5 flex justify-center items-center'>
       {latitude && longitude && (
        <div className="w-full h-full z-40 ">
          <MapComponent  key={`${latitude}-${longitude}`} latitude={latitude} longitude={longitude} />
        </div>
      )}
       </div>
    </main>
  )
}

export default App
