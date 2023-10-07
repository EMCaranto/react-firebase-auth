import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// assets (icons & logos)
import ExclamationIcon from '../../assets/icons/ExclamationIcon'
import VisibilityEyeOff from '../../assets/icons/VisibilityEyeOff'
import VisibilityEyeOn from '../../assets/icons/VisibilityEyeOn'

// components (apps & shared)
import LoadingButton from '../shared/button/LoadingButton'

// contexts
import { useAuth } from '../contexts/AuthProvider'

function SignUp() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordConfirm, setPasswordConfirm ] = useState('')

  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ submitted, setSubmitted ] = useState(false)
  const [ clicked, setClicked ] = useState(false)

  const [ validEmail, setValidEmail ] = useState(false)
  const [ validPassword, setValidPassword ] = useState(false)
  const [ showPassword, setShowPassword ] = useState(false)

  const { signUp } = useAuth()

  const navigate = useNavigate()

  const handleEmailChange = (event) => {
    const EmailValue = event.target.value
    const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isValidEmail = EmailRegex.test(EmailValue)

    setEmail(EmailValue)
    setValidEmail(isValidEmail)
  }

  const handlePasswordChange = (event) => {
    const PasswordValue = event.target.value
    const PasswordRegex = /^(?=\S{8,}$)(?=.*[a-zA-Z]).*$/
    const isValidPassword = PasswordRegex.test(PasswordValue)

    setPassword(PasswordValue)
    setValidPassword(isValidPassword)
  }

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value)
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleButtonClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 100)
  }

  const validateInput = () => {
    if (!email || !password || !validEmail || !validPassword) {
      return false
    }
    if (password !== passwordConfirm ) {
      return false
    }
    return true
  }

  const handleSignUp = async () => {
    try {
      setLoading(true)
      const userCredential = await signUp(email, password)

      if (userCredential && userCredential.user) {
        setError('')
        navigate('/')
      }
    }
    catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email address is already in use by another account")
      }
    }
    finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)

    if (validateInput()) {
      handleSignUp()
      setSubmitted(false)
    }
  }

  return (
    <>
      <div className="flex flex-grow flex-col px-10 py-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center mb-5">
            <h1 className="text-2xl font-medium text-slate-700 mb-2 dark:text-slate-50 duration-300 transition ease-in-out">
              Get Started
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-50 duration-300 transition ease-in-out">
              You can now start creating your account
            </p>
          </div>
          <div className="w-full md:w-3/4 lg:w-2/4 xl:w-1/4 transform duration-300 ease-in-out my-3">
            {
              error && (
                <div className="flex items-center justify-center rounded-lg bg-red-100 p-4 text-sm font-bold text-red-500">
                  <div className="bg-red-300 rounded-full p-1">
                    <ExclamationIcon className="h-6 w-6" />
                  </div>
                  <div className="px-4">
                    <p
                      className="font-medium"
                      dangerouslySetInnerHTML={{ __html: error }}>
                    </p>
                  </div>
                </div>
              )
            }
          </div>


          <div className="w-full md:w-3/4 lg:w-2/4 xl:w-1/4 rounded-lg bg-white dark:bg-slate-600 duration-300 transform ease-in-out shadow-lg">
            <div className="p-8">
              <form
                onSubmit={ handleSubmit }
                autoComplete="off"
              >
                <div className="mb-3">
                  <div className="relative">
                    <input
                      className={
                        !submitted
                        ? "peer block w-full appearance-none rounded-lg border-2 border-slate-300 px-3 pb-2.5 pt-4 text-sm text-slate-900 dark:text-slate-50 transition dark:bg-slate-600 duration-300 ease-in-out focus:border-blue-500 focus:outline-blue-200 focus:ring-0 focus:outline-offset-1"
                        : !email || !validEmail
                        ? "peer block w-full appearance-none rounded-lg border-2 border-red-500 px-3 pb-2.5 pt-4 text-sm text-slate-900 dark:text-slate-50 transition dark:bg-slate-600 duration-300 ease-in-out focus:border-red-500 focus:outline-red-200 focus:ring-0 focus:outline-offset-1"
                        : "peer block w-full appearance-none rounded-lg border-2 border-green-500 px-3 pb-2.5 pt-4 text-sm text-slate-900 dark:text-slate-50 transition dark:bg-slate-600 duration-300 ease-in-out focus:border-green-500 focus:outline-green-200 focus:ring-0 focus: outline-offset-1"
                      }
                      type="text"
                      name="email"
                      id="email"
                      placeholder=""
                      onChange={ handleEmailChange }
                    />
                    <label
                      className={
                        !submitted
                        ? "absolute left-3 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white dark:bg-slate-600 dark:text-slate-50 transform ease-in-out px-2 text-sm text-slate-500 duration-300 peer-placeholder-shown:left-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-500 cursor-text"
                        : !email || !validEmail
                        ? "absolute left-3 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white dark:bg-slate-600 dark:text-slate-50 transform ease-in-out px-2 text-sm text-red-500 duration-300 peer-placeholder-shown:left-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-red-500 cursor-text"
                        : "absolute left-3 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white dark:bg-slate-600 dark:text-slate-50 transform ease-in-out px-2 text-sm text-green-500 duration-300 peer-placeholder-shown:left-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-500 cursor-text"
                      }
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                  </div>
                  <div>
                    {
                      !submitted ? (
                        <div className="p-2.5"></div>
                      ) : !email ? (
                            <div className="flex items-center justify-end px-1.5 pt-1">
                              <p className="text-xs font-bold text-red-500">
                                Email address is required
                              </p>
                            </div>
                      ) : !validEmail ? (
                            <div className="flex items-center justify-end px-1.5 pt-1">
                              <p className="text-xs font-bold text-red-500">
                                Invalid email address format
                              </p>
                            </div>
                      ) : (
                            <div className="flex items-center justify-end px-1.5 pt-1">
                              <p className="text-xs font-bold text-green-500">
                                You're good
                              </p>
                            </div>
                      )
                    }
                  </div>
                </div>
                <div className="mb-3">
                  <div className="relative">
                    <input
                      className={
                        !submitted
                        ? "peer block w-full appearance-none rounded-lg border-2 border-slate-300 px-3 pb-2.5 pt-4 text-sm text-slate-900 dark:text-slate-50 transition dark:bg-slate-600 duration-300 ease-in-out focus:border-blue-500 focus:outline-blue-200 focus:ring-0 focus:outline-offset-1"
                        : !password || !validPassword
                        ? "peer block w-full appearance-none rounded-lg border-2 border-red-500 px-3 pb-2.5 pt-4 text-sm text-slate-900 dark:text-slate-50 transition dark:bg-slate-600 duration-300 ease-in-out focus:border-red-500 focus:outline-red-200 focus:ring-0 focus:outline-offset-1"
                        : "peer block w-full appearance-none rounded-lg border-2 border-green-500 px-3 pb-2.5 pt-4 text-sm text-slate-900 dark:text-slate-50 transition dark:bg-slate-600 duration-300 ease-in-out focus:border-green-500 focus:outline-green-200 focus:ring-0 focus: outline-offset-1"
                      }
                      type={ !showPassword ? "password" : "text" }
                      name="password"
                      id="password"
                      placeholder=""
                      onChange={ handlePasswordChange }
                    />
                    <label
                      className={
                        !submitted
                        ? "absolute left-3 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white dark:bg-slate-600 dark:text-slate-50 transform ease-in-out px-2 text-sm text-slate-500 duration-300 peer-placeholder-shown:left-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-500 cursor-text"
                        : !password || !validPassword
                        ? "absolute left-3 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white dark:bg-slate-600 dark:text-slate-50 transform ease-in-out px-2 text-sm text-red-500 duration-300 peer-placeholder-shown:left-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-red-500 cursor-text"
                        : "absolute left-3 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white dark:bg-slate-600 dark:text-slate-50 transform ease-in-out px-2 text-sm text-green-500 duration-300 peer-placeholder-shown:left-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-500 cursor-text"
                      }
                      htmlFor="password"
                    >
                      Password
                    </label>
                    {
                      !password ? (
                        ""
                      ) : (
                        <button
                          className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none"
                          type="button"
                          onClick={ handleShowPassword }
                        >
                          {
                            !showPassword ? (
                              <VisibilityEyeOn className="h-5 w-5 text-slate-500" />
                            ) : (
                              <VisibilityEyeOff className="h-5 w-5 text-slate-500" />
                            )
                          }
                        </button>
                      )
                    }
                  </div>
                  <div>
                    {
                      !submitted ? (
                        <div className="p-2.5"></div>
                      ) : !password ? (
                            <div className="flex items-center justify-end px-1.5 pt-1">
                              <p className="text-xs font-bold text-red-500">
                                Password is required
                              </p>
                            </div>
                      ) : !validPassword ? (
                            <div className="flex flex-col items-end justify-center px-1.5 pt-1">
                              <p className="text-xs font-bold text-red-500">
                                Your password must meet the following :
                              </p>
                              <ul className="list-disc text-right text-xs font-bold text-red-500">
                                {
                                  password.length <= 8 && (
                                    <li>
                                      must be atleast 8 characters
                                    </li>
                                  )
                                }
                                {
                                  /\s/.test(password) && (
                                    <li>
                                      must not have whitespaces
                                    </li>
                                  )
                                }
                              </ul>
                            </div>
                      ) : (
                            <div className="flex items-center justify-end px-1.5 pt-1">
                              <p className="text-xs font-bold text-green-500">
                                You're good
                              </p>
                            </div>
                      )
                    }
                  </div>
                </div>
                <div className="mb-3">
                  <div className="relative">
                    <input
                      className={
                        !submitted
                        ? "peer block w-full appearance-none rounded-lg border-2 border-slate-300 px-3 pb-2.5 pt-4 text-sm text-slate-900 dark:text-slate-50 transition dark:bg-slate-600 duration-300 ease-in-out focus:border-blue-500 focus:outline-blue-200 focus:ring-0 focus:outline-offset-1"
                        : !passwordConfirm || passwordConfirm !== password
                        ? "peer block w-full appearance-none rounded-lg border-2 border-red-500 px-3 pb-2.5 pt-4 text-sm text-slate-900 dark:text-slate-50 transition dark:bg-slate-600 duration-300 ease-in-out focus:border-red-500 focus:outline-red-200 focus:ring-0 focus:outline-offset-1"
                        : "peer block w-full appearance-none rounded-lg border-2 border-green-500 px-3 pb-2.5 pt-4 text-sm text-slate-900 dark:text-slate-50 transition dark:bg-slate-600 duration-300 ease-in-out focus:border-green-500 focus:outline-green-200 focus:ring-0 focus: outline-offset-1"
                      }
                      type="password"
                      name="password-confirm"
                      id="password-confirm"
                      placeholder=""
                      onChange={ handlePasswordConfirmChange }
                    />
                    <label
                      className={
                        !submitted
                        ? "absolute left-3 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white dark:bg-slate-600 dark:text-slate-50 transform ease-in-out px-2 text-sm text-slate-500 duration-300 peer-placeholder-shown:left-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-500 cursor-text"
                        : !passwordConfirm || passwordConfirm !== password
                        ? "absolute left-3 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white dark:bg-slate-600 dark:text-slate-50 transform ease-in-out px-2 text-sm text-red-500 duration-300 peer-placeholder-shown:left-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-red-500 cursor-text"
                        : "absolute left-3 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white dark:bg-slate-600 dark:text-slate-50 transform ease-in-out px-2 text-sm text-green-500 duration-300 peer-placeholder-shown:left-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-500 cursor-text"
                      }
                      htmlFor="password-confirm"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div>
                    {
                      !submitted ? (
                        <div className="p-2.5"></div>
                      ) : !passwordConfirm ? (
                            <div className="flex items-center justify-end px-1.5 pt-1">
                              <p className="text-xs font-bold text-red-500">
                                Password is required
                              </p>
                            </div>
                      ) : passwordConfirm !== password ? (
                            <div className="flex items-center justify-end px-1.5 pt-1">
                              <p className="text-xs font-bold text-red-500">
                                Passwords do not match
                              </p>
                            </div>
                      ) : (
                            <div className="flex items-center justify-end px-1.5 pt-1">
                              <p className="text-xs font-bold text-green-500">
                                You're good
                              </p>
                            </div>
                      )
                    }
                  </div>
                </div>
                <div>
                  <button
                    className={
                      !loading
                      ? `w-full rounded bg-blue-500 px-5 py-2.5 text-center text-sm text-white transition duration-300 ease-in-out hover:bg-blue-600 focus:bg-blue-600 focus:outline-offset-1 focus:outline-blue-200 drop-shadow-lg ${ clicked ? "translate-y-0.5" : "" }`
                      : "w-full rounded bg-blue-500 px-5 py-2.5 text-center text-sm text-white transition duration-300 ease-in-out hover:bg-blue-500 focus:bg-blue-500 focus:outline-offset-1 focus:outline-blue-200 drop-shadow-lg"
                    }
                    type="submit"
                    disabled={ loading }
                    onClick={ handleButtonClick }
                  >
                    {
                      !loading ? (
                        <div className="flex items-center justify-center">
                          <p>
                            Sign Up
                          </p>
                        </div>
                      ) : (
                        <LoadingButton />
                      )
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-50 duration-300 transition ease-in-out">
              Already have an account?
              <Link
                className="ml-1.5 text-blue-500 hover:underline focus:underline focus:outline-offset-4 focus:outline-blue-200"
                to="/sign-in"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
