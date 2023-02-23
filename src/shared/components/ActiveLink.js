import PropTypes from "prop-types"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { NavbarIcon } from "./"

export const ActiveLink = ({ index, label, href, stylesClass, navPath }) => {
  const { pathname, push } = useRouter()
  const [isActive, setIsActive] = useState(
    pathname === navPath || pathname === `${navPath}/${pathname.split("/")[2]}`
  )
  const activeStyles = isActive
    ? "text-white raleway-eb cursor-default nav_link-active"
    : "nav_link-inactive hover:opacity-60 raleway-m"

  const handleClick = (event) => {
    event.preventDefault()
    setIsActive(true)
    push(href)
  }

  useEffect(() => {
    setIsActive(
      pathname === navPath ||
        pathname === `${navPath}/${pathname.split("/")[2]}`
    )
  }, [pathname])

  if (isActive) {
    return (
      <a className={`${activeStyles} ${stylesClass}`}>
        <NavbarIcon iconIndex={index} strokeColor='white' />
        <span>{label}</span>
      </a>
    )
  } else {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={`${activeStyles} ${stylesClass}`}
      >
        <NavbarIcon iconIndex={index} strokeColor='#292D32' />
        <span>{label}</span>
      </a>
    )
  }
}

ActiveLink.propTypes = {
  stylesClass: PropTypes.string,
  href: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  navPath: PropTypes.string.isRequired,
}
