import React, {useEffect, useState, useRef} from 'react'
import style from './Timer.module.css'
import ThemeChangeButton from './ThemeChangeButton/ThemeChangeButton'
import sound from 'assets/a.wav'
function Mytimer(props) {
    let audio = new Audio(sound);
    const [dk,setDk] = useState(0);
    const [work,setWork] = useState("Work");
    const [finishes,setFinishes] = useState([]);
    const [minute,setMinute] = useState(50);
    const [second,setSecond] = useState(0);
    const [isPomodoro,setPomodoro] = useState(false);
    let intervalID = useRef(null);
    useEffect(()=> {
        intervalID.current = setInterval(() => {
        timer()                     
    }, 1000);
        return() => {clearInterval(intervalID.current)};

                    },[second, isPomodoro])
    function changeMinute() {
        if(!isPomodoro) setMinute(document.getElementById("a").value)
    }
    function start() {
        if(!(minute<=0)){
        setPomodoro(true)
        setDk(document.getElementById("a").value);
        }
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
    function timer() {
        if(isPomodoro){
            if(!second<=0){
                setSecond(second-1)
            }
            else if(minute!=0)
                {setSecond(59);setMinute(minute-1)}
            else{
                audio.play();
                reset()
                setPomodoro(false)
                setFinishes([...finishes,{süre:dk,iş:work}]);
                console.log(finishes,work)
            }
        }
    }
    function clearArray() {
            setFinishes([])
        
    }
    function getWork() {
            setWork(document.querySelector('#b').value);  
    }
    return(
    <>
    <div id="hbir" className={style.timer}>
        <div>
            <h1 className={style.hbir}>{timeFormat()}</h1>
        </div>

        <div className={style.buttons}>
            <button className={style.startButton} onClick={start} >Start</button>
            <button className={style.resetButton} onClick={reset} >Reset</button>
            <button className={style.stopButton} onClick={stop}  >Stop</button>
        </div>

        <div>
            <label htmlFor="">
            Minute: &nbsp;
            <input id="a" type="number" defaultValue={50} onChange={changeMinute}/>
            </label>
            <select id="b" defaultValue="Work" onChange={()=>getWork()}>
                <option value="Work">Work</option>
                <option value="Break">Break</option>
            </select>
        </div>
        <div className={style.streaks}>
            <ul>
                {finishes.map((deger)=><li>You are done a {deger.süre} minutes {deger.iş} session! {deger.iş == "Work" ? "📚" : "😴"  }</li>)}
            </ul>
        </div>
            <button className={style.clearStreak} onClick={()=> clearArray()} >Clear Streaks</button>
    </div>
    <ThemeChangeButton/>
    </>
    );
}
export default Mytimer;
