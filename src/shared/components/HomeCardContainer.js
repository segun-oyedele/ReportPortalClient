import PropTypes from 'prop-types';
import { HomeCardItem } from './';

export const HomeCardContainer = ({ items }) => {
  return (

    <div className="container grid grid-cols-[repeat(auto-fit,_minmax(280px,_374px))] items-center justify-center gap-6 h-fit xl:justify-center grid__reports home__cards-containers">
      {
        items.map((item, index) => (
          <HomeCardItem
            key={item.title}
            index={index}
            { ...item }
          />
        ))
      }
    </div>
  );
};

HomeCardContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(
    { 
      title: PropTypes.string.isRequired, 
      description: PropTypes.string.isRequired 
    }
  )).isRequired
};
