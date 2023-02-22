import PropTypes from 'prop-types';

export const PageDescription = ({children, title, stylesClass}) => {
  return (
    <p className={stylesClass}>{children || title}</p>
  );
};

PageDescription.propTypes = {
  title: PropTypes.string.isRequired,
  stylesClass: PropTypes.string.isRequired
};