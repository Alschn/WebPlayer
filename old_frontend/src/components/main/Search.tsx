import {type ChangeEvent, type FC, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import {useDebounce} from "../../hooks/useDebounce";

export const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedQuery = useDebounce(searchQuery, 500);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const submitInput = () => {
    // call to api
  };

  return (
    <div className="header__search-wrapper">
      <div className="header__search">
        <SearchIcon color="primary" className="header_search-icon" onClick={submitInput}/>
        <input
          type="search"
          placeholder="Artists, tracks or podcasts"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

const Search: FC = () => {
  return (
    <div>
      <div className="search__recent">
        <h1>Your last searches</h1>
      </div>

      <div className="search__favourites">
        <h1>Your favourite genres</h1>
      </div>

      <div className="search__browse-all">
        <h1>Browse all categories</h1>
      </div>
    </div>
  );
};

export default Search;
