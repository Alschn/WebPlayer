import React, {FC, useEffect} from "react";
import {useParams} from "react-router-dom";

interface Parameters {
  id: string,
}

const Album: FC = () => {
  // url parameter
  let {id} = useParams<Parameters>();

  useEffect(() => {
    // fetch album
  }, [])

  return (
    <div>
      <h1>Album</h1>
    </div>
  );
};

export default Album;
