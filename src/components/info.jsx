


export default function Info({state, settings, timer, missedtyped}){

    let wordsTyped = state.typed.filter((index) => {
        return index.letter == ' '
    })

    let missedLastWord = state.typed.length == state.text.length ? 1 : 0
    return(

        <>
            {
                settings.type == 'time'
                ?
                <h2 className={`text-2xl text-[--main-color] transition ${state.isFirstWord ? 'opacity-100' : 'opacity-0'}`}>{timer}</h2>
                :
                <h2 className={`text-2xl text-[--main-color] transition ${state.isFirstWord ? 'opacity-100' : 'opacity-0'}`}>{wordsTyped.length + missedtyped.current + missedLastWord}/{state.text.split(' ').length}</h2>        
                // <h2 className={`text-2xl text-[--main-color] transition ${state.isFirstWord ? 'opacity-100' : 'opacity-0'}`}>{wordsTyped.length + missedtyped.current + missedLastWord}/{settings.extra}</h2>        
            }
        </>
    )
}