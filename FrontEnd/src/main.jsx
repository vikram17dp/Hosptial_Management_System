import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export const Context = createContext({isAuthenticated:false});

const Appwrapeer = ()=>{
    const [isAuthenticated,setIsAutenticated] = useState(false);
    const [user,setUser] = useState();
    <Context.Provider value={{isAuthenticated,setIsAutenticated,user,setUser}}>
      <App/>
    </Context.Provider>
    

}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Appwrapeer />
  </StrictMode>,
)
