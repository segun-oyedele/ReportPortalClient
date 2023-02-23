import { useRef } from "react"
import { useRouter } from "next/router"
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
import { useAppDispatch } from "@/store/hooks"
import { alertPopup } from "@/shared/helpers"

import { login } from "@/store/user"

const initialForm = {
  email: "",
  password: "",
}

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    formValues,
    handleEmailChange,
    handlePasswordChange,
    emailError,
    passwordError,
  } = useForm(initialForm)
  const { email, password } = formValues
  const formRef = useRef(null)

  const showButton =
    !emailError && !!email.length && !passwordError && !!password.length

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData(formRef.current)
      const { payload } = await dispatch(login(formData))
      const { success, auth_token } = payload

      if (success) {
        Cookies.set("user_token", auth_token)
        router.push(`/`)
      }
    } catch (error) {
      alertPopup("Something went wrong. Please try again.", "error", 2000)
    }
  }

  return (
    <AuthLayout title='Login'>
      <GoBackButton />

      <div className='w-full max-w-md shadow form__container mb-4 mt-4'>
        <PageTitle
          title='Log In'
          stylesClass='text-center raleway-b text-3xl mb-2'
        />

        <PageDescription
          title='Provide the following information below to sign into your account'
          stylesClass='text-center w-72 md:w-80 auth__page-description mx-auto mb-8'
        />

        <form className='mt-8 space-y-6' onSubmit={handleLogin} ref={formRef}>
          <div className='-space-y-px rounded-md'>
            <InputField
              inputLabel='Email Addresss'
              inputName='email'
              inputType='email'
              placeholderText='Enter Email Addresss'
              inputChange={handleEmailChange}
              inputValue={email}
              inputStyle='form__input mb-2 mt-2'
              inputError={emailError}
            />

            <InputField
              inputLabel='Password'
              inputName='password'
              placeholderText='Enter Your Login Password'
              inputType='password'
              inputChange={handlePasswordChange}
              inputValue={password}
              inputStyle='form__input mt-2'
              inputError={passwordError}
            >
              <LockIcon />
            </InputField>
          </div>

          <Button buttonText='Log In' disabled={!showButton} />
        </form>
      </div>
    </AuthLayout>
  )
}

export default LoginPage
