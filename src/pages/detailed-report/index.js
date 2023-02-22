import cookie from 'cookie';
import { HomeCardContainer, MainLayout } from '@/shared/components';
import { cardLinks } from '@/shared/data';
import getStore from '@/store/store';
import { setAuthentication } from '@/store/user';


const DetailedReports = () => {
  return (
    <MainLayout
      title="Detailed Report"
    >
      <HomeCardContainer
        items={cardLinks}
      />
    </MainLayout>
  );
};

export const getServerSideProps = (ctx) => {
  const cookies = cookie.parse(ctx.req.headers.cookie || '');
  const userCookie = cookies?.user_token;
  const store = getStore();
  if(!!userCookie) {
    store.dispatch(setAuthentication(true));
  }

  return {
    props: {
      initialState: store.getState(),
    }
  }
}

export default DetailedReports;
