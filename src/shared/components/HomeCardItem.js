import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

export const HomeCardItem = ({ title, description, iconName, urlLink }) => {
  
  return (
    <Link href={`/detailed-report/${urlLink}`}>
      <a className="flex flex-col justify-between w-full max-w-md gap-8 px-8 py-4 transition-all duration-300 rounded-2xl home_card-report hover:shadow-md hover:-translate-y-1">
        <div className="h-20">
          <Image
            alt="Card icon"
            className="rounded-lg"
            height={80}
            src={`${process.env.iisPath}/img/icons/${iconName}.svg`}
            title="Card icon"
            width={80}
          />
        </div>
        
        <div className="grid gap-4" title={title}>
          <h3 className="text-2xl leading-8 raleway-b home_card-title" title={title}>{title}</h3>
          <p className="home_card-description">{description}</p>
        </div>
      </a>


    </Link>
  );
};

HomeCardItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  urlLink: PropTypes.string.isRequired
};
