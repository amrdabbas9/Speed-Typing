import './App.css'
import { useState, useRef, useLayoutEffect, useEffect, useReducer } from 'react'

let sub = ['he', 'she', 'they', 'I', 'you', 'we', 'it']
let sub2 = ['his', 'her', 'him', 'their', 'them', 'its', 'are', 'is', 'was', 'were']
let questions = ['what', 'why', 'where', 'who', 'when']
let verbs = ['play', 'eat', 'swim', 'snore', 'ride', 'pray', 'say', 'have', 'has']
let words = ['sword', 'book', 'laptop', 'table', 'electricity']
let coding = ['coding', 'programming', 'developer', 'let', 'var', 'hooks']


let rand = [sub, sub2, questions, verbs, words, coding]


export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let initialValue = {  typed: [], 
                      text: '', 
                      change: false, 
                      isFirstWord: false, 
                      timer: 60
                  }

const ACTION = {
  CREATE_TEXT : 'CREATE_TEXT',
  CHANGE_TEXT : 'CHANGE_TEXT',
  BACKSPACE : 'BACKSPACE',
  ADD_CORRECT : 'ADD_CORRECT',
  ADD_INCORRECT : 'ADD_INCORRECT'
}

function reducer(state, {type, payload}){
  switch(type){
    case ACTION.CREATE_TEXT:
      return {
          typed: [], 
          text: payload, 
          change: false, 
          isFirstWord: false, 
          // timer: 60
      }
    case ACTION.CHANGE_TEXT:
      return {
        typed: [],
        text: '',
        change: true, 
        isFirstWord: false, 
      }
    case ACTION.BACKSPACE:
      return {
        typed: [...state.typed.slice(0, state.typed.length - 1)],
        text: state.text,
        change: false, 
        isFirstWord: true, 
      }
    case ACTION.ADD_CORRECT:
      return {
        typed: [...state.typed , payload],
        text: state.text,
        change: false, 
        isFirstWord: true, 
      }
    case ACTION.ADD_INCORRECT:
      return {
        typed: [...state.typed , payload],
        text: state.text,
        change: false, 
        isFirstWord: true, 
      }
      

    default :
      return state
  }
}

function App() {

  // const [state, setState] = useState([])
  // const [text, setText] = useState('')
  // const [change, setChange] = useState(false)
  // const [isFirstWord, setIsFirstWord] = useState(false)
  // const [timer, setTimer] = useState(60)
  let refInput  = useRef(0)


  const [state, dispatch] = useReducer(reducer, initialValue)
  const [timer, setTimer] = useState(60)



  useEffect(() => {
    let tex = []
    let wordsNum = 90
    for(let i = 0; i < wordsNum; i++){
      let num = getRandomNumber(0, rand.length - 1)
      tex.push(rand[num][getRandomNumber(0, rand[num].length - 1)])
    }
    // setText(() => tex.join(' '))
    // setChange(false)
    dispatch({type: ACTION.CREATE_TEXT, payload: tex.join(' ')})
  }, [state.change])

  function handleChangeText(){
    refInput.current = 0
    // setState([])
    // setIsFirstWord(() => false)
    // // setTimer(60)
    // setChange(true)
    dispatch({type: ACTION.CHANGE_TEXT})
  }
  console.log(state.typed)


  function handleTyping(e){
    e.preventDefault()

    // if(!isFirstWord){
    //   setIsFirstWord(true)
    // }

    let newValue = e.target.value

    // Prevent Default :
    e.target.value = ''

    // BackSpace :
    if(state.typed.length > newValue.length){
      console.log('backspace')
      console.log([...state.typed.slice(0, state.length - 1)])
      // setState(() => [...state.slice(0, state.length - 1)])
      dispatch({type: ACTION.BACKSPACE})
      refInput.current -= 1
    }

    // Add If Correct :
    // else if(text[refInput.current] == newValue[newValue.length - 1]){
    else if(state.text[refInput.current] == newValue[newValue.length - 1]){
      console.log('Added')
      // setState(() => e.target.value)
      // setState(() => {
      //   return [...state, {letter: newValue[newValue.length - 1], status: true}]
      // })
      dispatch({type: ACTION.ADD_CORRECT, payload: {letter: newValue[newValue.length - 1], status: true}})
      refInput.current += 1
    }
    // Add If Incorrect :
    else{
      let falseChar = state.text[refInput.current]
      // setState(() => {
      //   // return [...state, {letter: newValue[newValue.length - 1], status: false}]
      //   return [...state, {letter: falseChar, status: false}]
      // })
      dispatch({type: ACTION.ADD_INCORRECT, payload: {letter: falseChar, status: false}})
      refInput.current += 1
    }

    e.target.value = newValue
  }

  let s = state.typed.filter((index) => {
    return index.status
  })

  
  useEffect(() => {
    let timerout
    if(state.isFirstWord){
      timerout = setTimeout(() => {

        setTimer(timer => timer > 0 ? timer - 1 : 0)
      }, 1000)
    }else{
        clearTimeout(timerout)
        setTimer(60)
    }

  }, [timer, state.isFirstWord])
  return (
    <>
      <div className='flex'>
        <h3 className='mr-10 text-gray-600 hover:text-white' onClick={() => setTimer(15)}>15</h3>
        <h3 className='mr-10 text-gray-600 hover:text-white' onClick={() => setTimer(30)}>30</h3>
        <h3 className='mr-10 text-gray-600 hover:text-white' onClick={() => setTimer(45)}>45</h3>
        <h3 className='mr-10 text-gray-600 hover:text-white' onClick={() => setTimer(60)}>60</h3>
      </div>
      <h2>Timer : {timer}</h2>
      <button onClick={handleChangeText}>Change Text</button>
      {timer == 0 && <h1>Speed : {Math.floor(s.length / 5) * (60 / timer)} WPM</h1>}
      {timer == 0 && <h1>Accuricy : {Math.floor((s.length * 100) / state.typed.length)}%</h1>}
      <div className='app relative w-11/12 m-auto mt-20'>
        <textarea value={state.text} className='-z-0 h-96  absolute w-full text-3xl leading-normale bg-transparent text-gray-500 borde outline-none p-10 resize-none' />
        <div className='-z-0 h-96 absolute w-full text-3xl leading-normale bg-transparent text-gray-500 borde outline-none p-10'>
        {
            state.typed.map((e) => {
              return(
                <>
                  <span className={`${e.status ? 'text-white' : 'text-red-800'}`}>{e.letter}</span>
                </>
              )
            })
          }
        </div>
        <textarea onChange={handleTyping} className='relative h-96 w-full text-3xl text-transparent leading-normale bg-transparent borde outline-none p-10 resize-none'>
        </textarea>
      </div>
    </>
  )
}

export default App
