import { useRef } from 'react';
import PropTypes from 'prop-types';

const defaultContainerStyles = 'w-full md:w-96';

export const SearchBar = ({ searchText, handleSearch, placeholderText, inputStyles, stylesContainer, isTextarea }) => {

  const searchInputRef = useRef();

  return (
    <div className="flex justify-center">
      <div className={ stylesContainer || defaultContainerStyles}>
        <div className="relative flex items-stretch w-full input-group search_bar">
          { isTextarea ?

            <textarea
              type="search"
              className={`form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-clip-padding transition ease-in-out m-0 focus:outline-none bg-transparent ${ inputStyles }`}
              placeholder={ placeholderText }
              aria-label="Search"
              aria-describedby="button-addon2"
              value={ searchText }
              onChange={ e => handleSearch(e.target.value) }
              ref={ searchInputRef }
            />
            :

            <input
              type="search"
              className={`form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-clip-padding transition ease-in-out m-0 focus:outline-none bg-transparent ${ inputStyles }`}
              placeholder={ placeholderText }
              aria-label="Search"
              aria-describedby="button-addon2"
              value={ searchText }
              onChange={ e => handleSearch(e.target.value) }
              ref={ searchInputRef }
            />
        }
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  placeholderText: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  stylesContainer: PropTypes.string,
  inputStyles: PropTypes.string,
  isTextarea: PropTypes.bool
};
