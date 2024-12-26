import { FaAt, FaClock, FaHashtag, FaKeyboard, FaQuoteLeft, FaScrewdriverWrench, FaWrench } from "react-icons/fa6";



export default function Config({ state, isBlured, settings, setSettings }){
    return(
        <div className={`config text-sm transition ${state.isFirstWord && isBlured ? 'opacity-0' : 'opacity-100' } flex w-fit m-auto bg-[--sub-alt-color] rounded-md p-2 mb-10`}>
            <div className="flex">
                <h3 className={`ml-4 flex items-center mr-6 transition ${settings.add.pun ? 'text-[--main-color]' : 'text-[--sub-color]'}  hover:text-white`} onClick={() => setSettings({type: settings.type, extra: settings.extra, add: {num: settings.add.num, pun: !settings.add.pun}})} ><FaAt className="mr-2 text-sm"  /> punctuation</h3>
                <h3 className={`flex items-center mr-6 transition ${settings.add.num ? 'text-[--main-color]' : 'text-[--sub-color]'} hover:text-white`} onClick={() => setSettings({type: settings.type, extra: settings.extra, add: {num: !settings.add.num, pun: settings.add.pun}})} ><FaHashtag className="mr-2 text-sm"  /> numbers</h3>
            </div>
            <div className="w-2 h-6 mr-4 bg-[--bg-color] rounded-md"></div>
            <div className="flex">
                <h3 className={`flex items-center mr-6 transition ${settings.type == 'time' ? 'text-[--main-color]' : 'text-[--sub-color]'}  hover:text-white`} onClick={() => setSettings({type: 'time', extra: 60, add: {num: settings.add.num, pun: settings.add.pun}})}><FaClock className="mr-2 text-sm" />time</h3>
                <h3 className={`flex items-center mr-6 transition ${settings.type == 'words' ? 'text-[--main-color]' : 'text-[--sub-color]'}  hover:text-white`} onClick={() => setSettings({type: 'words', extra: 120, add: {num: settings.add.num, pun: settings.add.pun}})}><FaKeyboard className="mr-2 text-sm" />words</h3>
                <h3 className={`flex items-center mr-6 transition ${settings.type == 'quotes' ? 'text-[--main-color]' : 'text-[--sub-color]'}  hover:text-white`} onClick={() => setSettings({type: 'quotes', extra: 1, add: {num: settings.add.num, pun: settings.add.pun}})}><FaQuoteLeft className="mr-2 text-sm" /> quotes</h3> 
                <h3 className={`flex items-center mr-6 transition ${settings.type == 'custom' ? 'text-[--main-color]' : 'text-[--sub-color]'}  hover:text-white`} onClick={() => setSettings({type: 'custom', extra: 1, add: {num: settings.add.num, pun: settings.add.pun}})}><FaWrench className="mr-2 text-sm" /> custom</h3>
            </div>
            <div className="w-2 h-6 mr-4 bg-[--bg-color] rounded-md"></div>
            {
                settings.type == 'time' ?
                <div className='flex items-center'>
                    <h3 className={`mr-6 transition ${settings.extra == 15 ? 'text-[--main-color]' : 'text-[--sub-color]'}  hover:text-white`} onClick={() => setSettings({type: 'time', extra: 15, add: {num: settings.add.num, pun: settings.add.pun}})}>15</h3>
                    <h3 className={`mr-6 transition ${settings.extra == 30 ? 'text-[--main-color]' : 'text-[--sub-color]'}  hover:text-white`} onClick={() => setSettings({type: 'time', extra: 30, add: {num: settings.add.num, pun: settings.add.pun}})}>30</h3>
                    <h3 className={`mr-6 transition ${settings.extra == 45 ? 'text-[--main-color]' : 'text-[--sub-color]'}  hover:text-white`} onClick={() => setSettings({type: 'time', extra: 45, add: {num: settings.add.num, pun: settings.add.pun}})}>45</h3>
                    <h3 className={`mr-6 transition ${settings.extra == 60 ? 'text-[--main-color]' : 'text-[--sub-color]'}  hover:text-white`} onClick={() => setSettings({type: 'time', extra: 60, add: {num: settings.add.num, pun: settings.add.pun}})}>60</h3>
                    <h3 className={`mr-2 transition text-[--sub-color] hover:text-white`}><FaScrewdriverWrench className="mr-2 text-xs" /></h3>
                    
                </div> : null
            }
            {
                settings.type == 'words' ?
                <div className='flex items-center'>
                    <h3 className={`mr-6 transition ${settings.extra == 30 ? 'text-[--main-color]' : 'text-[--sub-color]'}  hover:text-white`} onClick={() => setSettings({type: 'words', extra: 30, add: {num: settings.add.num, pun: settings.add.pun}})}>30</h3>
                    <h3 className={`mr-6 transition ${settings.extra == 60 ? 'text-[--main-color]' : 'text-[--sub-color]'}  hover:text-white`} onClick={() => setSettings({type: 'words', extra: 60, add: {num: settings.add.num, pun: settings.add.pun}})}>60</h3>
                    <h3 className={`mr-6 transition ${settings.extra == 90 ? 'text-[--main-color]' : 'text-[--sub-color]'}  hover:text-white`} onClick={() => setSettings({type: 'words', extra: 90, add: {num: settings.add.num, pun: settings.add.pun}})}>90</h3>
                    <h3 className={`mr-6 transition ${settings.extra == 120 ? 'text-[--main-color]' : 'text-[--sub-color]'}  hover:text-white`} onClick={() => setSettings({type: 'words', extra: 120, add: {num: settings.add.num, pun: settings.add.pun}})}>120</h3>
                    <h3 className={`mr-2 transition text-[--sub-color] hover:text-white`}><FaScrewdriverWrench className="mr-2 text-xs" /></h3>
                </div> : null
            }
            
        </div>

    )
}