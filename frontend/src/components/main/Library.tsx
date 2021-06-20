import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import Albums from './library/Albums';
import Podcasts from "./library/Podcasts";
import Artists from "./library/Artists";
import Playlists from "./library/Playlists";
import PageNotFound from "../PageNotFound";

interface Parameters {
  subpage: string;
}

const Library: FC = () => {
  let {subpage} = useParams<Parameters>();

  switch (subpage) {
    case 'playlists':
      return <Playlists/>;
    case 'podcasts':
      return <Podcasts/>;
    case 'artists':
      return <Artists/>;
    case 'albums':
      return <Albums/>;
    default:
      return <PageNotFound/>;
  }
};

export default Library;
