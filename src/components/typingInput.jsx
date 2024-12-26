import keyboardSound from '../sounds/keyboard-chspsil-146640.mp3'
import { ACTION } from '../reducer'
import { useEffect, useState } from 'react'

export default function TypingInput({settings, setTextTyped, textTyped, state, timer, isBlured, setIsBlured, refInput, missedtyped, dispatch, loading}){
    
    let audio = new Audio(keyboardSound)

    useEffect(() => {
        refInput.current = 0
        missedtyped.current = 0
        setTextTyped('')
        
    },[settings, state.text])

    function handleTyping(e){
        e.preventDefault()

        audio.play()

        let newValue = e.target.value

        // Prevent Default :
        // e.target.value = ''

        // BackSpace :
        if(state.typed.length > newValue.length){
            dispatch({type: ACTION.BACKSPACE})
            refInput.current -= 1
        }

        // Add If Correct :
        else if(state.text[refInput.current] == newValue[newValue.length - 1]){
            dispatch({type: ACTION.ADD_CORRECT, payload: {letter: newValue[newValue.length - 1], status: true}})
            refInput.current += 1
        }
        // Add If Incorrect :
        else{
            let falseChar = state.text[refInput.current]
            if(falseChar == ' '){
                    dispatch({type: ACTION.ADD_INCORRECT, payload: {letter: newValue[newValue.length - 1], status: false}})
                }
                else{
                    dispatch({type: ACTION.ADD_INCORRECT, payload: {letter: falseChar, status: false}})
                }
            refInput.current += 1
        }

        // if(newValue[newValue.length - 1] == ' ' && state.typed.length < newValue.length && document.querySelectorAll('div span')[refInput.current].offsetTop > document.querySelectorAll('div span')[refInput.current - 1].offsetTop){
        if(newValue[newValue.length - 1] == ' ' && document.querySelectorAll('div span')[refInput.current].offsetTop > document.querySelectorAll('div span')[refInput.current - 2].offsetTop){
            missedtyped.current += 1

            dispatch({type: ACTION.BACKSPACE})
            dispatch({type: ACTION.ADD_CORRECT, payload: {letter: '\n', status: true}})

            newValue = newValue.slice(0, newValue.length - 1) +  '\n'

            document.querySelectorAll('div span')[refInput.current].offsetTop > 59 ? document.querySelector('.text-div').scrollBy(0, 54) : null
            // document.querySelectorAll('div span')[refInput.current].offsetTop > 59 ? document.querySelector('textarea').scrollBy(0, -54) : null
        }
        // e.target.value = newValue
        setTextTyped(newValue)

    }

    return(
        <>
            <div className='relative'>
                {(loading && settings.type == 'quotes') && <div className='loading absolute flex justify-center items-center w-full h-40 z-40 bg-[#323437e0]'>
                    Loading...
                </div>}
                <div onClick={() => document.querySelector('textarea').focus()} className='text-div -z-0 h-40 text-center absolute w-full text-4xl font-medium leading-normal bg-transparent  borde outline-none'>
                    {
                        state.text.split('').map((e, index) => {
                            return(
                                <>
                                    <span className={`${index == refInput.current && isBlured ? 'active-caret' : ''} ${state.typed[index] == undefined ? 'text-[--sub-color]' : state.typed[index].status ? 'text-[--text-color]' : 'text-[--error-color]'}`}>{state.typed[index] == undefined ? e : state.typed[index].letter}</span>
                                </>
                            )
                        })
                    }
                </div>
                <textarea   
                        autoFocus 
                        disabled={timer == 0 || state.typed.length == state.text.length ? true : false} 
                        onFocus={() => setIsBlured(true)} 
                        onBlur={() => setIsBlured(false)} 
                        value={textTyped}
                        onChange={handleTyping}
                        className='relative h-24 w-full text-4xl font-medium text-transparent leading-normal bg-transparent borde outline-none resize-none'>
                </textarea>
            </div>
        </>
    )
}