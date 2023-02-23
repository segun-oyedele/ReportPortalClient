import Image from "next/image"
import cookie from "cookie"
import { MainLayout } from "@/shared/components"
import getStore from "@/store/store"
import { setAuthentication } from "@/store/user"

export default function Home() {
  return (
    <MainLayout title='Home'>
      <section className='flex flex-col items-center w-full px-5 landing'>
        <div className='flex flex-col items-center w-full gap-32 text-center justify-evenly xl:flex-row'>
          <h1 className='home_text raleway-eb'>
            Manage all reports and partners in one place
          </h1>
          <div className='relative h-56 w-72 home__hero-image xl:w-auto xl:h-auto'>
            <Image
              className='img-home'
              src={`${process.env.iisPath}/img/hero_img.svg`}
              layout='fill'
              alt='Box image'
              title='Box image'
              priority='true'
            />
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export const getServerSideProps = (ctx) => {
  const cookies = cookie.parse(ctx.req.headers.cookie || "")
  const userCookie = cookies?.user_token
  const store = getStore()
  if (!!userCookie) {
    store.dispatch(setAuthentication(true))
  }

  return {
    props: {
      initialState: store.getState(),
    },
  }
}
