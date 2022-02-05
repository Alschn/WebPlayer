import {FC} from 'react';
import {useParams} from "react-router-dom";
import ArtistAlbums from "./Albums";
import AppearsOn from "./AppearsOn";
import RelatedArtists from "./RelatedArtists";
import Compilations from "./Compilations";
import ArtistSingles from "./Singles";
import PageNotFound from "../../PageNotFound";

type ArtistSubPageType = 'albums' | 'appears-on' | 'compilations' | 'singles' | 'related-artists';

interface Parameters {
  id: string,
  page: ArtistSubPageType;
}

const ArtistSubPage: FC = () => {
  let {id, page} = useParams<Parameters>();

  switch (page) {
    case 'albums':
      return <ArtistAlbums artistId={id}/>;
    case 'appears-on':
      return <AppearsOn artistId={id}/>;
    case 'compilations':
      return <Compilations artistId={id}/>;
    case 'related-artists':
      return <RelatedArtists artistId={id}/>;
    case 'singles':
      return <ArtistSingles artistId={id}/>;
    default:
      return <PageNotFound/>;
  }
};

export default ArtistSubPage;
