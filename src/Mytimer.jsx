import React, {useEffect, useState, useRef} from 'react'
import style from './Timer.module.css'
import sunIcon from './assets/sun.png'
import moonIcon from './assets/moon.png'
function Mytimer(props) {
    let pos=60;
    let elem;
    let sayac=0;
    const [dk,setDk] = useState(0);
    const [icon,setIcon]=useState(moonIcon);
    const [dark,setDark]=useState(false);
    const [finishes,setFinishes] = useState([]);
    const [minute,setMinute] = useState(5);
    const [second,setSecond] = useState(0);
    const [isPomodoro,setPomodoro] = useState(false);
    const animationID= useRef(null)
    let intervalID = useRef(null);
    useEffect(()=> {
        intervalID.current = setInterval(() => {
        timer()                     
    }, 10);
        return() => {clearInterval(intervalID.current)};

                    },[second, isPomodoro])
    function changeMinute() {
        if(!isPomodoro) setMinute(document.getElementById("a").value)
    }
    function start() {
        setPomodoro(true)
        setDk(document.getElementById("a").value);
    }
    function stop() {
        setPomodoro(false)
    }
    function reset(params) {
        setPomodoro(false)
        setMinute(document.getElementById("a").value)
        setSecond(0)
    }
    function timeFormat(params) {
        let dakika = String(minute).padStart(2,"0")
        let saniye = String(second).padStart(2,"0")

        return dakika+":"+saniye
    }
    function clearArray() {
            setFinishes([])
        
    }
    function darkMode() {
        document.getElementById("theme-button").style.backgroundColor="#ebe9e9"
        document.body.style.backgroundColor="#213547"
        document.getElementById("hbir").style.color="#ebe9e9"
        setIcon(sunIcon)
    }
    function lightMode() {
        setIcon(moonIcon)
        document.getElementById("theme-button").style.backgroundColor="#213547"
        document.body.style.backgroundColor="#ebe9e9"
        document.getElementById("hbir").style.color="#213547"
    }
    function themeChangeHandler() {
        if(!dark){
            darkMode()
            setDark(true)
        }
        else{
            lightMode()
            setDark(false)
        }
    }
    function timer() {
        if(isPomodoro){
            if(!second<=0){
                setSecond(second-1)
            }
            else if(minute!=0)
                {setSecond(59);setMinute(minute-1)}
            else{
                reset()
                setPomodoro(false)
                setFinishes([...finishes,dk]);
                console.log(finishes)
            }
        }
    }
     
    return(
    <>
    <div id="hbir" className={style.timer}>
        <h1 className={style.hbir}>{timeFormat()}</h1>
        <button className={style.startButton} onClick={start} >Start</button>
        <button className={style.resetButton} onClick={reset} >Reset</button>
        <button className={style.stopButton} onClick={stop}  >Stop</button>
        <br /> <br />
        <label htmlFor="">
        Minute: &nbsp;
        <input id="a" type="number" defaultValue={5} onChange={changeMinute}/>
        </label>
    </div>
    <div className={style.streaks}>
        <ul>
            {finishes.map((deger)=><li>You are done a {deger} minutes session!</li>)}
        </ul>
    </div>
    <button onClick={()=> clearArray()} >Clear Streaks</button>
    <button onClick={()=>themeChangeHandler()} id="theme-button" className={style.themeButton}>
        <img src={icon} alt="" />
    </button>
    </>
    );
}
export default Mytimer;
