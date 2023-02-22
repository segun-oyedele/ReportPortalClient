import Head from 'next/head';
import PropTypes from 'prop-types';
import { Header } from '@/shared/components';

export const AuthLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{`CDL Report Portal - ${ title }`}</title>
        <meta name="description" content={`CDL Report Portal ${ title }`} />
      </Head>

      <Header />

      <main className="container flex flex-col items-center min-w-full min-h-[calc(100vh_-_80px)] pt-4 px-5 md:px-0">
        { children }
      </main>
    </>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};
