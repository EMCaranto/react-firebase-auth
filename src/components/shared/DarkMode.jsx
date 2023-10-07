import React, { useEffect, useState } from 'react'

// assets (icons & logos)
import DarkModeIcon from '../../assets/icons/DarkModeIcon'
import LightModeIcon from '../../assets/icons/LightModeIcon'

//stylesheets
import '../../stylesheets/DarkMode.css'

function DarkMode() {
  const [ darkMode, setDarkMode ] = useState(false)

  const toggleDarkMode = () => {
    const darkModeTheme = !darkMode
    setDarkMode(darkModeTheme)

    localStorage.setItem("darkMode", darkModeTheme.toString())
  }

  useEffect(() => {
    const darkTheme = localStorage.getItem("darkMode")

    if (darkTheme === "true") {
      setDarkMode(true)
      document.body.classList.add("dark")
    }
    else if (darkTheme === "false") {
      setDarkMode(false)
      document.body.classList.remove("dark")
    } 
  }, [darkMode])

  return (
    <>
      <label
        className="darkmode-switch"
        htmlFor="darkModeToggle"
      >
        <input
          className="darkmode-checkbox"
          type="checkbox"
          id="darkModeToggle"
          checked={ darkMode }
          onChange={ toggleDarkMode }
        />
        <div className="cover"></div>
          <DarkModeIcon className="darkmode-icon h-8 w-8" />
          <LightModeIcon className="lightmode-icon h-8 w-8" />
      </label>
    </>
  )
}

export default DarkMode
