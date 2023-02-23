import { useRouter } from "next/router"
import { useRef } from "react"
import Cookies from "js-cookie"

import {
  GoBackButton,
  InputField,
  LockIcon,
  PageDescription,
  PageTitle,
} from "@/shared/components"
import { AuthLayout, Button } from "@/components/auth"
import { useForm } from "@/shared/hooks"
import { register } from "@/store/user"
import { useAppDispatch } from "@/store/hooks"

const initialForm = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
}

const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    formValues,
    handleEmailChange,
    handlePasswordChange,
    handleNameChange,
    emailError,
    passwordError,
    firstNameError,
    lastNameError,
  } = useForm(initialForm)
  const { email, password, first_name, last_name } = formValues
  const showButton =
    !emailError &&
    !!email.length &&
    !passwordError &&
    !!password.length &&
    !firstNameError &&
    !!first_name.length &&
    !lastNameError &&
    !!last_name.length &&
    (email.split("@")[1] === "cdldelivers.com" ||
      email.split("@")[1] === "broadviewtechnicalsolutions.com")
  const formRef = useRef(null)

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log("formdata")

    const formData = new FormData(formRef.current)
    console.log("formdata", formValues)
    const { payload } = await dispatch(register(formData))
    console.log("payload", payload)
    const { success, auth_token } = payload

    if (success) {
      Cookies.set("user_token", auth_token)
      router.push(`/`)
    }
  }

  return (
    <AuthLayout title='Register'>
      <GoBackButton />

      <div className='w-full max-w-md shadow form__container mb-4 mt-4'>
        <PageTitle
          title='Sign Up'
          stylesClass='text-center raleway-b text-3xl mb-2'
        />

        <PageDescription
          title='Provide the following information below to create an account'
          stylesClass='text-center w-72 md:w-80 auth__page-description mx-auto mb-8'
        />

        <form
          className='mt-8 space-y-6'
          onSubmit={handleRegister}
          ref={formRef}
        >
          <div className='-space-y-px rounded-md'>
            <InputField
              inputLabel='First Name'
              inputName='first_name'
              inputType='text'
              placeholderText='Enter First Name'
              inputChange={handleNameChange}
              inputValue={first_name}
              inputStyle='form__input mb-4'
              inputError={firstNameError}
            />

            <InputField
              inputLabel='Last Name'
              inputName='last_name'
              inputType='text'
              placeholderText='Enter Last Name'
              inputChange={handleNameChange}
              inputValue={last_name}
              inputStyle='form__input mb-4'
              inputError={lastNameError}
            />

            <InputField
              inputLabel='Email Addresss'
              inputName='email'
              inputType='email'
              placeholderText='Enter Email Addresss'
              inputChange={handleEmailChange}
              inputValue={email}
              inputStyle='form__input mb-4'
              inputError={emailError}
            />

            <InputField
              inputLabel='Create Password'
              inputName='password'
              inputType='password'
              placeholderText='Create New Password'
              inputChange={handlePasswordChange}
              inputValue={password}
              inputStyle='form__input'
              inputError={passwordError}
            >
              <LockIcon />
            </InputField>
          </div>

          {showButton ? (
            <Button buttonText='Sign Up' />
          ) : (
            <button
              disabled={true}
              className='relative flex justify-center w-full px-4 py-2 text-lg text-white ease-in-out border border-transparent rounded-md cursor-default bg-primary raleway-b opacity-60 group focus:outline-none auth__button primary-blue'
            >
              Sign Up
            </button>
          )}
        </form>
      </div>
    </AuthLayout>
  )
}

export default RegisterPage
