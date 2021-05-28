import React, {FC, useEffect} from "react";
import {useParams} from "react-router-dom";

interface Parameters {
  id: string,
}

const Artist: FC = () => {
  // url parameter
  let {id} = useParams<Parameters>();

  useEffect(() => {
    // fetch artist
  }, [])

  return (
    <div className="artist__root">
      <h1>Artist with id {id}</h1>
      <div className="artist__header">

      </div>

      <div className="artist__popular">

      </div>
    </div>
  );
};

export default Artist;
