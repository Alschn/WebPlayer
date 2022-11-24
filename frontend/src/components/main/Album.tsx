import {FC, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {SpotifySimplifiedTrackObject} from "../../types/spotify";
import {Grid} from "@mui/material";
import {getPlaylistLength} from "../../utils/dataFormat";
import SpotifyTable from "../layout/SpotifyTable";
import AxiosClient from "../../api/AxiosClient";


const Album: FC = () => {
  const {id} = useParams();
  const [tracks, setTracks] = useState<SpotifySimplifiedTrackObject[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [albumInfo, setAlbumInfo] = useState<any>({});
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    AxiosClient.get(`/spotify/albums/${id as string}`).then(res => {
      console.log(res.data);
      const {data: {artists, tracks: {items, next}, ...rest}} = res;
      setArtists(artists);
      setTracks(items);
      setNext(next);
      setAlbumInfo(rest);
    }).catch(
      err => console.log(err)
    );
  }, [id]);

  const getAuthor = (): string | undefined => {
    try {
      return artists[0].name;
    } catch {
      return undefined;
    }
  };

  const getAlbumCover = (): string | undefined => {
    try {
      return albumInfo.images[0].url;
    } catch {
      return undefined;
    }
  };

  const loadMoreTracks = () => {
  };

  return (
    <div className="playlist__root">
      {albumInfo && tracks && <Grid container alignItems="flex-end">
        <Grid item className="playlist__info-left">
          <img src={getAlbumCover()} alt="playlist-img" width={300} height={300}/>
        </Grid>

        <Grid item className="playlist__info-right">
          <h4>ALBUM</h4>
          <h1 id="album-title">{albumInfo.name}</h1>
          <p className="playlist__info-right__stats">
            <Link to="/">{getAuthor()}</Link> · {albumInfo.total_tracks} tracks, {getPlaylistLength(tracks)}
          </p>
        </Grid>
      </Grid>}

      <Grid item xs={12} className="playlist__tracks">
        <SpotifyTable
          tableType="album"
          tracks={tracks}
          next={next}
          loadMore={loadMoreTracks}
        />
      </Grid>
    </div>
  );
};

export default Album;
