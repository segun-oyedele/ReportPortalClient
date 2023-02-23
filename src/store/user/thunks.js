import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  useFetchAuth,
  useFetchWithQuery,
  usePatchWithQuery,
} from "@/shared/hooks"
import { clearUser } from "./userSlice"

/* LOGIN */

export const login = createAsyncThunk("user/login", async (body) => {
  const response = await useFetchAuth("/login", body)
  const { data } = await response.json()
  console.log("loging data", data)
  if (data.success) {
    return {
      success: true,
      auth_token: data.auth_token,
    }
  }
})

/* REGISTER */

export const register = createAsyncThunk("user/register", async (body) => {
  const response = await useFetchAuth("/register/", body, "POST")
  const { success, data } = await response.json()
  if (success) {
    return {
      success: true,
      auth_token: data[0].auth_token,
    }
  }
})

/* LOGOUT */

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    const response = await usePatchWithQuery("/logout/")
    const { data } = await response.json()
    if (data.success) {
      return true
    }
  }
)
