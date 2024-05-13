import React from 'react';
import './index.css';


const SearchBar = ({ onSearchChange }) => {
  const searchText = 'Type here to search';

  return (
    <div className='app-search-panel'>
      <input
        placeholder={searchText}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;


