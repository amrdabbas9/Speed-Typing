import { useState, useRef, useEffect, useReducer } from 'react'

// CSS Files :
import './App.css'

// Reducer Function :
import reducer, { ACTION } from './reducer'

// Icons :
import { FaArrowRotateRight, FaGreaterThan, FaKeyboard } from "react-icons/fa6";

// Hooks :
import { useWordsListGenerator } from './useWordsListGenerator';

// Components :
import Config from './components/config'
import TypingInput from './components/typingInput';
import Info from './components/info';
import { createPortal } from 'react-dom';


let initialValue = 
      {  
        typed: [], 
        text: '', 
        change: false, 
        isFirstWord: false, 
      }


function App() {
  const [state, dispatch] = useReducer(reducer, initialValue)
  const [settings, setSettings, generateText, loading] = useWordsListGenerator(state, dispatch)
  const [timer, setTimer] = useState(60)
  const [isBlured, setIsBlured] = useState(false)
  const [textTyped, setTextTyped] = useState('')
  // const [isFinished, setIsFinished] = useState(false)

  let refInput  = useRef(0)
  let missedtyped = useRef(0)


  useEffect(() => {
    setTimer(settings.type == 'time' ? settings.extra : 60)
  }, [state.text])

  // Generate a New Text :
  function handleChangeText(){
    // refInput.current = 0
    // missedtyped.current = 0
    generateText()
  }

  // Retake the Same Text :
  function handleRepeatText(){
    refInput.current = 0
    missedtyped.current = 0
    dispatch({type: ACTION.REPEAT_TEXT})
    setTimer(settings.type == 'time' ? settings.extra : 60)
    setTextTyped('')
    document.querySelector('.text-div').scrollTo(0, 0)
  }

  // Show Status :
  function showStatus(speed, acc, type){
    // setIsFinished(true)
    console.log('Finished')

    if(state.isFirstWord){
      if(localStorage.getItem('results')){
        console.log('old')
        let newResult = JSON.parse(localStorage.getItem('results'))
        console.log(newResult)
        newResult.push({speed: speed, acc: acc, type: type})
        localStorage.setItem('results', JSON.stringify(newResult))
      }
      else{
        console.log('new')
        localStorage.setItem('results', JSON.stringify([{speed: speed, acc: acc, type: type}]))
      }
    }
    
  }

  // Update the Timer :
  useEffect(() => {
    let timerout
    if(state.isFirstWord && settings.type == 'time'){
      timerout = setTimeout(() => {
        setTimer(timer => timer > 0 ? timer - 1 : 0)
        timer > 0 ? setTimer(timer - 1) : null
      }, 1000)
    }else{
        clearTimeout(timerout)
        settings.type == 'time' ? setTimer(settings.extra) : null
    }
  }, [settings, timer, state.isFirstWord])

  
  return (
    <>
      <div className='app relative w-4/5 m-auto mt-10'>
        <h1 className='w-fit text-2xl flex items-center p-5 bgs-[--sub-alt-color] rounded-lg mt-10 mb-10'><FaKeyboard className={`mr-6 transition ${state.isFirstWord ? 'text-white' : 'text-[--main-color]'}`} /> DabbasTyping </h1>
        
        <Config isBlured={isBlured} state={state} timer={timer} settings={settings} setSettings={setSettings} />
        
        <Info state={state} settings={settings} timer={timer} missedtyped={missedtyped} />

        <TypingInput loading={loading} textTyped={textTyped} setTextTyped={setTextTyped} settings={settings} state={state} timer={timer} isBlured={isBlured} setIsBlured={setIsBlured} refInput={refInput} missedtyped={missedtyped} dispatch={dispatch} />

        <button onClick={handleChangeText} className='m-auto block transition mt-32 text-[--sub-color] hover:text-white'><FaArrowRotateRight /></button>

        {(timer == 0 || (state.typed.length == state.text.length && state.isFirstWord)) && <Result handleRepeatText={handleRepeatText} showStatus={showStatus} handleChangeText={handleChangeText} state={state} settings={settings}/>}
        {/* <Result handleRepeatText={handleRepeatText} showStatus={showStatus} handleChangeText={handleChangeText} state={state} settings={settings}/> */}
        {/* <Result handleRepeatText={handleRepeatText} handleChangeText={handleChangeText} state={state} settings={settings}/> */}
      </div>

    </>
  )
}

function Result({ state, settings, handleChangeText, handleRepeatText, showStatus }){

  let s = state.typed.filter((index) => {
    return index.status
  })
  let speed = Math.floor(Math.floor(s.length / 5) * (60 / settings.extra))
  let acc = Math.floor((s.length * 100) / state.typed.length)
  let typ = `${settings.type} ${settings.extra}`
  showStatus(speed, acc, typ)
  let newResult = JSON.parse(localStorage.getItem('results'))

  return createPortal(
    <>
      {/* <div className='absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full bg-[--bg-color]'> */}
      <div className='absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full bg-[--bg-color]'>
        <div className='w-3/5 '>
          <div className='flex justify-between'>
            <div className='flex flex-col justify-between'>
              <div className='flex flex-col text-3xl items-center p-10q'>
                <h1 className='text-[--sub-color]'>WPM</h1>
                <h1 className='text-[--main-color] text-2xl'>{speed}</h1>
              </div>
              <div className='flex flex-col text-3xl items-center p-10q'>
                <h1 className='text-[--sub-color]'>ACC</h1>
                <h1 className='text-[--main-color] text-2xl'>{acc}%</h1>
              </div>
            </div>
            <div className='flex w-full justify-center max-h-44 overflow-hidden'>
              <div className='mr-20'>
                <h1 className='text-[--sub-color] text-xl'>Speed</h1>
                {
                  newResult.map((e) => {
                    return(
                      <>
                        <h1 className='text-[--main-color] text-center'>{e.speed}</h1>
                      </>
                    )
                  })
                }
              </div>
              <div className='mr-20'>
                <h1 className='text-[--sub-color] text-xl'>Accuricy</h1>
                {
                  newResult.map((e) => {
                    return(
                      <>
                        <h1 className='text-[--main-color] text-center'>{e.acc}%</h1>
                      </>
                    )
                  })
                }
              </div>
              <div>
                <h1 className='text-[--sub-color] text-xl'>Test Type</h1>
                {
                  newResult.map((e) => {
                    return(
                      <>
                        <h1 className='text-[--main-color] text-center'>{e.type}</h1>
                      </>
                    )
                  })
                }
              </div>
            </div>

          </div>
          <div className='flex justify-center mt-10'>
            {/* <div className='flex flex-col text-3xl items-center p-10q'>
              <h1 className='text-[--sub-color]'>Test Type</h1>
              <h1 className='text-[--main-color] text-2xl'>{settings.type} {settings.extra}</h1>
            </div> */}
            <div className='flex flex-col text-2xl items-center p-10q'>
              <h1 className='text-[--sub-color]'>Right / Wrong / Extra / Missed</h1>
              <h1 className='text-[--main-color] text-2xl'>{s.length} / {state.typed.length - s.length} / 0 / 0</h1>
            </div>
          </div>
        
        <div className='flex justify-center'>
          <button onClick={handleRepeatText} className='flex mr-10 w-fit transition mt-20 text-[--sub-color] hover:text-white'><FaArrowRotateRight /></button>
          <button onClick={handleChangeText} className='flex w-fit transition mt-20 text-[--sub-color] hover:text-white'><FaGreaterThan /></button>
        </div>
      
        </div>
      </div>

    </>
    ,
    document.getElementById('result')
  )
}

export default App
