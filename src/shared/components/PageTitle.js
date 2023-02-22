import PropTypes from 'prop-types';

export const PageTitle = ({title, stylesClass}) => {
  return (
    <h2 className={`page__title ${stylesClass}`} >{title}</h2>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  stylesClass: PropTypes.string.isRequired
};