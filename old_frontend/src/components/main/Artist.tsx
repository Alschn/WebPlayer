import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SpotifyAlbumObject, SpotifyArtistObject, SpotifyTrackObject} from "../../types/spotify";
import {Button, capitalize, Grid, IconButton} from "@mui/material";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SpotifyArtistTable from "../layout/SpotifyArtistTable";
import {usePlaybackState} from "react-spotify-web-playback-sdk";
import {getYearFromDate} from "../../utils/dataFormat";
import {useQuery} from "@tanstack/react-query";
import {getArtist, getArtistAlbums, getArtistRelatedArtists, getArtistTopTracks} from "../../api/spotify";


const Artist: FC = () => {
  let {artist_id} = useParams();
  const artistId = artist_id as string;

  const navigate = useNavigate();

  const playbackState = usePlaybackState();

  const [artistInfo, setArtistInfo] = useState<SpotifyArtistObject | null>(null);
  const [artistTracks, setArtistTracks] = useState<SpotifyTrackObject[]>([]);
  const [artistAlbums, setArtistAlbums] = useState<SpotifyAlbumObject[]>([]);
  const [artistRelated, setArtistRelated] = useState<SpotifyArtistObject[]>([]);

  // to do:
  // either increase item count so that there are things to filter from
  // or send individual requests to get different types of data

  const [tracksDisplayCount, setTracksDisplayCount] = useState<number>(5);
  const [artistIsPlayed, setArtistIsPlayed] = useState<boolean>(false);

  const [artistIsFollowed, setArtistIsFollowed] = useState<boolean>(false);

  const {
    data: artistData
  } = useQuery({
    queryKey: ['artist', artistId] as const,
    queryFn: async ({queryKey}) => {
      const res = await getArtist(queryKey[1]);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: tracksData
  } = useQuery({
    queryKey: ['artist', artistId, 'top-tracks'],
    queryFn: async ({queryKey}) => {
      const res = await getArtistTopTracks(queryKey[1]);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: albumsData
  } = useQuery({
    queryKey: ['artist', artistId, 'albums'],
    queryFn: async ({queryKey}) => {
      const res = await getArtistAlbums(queryKey[1]);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: relatedArtistsData
  } = useQuery({
    queryKey: ['artist', artistId, 'related-artists'],
    queryFn: async ({queryKey}) => {
      const res = await getArtistRelatedArtists(queryKey[1]);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const handleGoToRoute = (route: string) => navigate(route);

  const handlePlayRandomArtistTrack = () => {
    alert('todo: handlePlayRandomArtistTrack');
  };

  const handleFollowArtist = () => {
    alert('todo: handleFollowArtist');
  };

  const handleMoreButton = () => {
    alert('todo: handleMoreButton');
  };

  const handleChangeCount = () => {
    tracksDisplayCount === 5 ? setTracksDisplayCount(10) : setTracksDisplayCount(5);
  };

  const getTracks = () => {
    if (tracksDisplayCount === 10) return artistTracks;
    else return artistTracks.filter((item, index) => index < 5);
  };

  useEffect(() => {
    if (!playbackState) setArtistIsPlayed(false);
    else if (!playbackState.paused) setArtistIsPlayed(false);
    else if (!playbackState?.context) setArtistIsPlayed(false);
    else setArtistIsPlayed(Boolean(playbackState.context.uri?.includes(artistId)));
  }, [playbackState, artistId]);

  return (
    <div className="artist">
      <Grid container className="artist__header" alignItems="flex-end">
        <Grid item className="artist__header-left">
          <img src={artistInfo?.images[0].url} alt=""/>
        </Grid>

        <Grid item className="artist__header-right">
          <h1 className="artist__header-name">{artistInfo?.name}</h1>
          <p>Followers: {artistInfo?.followers?.total}</p>
        </Grid>
      </Grid>

      <Grid container className="artist__buttons">
        <IconButton className="button-big-play" onClick={handlePlayRandomArtistTrack}>
          {artistIsPlayed ? (
            <PauseCircleFilledIcon className="big-play-icon"/>
          ) : (
            <PlayCircleFilledIcon className="big-play-icon"/>
          )}
        </IconButton>

        <Button className="button-follow" onClick={handleFollowArtist}>
          {artistIsFollowed ? 'Following' : 'Follow'}
        </Button>

        <IconButton className="button-more_horiz" onClick={handleMoreButton}>
          <MoreHorizIcon/>
        </IconButton>
      </Grid>

      <div className="artist__popular">
        <h2>Popular</h2>
        {artistTracks.length > 0 && (<SpotifyArtistTable tracks={getTracks()}/>)}

        <p className="toggle-show" onClick={handleChangeCount}>
          {tracksDisplayCount === 5 ? 'Show more' : 'Show less'}
        </p>
      </div>

      <div className="artist__popular_releases">
        <h2>Popular releases</h2>
        <Grid container>
          {artistAlbums.length > 0 && artistAlbums.filter(
            (_, idx) => idx < 6).map(
            ({album_group, images, name, release_date, id: album_id}, idx) => (
              <Grid item xs={2} className="card-item" onClick={() => handleGoToRoute(`/albums/${album_id}`)}>
                <img src={images[0]?.url} alt="" width={200} height={200}/>
                <h3 className="release-title">{name}</h3>
                <p
                  className="release-desc">
                  {(new Date().getFullYear() !== getYearFromDate(release_date) || idx !== 0)
                    ? getYearFromDate(release_date) : 'Latest release'} · {capitalize(album_group)}
                </p>
              </Grid>
            ))}
        </Grid>
      </div>

      <div className="artist__albums">
        <Grid container>
          <Grid item xs={6}>
            <h2>Albums</h2>
          </Grid>

          <Grid item xs={6} className="show-all">
            <a href={`/artists/${artistId}/albums`}>Show discography</a>
          </Grid>
        </Grid>

        <Grid container>
          {artistAlbums.length > 0 && artistAlbums.filter(
            (album) => album.album_type === 'album').filter(
            (_, idx) => idx < 6).map(
            ({name, images, release_date, album_type, id: album_id}, idx) => (
              <Grid item xs={2} className="card-item" onClick={() => handleGoToRoute(`/albums/${album_id}`)}>
                <img src={images[0]?.url} alt="" width={200} height={200}/>
                <h3 className="release-title">{name}</h3>
                <p className="release-desc">{getYearFromDate(release_date)} · {capitalize(album_type)}</p>
              </Grid>
            ))}
        </Grid>
      </div>

      <div className="artist__singles">
        <Grid container>
          <Grid item xs={6}>
            <h2>Singles and minialbums</h2>
          </Grid>

          <Grid item xs={6} className="show-all">
            <a href={`/artists/${artistId}/singles`}>Show discography</a>
          </Grid>
        </Grid>

        <Grid container>
          {artistAlbums?.filter(
            (album) => album.album_type === 'single').filter(
            (_, idx) => idx < 6).map(
            (album, idx) => (
              <Grid item xs={2} className="card-item" onClick={() => handleGoToRoute(`/albums/${album.id}`)}>
                <img
                  src={album.images[0]?.url}
                  alt=""
                  width={200}
                  height={200}
                />
                <h3 className="release-title">{album.name}</h3>
                <p className="release-desc">{getYearFromDate(album.release_date)} · Album</p>
              </Grid>
            ))}
        </Grid>
      </div>

      <div className="artist__included">
        <Grid container>
          <Grid item xs={6}>
            <h2>Playlists including artist: {artistInfo?.name}</h2>
          </Grid>

          <Grid item xs={6} className="show-all">
            <a href={`/artists/${artistId}/compilations`}>Show all</a>
          </Grid>
        </Grid>

        <Grid container>
          {artistAlbums?.filter(
            (album) => album.album_type === 'compilation').filter(
            (_, idx) => idx < 6).map(
            ({name, images, release_date, id: album_id}, idx) => (
              <Grid item xs={2} className="card-item" onClick={() => handleGoToRoute(`/albums/${album_id}`)}>
                <img
                  src={images[0]?.url}
                  alt=""
                  width={200}
                  height={200}
                />
                <h3 className="release-title">{name}</h3>
                <p className="release-desc">{getYearFromDate(release_date)} · Album</p>
              </Grid>
            ))}
        </Grid>
      </div>

      <div className="artist__related">
        <Grid container>
          <Grid item xs={6}>
            <h2>Fans also like</h2>
          </Grid>

          <Grid item xs={6} className="show-all">
            <a href={`/artists/${artistId}/related-artists`}>Show all</a>
          </Grid>
        </Grid>

        <Grid container>
          {artistRelated?.filter(
            (_, idx) => idx < 6).map(
            ({name, type, images, id: artist_id}) => (
              <Grid item xs={2} className="card-item" onClick={() => handleGoToRoute(`/artists/${artist_id}`)}>
                <img
                  src={images[0]?.url}
                  alt={""}
                  width={200}
                  height={200}
                />
                <h3>{name}</h3>
                <p>{capitalize(type)}</p>
              </Grid>
            ))}
        </Grid>
      </div>

      <div className="artist__appears_on">
        <Grid container>
          <Grid item xs={6}>
            <h2>Appears on</h2>
          </Grid>

          <Grid item xs={6} className="show-all">
            <a href={`/artists/${artistId}/appears-on`}>Show all</a>
          </Grid>
        </Grid>

        <Grid container>
          {artistAlbums?.filter(
            (album) => album.album_group === 'appears_on').filter(
            (_, idx) => idx < 6).map(
            ({name, images, release_date, type, id: album_id}, idx) => (
              <Grid item xs={2} className="card-item" onClick={() => handleGoToRoute(`/albums/${album_id}`)}>
                <img
                  src={images[0]?.url}
                  alt=""
                  width={200}
                  height={200}
                />
                <h3 className="release-title">{name}</h3>
                <p className="release-desc">{getYearFromDate(release_date)} · {capitalize(type)}</p>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Artist;
