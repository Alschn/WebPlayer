import {FC} from 'react';
import {useParams} from "react-router-dom";
import ArtistAlbums from "./Albums";
import AppearsOn from "./AppearsOn";
import RelatedArtists from "./RelatedArtists";
import Compilations from "./Compilations";
import ArtistSingles from "./Singles";
import PageNotFound from "../../PageNotFound";

const ArtistSubPages = {
  ALBUMS: 'albums',
  APPEARS_ON: 'appears-on',
  COMPILATIONS: 'compilations',
  RELATED_ARTISTS: 'related-artists',
  SINGLES: 'singles'
} as const;

type ArtistSubPage = typeof ArtistSubPages[keyof typeof ArtistSubPages];

const ArtistSubPage: FC = () => {
  let {artist_id, page} = useParams();

  const subpage = page as ArtistSubPage;
  const artistId = artist_id as string;

  switch (subpage) {
    case ArtistSubPages.ALBUMS:
      return <ArtistAlbums artistId={artistId}/>;

    case ArtistSubPages.APPEARS_ON:
      return <AppearsOn artistId={artistId}/>;

    case ArtistSubPages.COMPILATIONS:
      return <Compilations artistId={artistId}/>;

    case ArtistSubPages.RELATED_ARTISTS:
      return <RelatedArtists artistId={artistId}/>;

    case ArtistSubPages.SINGLES:
      return <ArtistSingles artistId={artistId}/>;

    default:
      return <PageNotFound/>;
  }
};

export default ArtistSubPage;
