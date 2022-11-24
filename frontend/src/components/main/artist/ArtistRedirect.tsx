import {FC} from 'react';
import {useParams} from "react-router-dom";
import ArtistAlbums from "./Albums";
import AppearsOn from "./AppearsOn";
import RelatedArtists from "./RelatedArtists";
import Compilations from "./Compilations";
import ArtistSingles from "./Singles";
import PageNotFound from "../../PageNotFound";

type ArtistSubPageType = 'albums' | 'appears-on' | 'compilations' | 'singles' | 'related-artists';

const ArtistSubPage: FC = () => {
  let {id, page} = useParams();

  switch (page as ArtistSubPageType) {
    case 'albums':
      return <ArtistAlbums artistId={id as string}/>;
    case 'appears-on':
      return <AppearsOn artistId={id as string}/>;
    case 'compilations':
      return <Compilations artistId={id as string}/>;
    case 'related-artists':
      return <RelatedArtists artistId={id as string}/>;
    case 'singles':
      return <ArtistSingles artistId={id as string}/>;
    default:
      return <PageNotFound/>;
  }
};

export default ArtistSubPage;
