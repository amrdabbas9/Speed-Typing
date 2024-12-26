import { useEffect, useState } from "react"
import { wordsList, numbers, puctuations } from "./words"
import { ACTION } from "./reducer";

let catgeories = ['age'
    ,'alone'
    ,'amazing'
    ,'anger'
    ,'architecture'
    ,'art'
    ,'attitude'
    ,'beauty'
    ,'best'
    ,'birthday'
    ,'business'
    ,'car'
    ,'change'
    ,'communication'
    ,'computers'
    ,'cool'
    ,'courage'
    ,'dad'
    ,'dating'
    ,'death'
    ,'design'
    ,'dreams'
    ,'education'
    ,'environmental'
    ,'equality'
    ,'experience'
    ,'failure'
    ,'faith'
    ,'family'
    ,'famous'
    ,'fear'
    ,'fitness'
    ,'food'
    ,'forgiveness'
    ,'freedom'
    ,'friendship'
    ,'funny'
    ,'future'
    ,'god'
    ,'good'
    ,'government'
    ,'graduation'
    ,'great'
    ,'happiness'
    ,'health'
    ,'history'
    ,'home'
    ,'hope'
    ,'humor'
    ,'imagination'
    ,'inspirational'
    ,'intelligence'
    ,'jealousy'
    ,'knowledge'
    ,'leadership'
    ,'learning'
    ,'legal'
    ,'life'
    ,'love'
    ,'marriage'
    ,'medical'
    ,'men'
    ,'mom'
    ,'money'
    ,'morning'
    ,'movies',
    'success']

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


let quoteKey = 'AT94Ki80K/kSKquDjLVuYA==c8MYuyDoeLu2Eh6F'
async function getQuote(){
    let api = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${catgeories[getRandomNumber(0, (catgeories.length - 1))]}`,{
        headers: { 'X-Api-Key': quoteKey},
        contentType: 'application/json',
    })
    return await api.json()
}  

export function useWordsListGenerator(state, dispatch){
    const [settings, setSettings] = useState({type: 'time', extra: 60, add:{num: false, pun: false}})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        generateText()
    }, [settings])

    function quoteText(quote){
        let tex = []
        for(let i = 0; i < quote.split(' ').length; i++){
            tex.push(quote.split(' ')[i])
        }
        dispatch({type: ACTION.CREATE_TEXT, payload: tex.join(' ')})
    }

    function generateText(){
        setLoading(true)
        let tex = []
        let wordsNumber = settings.type == 'words' ? settings.extra : 120
        if(settings.type == 'quotes'){
            getQuote().then(data => quoteText(data[0].quote)).finally(() => setLoading(false))
        }
        else{
            for(let i = 0; i < wordsNumber ; i++){
                let num = getRandomNumber(0, wordsList.length - 1)
                if(settings.add.num && i != 0 && i % 5 == 0){
                    tex.push(numbers[getRandomNumber(0, numbers.length - 1)])
                }
                if(settings.add.pun && i != 0 && i % 8 == 0){
                    tex.push(puctuations[getRandomNumber(0, puctuations.length - 1)])
                }
                tex.push(wordsList[num][getRandomNumber(0, wordsList[num].length - 1)])
            }   
            dispatch({type: ACTION.CREATE_TEXT, payload: tex.join(' ')})
        }
    }
    

    return [settings, setSettings, generateText, loading]
}