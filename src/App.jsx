import { useState } from 'react'
import './App.css'
import './components/Home'
import Home from './components/Home'
import './components/Install'
import Install from './components/Install'
function App() {
    if (window.ethereum) {
      return(<Home></Home>)
    }else{
      return (<Install></Install>)
    }
}

export default App
