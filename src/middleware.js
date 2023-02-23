import { NextResponse } from "next/server"

export function middleware(req) {
  const authCookie = req.cookies.get("user_token")
  if (req.nextUrl.pathname.includes("/auth/login")) {
    if (!!authCookie) {
      return NextResponse.redirect(
        new URL("/Xcelerator/cdl-report-portal/", req.url)
      )
    }
  }
  if (req.nextUrl.pathname.includes("/auth/register")) {
    if (!!authCookie) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }
  if (req.nextUrl.pathname.includes("/detailed-report")) {
    if (!authCookie) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }
  }
  if (req.nextUrl.pathname.includes("/distribution-list")) {
    if (!authCookie) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }
  }
  if (req.nextUrl.pathname.includes("/user-management")) {
    if (!authCookie) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }
  }
  if (req.nextUrl.pathname.includes("/summary-report")) {
    if (!authCookie) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }
  }
  return NextResponse.next()
}
