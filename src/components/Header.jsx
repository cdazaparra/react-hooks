import React, {useState, useContext} from 'react'
import ThemeContext from '../context/Themecontex'

const Header = () => {
        const [darkMode, setDarkMode] = useState(false)
        const color = useContext(ThemeContext)
        const handleClick= ()=>{
                setDarkMode(!darkMode)
        }
        return (
                <div className='Header'>
                        <h1 style={{color}}>ReactHooks</h1>
                        <button type='button' onClick={()=>setDarkMode(!darkMode)}>{darkMode ? 'Dark Mode' : 'Ligh Mode'}</button>
                        <button type='button' onClick={handleClick}>{darkMode ? 'Dark Mode' : 'Ligh Mode'}</button>
                </div>
        )
}

export default Header;