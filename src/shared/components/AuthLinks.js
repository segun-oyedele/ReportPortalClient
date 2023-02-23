import Link from "next/link"
import PropTypes from "prop-types"
import Cookies from "js-cookie"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { logout } from "@/store/user"
import { useRouter } from "next/router"

export const AuthLinks = ({ isMobile }) => {
  const { isAuthenticated } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    const { payload } = await dispatch(logout())
    if (payload) {
      Cookies.remove("user_token")
      router.push(`/auth/login`)
    }
  }

  return (
    <div
      className={`flex items-center auth__pages-buttons ${
        isMobile
          ? "auth__sidebar-buttons grid grid-cols-2 gap-2 justify-items-center w-11/12 mx-auto absolute bottom-5"
          : ""
      }`}
    >
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className={`inline-block text-lg text-center transition-opacity rounded-lg raleway-eb signup__button hover:opacity-60 ${
            isMobile ? "" : "bg-white ml-10"
          }`}
        >
          Logout
        </button>
      ) : (
        <>
          <Link href={`/auth/login`}>
            <a
              className={`inline-block h-10 px-2 leading-10 transition-opacity raleway-eb login__button hover:opacity-60 ${
                isMobile ? "" : "text-white"
              }`}
            >
              Log In
            </a>
          </Link>
          <Link href={`/auth/register`}>
            <a
              className={`inline-block text-lg text-center transition-opacity rounded-lg raleway-eb signup__button hover:opacity-60 ${
                isMobile ? "" : "bg-white ml-10"
              }`}
            >
              Sign Up
            </a>
          </Link>
        </>
      )}
    </div>
  )
}

AuthLinks.propTypes = {
  isMobile: PropTypes.bool,
}
