import React, { useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'

// assets (icons & logos)
import CloseIcon from '../../assets/icons/CloseIcon'
import PersonIcon from '../../assets/icons/PersonIcon'
import QuestionIcon from '../../assets/icons/QuestionIcon'

// contexts
import { useAuth } from '../contexts/AuthProvider'

function Dashboard() {
  const [ openModal, setOpenModal ] = useState(false)
  const { currentUser, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async() => {
    try {
      await signOut()
      navigate('/sign-in')
    }
    catch (error) {
      console.log("Error Catched by handleSignOut: " + error.message)
    }
  }

  return (
    <>
      <div className="flex flex-grow flex-col px-10 py-10">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full md:w-3/4 lg:w-2/4 xl:w-1/4 overflow-hidden rounded-lg shadow-lg transform duration-300 ease-in-out">
            <div className="w-full bg-blue-500 dark:bg-slate-900 duration-300 transition ease-in-out py-16"></div>
            <div className="relative flex w-full flex-col items-center justify-center bg-white dark:bg-slate-700 duration-300 transition ease-in-out pt-20">
              <div className="absolute -top-16 flex h-32 w-32 items-center justify-center rounded-full bg-white dark:bg-slate-700 duration-300 transition ease-in-out">
                <div className="flex h-28 w-28 items-end justify-center overflow-hidden rounded-full bg-slate-300">
                  <PersonIcon className="h-28 w-28 translate-y-5 text-slate-500" />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-lg font-bold dark:text-slate-50 duration-300 transition ease-in-out">
                  { currentUser.email }
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 p-4">
                <button
                  className="w-full rounded bg-blue-500 py-2 text-center text-sm text-white hover:bg-blue-600 duration-300 transition"
                  onClick={ () => setOpenModal(true) }
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/** Sign Out Modal */}
      
      <Transition
        show={ openModal }
        as={ Fragment }
      >
        <Dialog
          className="relative z-50"
          onClose={ () => setOpenModal(false) }
        >
          <Transition.Child
            as={ Fragment }
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>
          </Transition.Child>
          <Transition.Child
            as={ Fragment }
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <Dialog.Panel className="w-3/4 md:w-2/4 lg:w-1/3 xl:w-1/5 rounded-lg bg-white px-4 py-4 duration-300 transform ease-in-out">
                <div className="flex">
                  <div className="mr-4 self-center rounded-full bg-blue-200 p-2 text-blue-600">
                    <QuestionIcon />
                  </div>
                  <div className="w-full">
                    <Dialog.Title className="flex items-center justify-between">
                      <p className="text-lg font-bold text-slate-700">
                        Sign Out
                      </p>
                      <button
                        className="rounded"
                        onClick={ () => setOpenModal(false) }
                      >
                        <CloseIcon className="h-6 w-6 text-slate-700"/>
                      </button>
                    </Dialog.Title>
                    <p className="my-4 text-sm font-medium text-slate-700">
                      Are you sure you want to sign out your account?
                    </p>
                  </div>
                </div>
                <button
                  className="mt-4 w-full rounded bg-blue-500 hover:bg-slate-600 duration-300 transition py-2 text-center text-sm text-white"
                  onClick={ handleSignOut }
                >
                  Yes, Sure
                </button>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>

    </>
  )
}

export default Dashboard
