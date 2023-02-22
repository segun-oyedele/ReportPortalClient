import { AuthLinks } from './AuthLinks';
import Image from 'next/image';

export const Header = () => {

  return (
    <header className="header-tag primary-blue">
      <div className="container flex items-center justify-between h-full p-5 md:p-0 md:px-4">
        <Image
          alt='Last Mile Logo'
          className="w-16"
          width={106}
          height={50}
          src={`${process.env.iisPath}/img/last_mile_logo.png`}
          title="Last-Mile-Logo"
        />
        <div className="hidden lg:block">
          <AuthLinks />
        </div>
      </div>
    </header>
  );
};
