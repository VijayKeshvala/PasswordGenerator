import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [Length, setLength] = useState(8);
  const [NumAllowed, setNumAllowed] = useState(false);
  const [CharAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(NumAllowed) str = str + "01234567890"
    if(CharAllowed) str += "@!#$%^&*()_+-?<>[]:''."
    for(let i = 1; i <= Length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  
  },[Length, NumAllowed, CharAllowed, setPassword])

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  },[Password])
  useEffect(()=>{
    passwordGenerator()
  },[Length, NumAllowed, CharAllowed, passwordGenerator])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input 
      type="text" 
      value={Password}
      className="outline-none w-full py-1 px-3"
      placeholder='Password'
      readOnly
      ref={passwordRef}
      />
      <button
      onClick={copyPassword}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      >Copy</button>
        
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={8}
          max={100}
          value={Length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length: {Length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={NumAllowed}
          id='numberInput'
          onChange={()=>{
            setNumAllowed((prev)=> !prev) 
          }}
          />
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={CharAllowed}
          id='characterInput'
          onChange={()=>{
            setCharAllowed((prev)=> !prev) 
          }}
          />
          <label htmlFor="characterInput">Character</label>
          </div>
      </div>
    </div>
  )
}

export default App
