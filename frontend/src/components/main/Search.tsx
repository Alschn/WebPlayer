import React, {FC} from "react";

const Search:FC = () => {
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
  )
};

export default Search;
