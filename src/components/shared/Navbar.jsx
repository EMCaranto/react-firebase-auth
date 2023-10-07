import React from 'react'

// assets (icons && logos)
import ReactLogo from '../../assets/ReactLogo'
import FirebaseLogo from '../../assets/FirebaseLogo'

// components (apps & shared)
import DarkMode from './DarkMode'

function Navbar() {
  return (
    <>
      <div className="flex">
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-blue-500 dark:bg-slate-700 duration-300 transition ease-in-out">
          <div className="flex w-full flex-wrap items-center justify-between px-4 py-4">
            <div className="flex w-full">
              <div className="flex w-full justify-between md:px-4 duration-300 transform ease-in-out">
                <div className="flex items-center justify-center">
                  <div className="gap-1 flex items-center justify-center">
                    <ReactLogo className="h-8 w-8" />
                    <FirebaseLogo className="h-8 w-8" />
                  </div>
                  <div className="flex items-center justify-start">
                    <p className="hidden md:block text-xl font-medium text-white">
                      React with Firebase Authentication
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <DarkMode />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar
