import { Board } from './components/Board'
import "./App.css"
import { useState } from 'react'

function App() {


  return (
    <>
   <div className="App">
      <Board rows={3} cols={3} />
    </div>
    </>
  )
}

export default App
