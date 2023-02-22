import Head from "next/head"
import PropTypes from "prop-types"

import { Header, Sidebar, Navbar } from "../"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setActive } from "@/store/ui"

export const MainLayout = ({ children, title }) => {
  const { isAuthenticated } = useAppSelector((state) => state.user)
  const { active } = useAppSelector((state) => state.ui)
  const dispatch = useAppDispatch()

  const handleActiveSelectTerminals = (event) => {
    const { classList } = event.target
    if (!classList.contains("select_option") && active) {
      dispatch(setActive(false))
    }
  }

  return (
    <>
      <Sidebar />
      <Head>
        <title>{`CDL Report Portal - ${title}`}</title>
        <meta name='description' content={`CDL Report Portal ${title}`} />
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href={`${process.env.linksPath}/apple-touch-icon.png`}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href={`${process.env.linksPath}/favicon-32x32.png`}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href={`${process.env.linksPath}/favicon-16x16.png`}
        />
        <link
          rel='manifest'
          href={`${process.env.linksPath}/site.webmanifest`}
        />
        <link
          rel='mask-icon'
          href={`${process.env.linksPath}/safari-pinned-tab.svg`}
          color='#5bbad5'
        />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>

      <Header />

      <Navbar />

      <main
        className='pt-4 pb-6 main__container'
        onClick={handleActiveSelectTerminals}
      >
        <div className='container px-4'>{children}</div>
      </main>
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}
