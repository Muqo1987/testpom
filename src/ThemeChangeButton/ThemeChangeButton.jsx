import React, {useEffect, useState, useRef} from 'react'
import style from './ThemeChangeButton.module.css'
import moonBackground from '../testpom/assets/cozybackground.jpg'
import sunBackground from '../testpom/assets/sunBackground.jpg'
import sunIcon from '../assets/sun.png'
import moonIcon from '../assets/moon.png'
function ThemeChangeButton() {
    const [photo,setPhoto]=useState(sunBackground)
    const [icon,setIcon]=useState(moonIcon);
    const [dark,setDark]=useState(false);
    function darkMode() {
        setPhoto(moonBackground);
        document.getElementById("theme-button").style.backgroundColor="white"
        document.getElementById("hbir").style.color="white"
        setIcon(sunIcon)
    }
    function lightMode() {
        setIcon(moonIcon);
        setPhoto(sunBackground);
        document.getElementById("theme-button").style.backgroundColor="black"
        document.getElementById("hbir").style.color="black"
    }
    document.body.style.backgroundImage=`url(${photo})`
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
    return(<>
      <button onClick={()=>themeChangeHandler()} id="theme-button" className={style.themeButton}>
        <img src={icon} alt="" />
    </button>
    </>);
}
export default ThemeChangeButton;
