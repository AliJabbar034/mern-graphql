
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'
function App() {


  return (
   <BrowserRouter>
   
   <Route  path='/' Component={null}/>
   <Route path='/auth' Component={null}/>
   <Route path='/events' Component={null}/>
   <Route path='/booking' Component={null}/>
   </BrowserRouter>
  )
}

export default App
 