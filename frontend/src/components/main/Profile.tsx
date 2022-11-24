import {Grid, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {FC, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getArtistsWithLinks, getTrackImage} from "../../utils/formatComponents";
import {getMsToTime} from "../../utils/dataFormat";
import {
  SpotifyArtistObject,
  SpotifyPlaylistObject,
  SpotifyPublicUserObject,
  SpotifyTrackObject
} from "../../types/spotify";
import AxiosClient from "../../utils/axiosClient";
import useUserData from "../../hooks/useUserData";

const Profile: FC = () => {
  // url parameter - user id
  let {id: url_id} = useParams();

  const navigate = useNavigate();

  const {username, imageURL: image_url, id, followers} = useUserData();

  const [profileInfo, setProfileInfo] = useState<SpotifyPublicUserObject | undefined>(undefined);

  const [totalPlaylists, setTotalPlaylists] = useState<number | null>(null);
  const [publicPlaylists, setPublicPlaylists] = useState<SpotifyPlaylistObject[]>([]);

  const [topTracks, setTopTracks] = useState<SpotifyTrackObject[]>([]);
  const [topArtists, setTopArtists] = useState<SpotifyArtistObject[]>([]);

  useEffect(() => {
    // fetch profile info if visiting other user's profile
    if (url_id !== id) {
      AxiosClient.get(`/spotify/users/${url_id as string}`)
        .then(res => {
          const {data} = res;
          setProfileInfo(data);
        }).catch(err => console.log(err));
    }

    // fetch 6 public playlists
    AxiosClient.get(`/spotify/users/${url_id as string}/playlists`)
      .then(res => {
        const {data: {items, total}} = res;
        setTotalPlaylists(total);
        setPublicPlaylists(items);
      }).catch(err => console.log(err));

    // clear public playlist when switching to different profile
    return () => setPublicPlaylists([]);
  }, []);

  useEffect(() => {
    if (url_id === id) {
      // fetch 6 top artists
      AxiosClient.get('/spotify/top/artists?limit=6')
        .then(res => {
          const {data: {items}} = res;
          setTopArtists([...items]);
        }).catch(err => console.log(err));

      // fetch 4 top tracks
      AxiosClient.get('/spotify/top/tracks?limit=4')
        .then(res => {
          const {data: {items}} = res;
          setTopTracks([...items]);
        }).catch(err => console.log(err));
      console.log(topTracks);
    }
  }, []);

  const getUsername = (): string | undefined => {
    if (url_id === id) return username;
    else try {
      return profileInfo?.display_name;
    } catch {
      return undefined;
    }
  };

  const getUserFollowers = (): number | undefined => {
    if (url_id === id) return followers;
    else try {
      return profileInfo?.followers?.total;
    } catch {
      return undefined;
    }
  };

  const getUserImage = (): string | undefined => {
    if (url_id === id) return image_url;
    else try {
      return profileInfo?.images[0].url;
    } catch {
      return undefined;
    }
  };

  const goToPlaylist = (playlist_id: string) => navigate(`/playlists/${playlist_id}`);

  const goToArtist = (artist_id: string) => navigate(`/artists/${artist_id}`);

  const getImageOrUndefined = (images: any[]) => {
    try {
      return images[0].url;
    } catch {
      return undefined;
    }
  };

  const renderMostPopularArtists = () => (
    <Grid container className="profile__popular_artists">
      <Grid item xs={12}>
        <h2>The most popular artists this month</h2>
        <p>Visible only for you</p>
      </Grid>
      {topArtists && topArtists.map(({id: artist_id, name, images}) => (
        <Grid item xs={2} container>
          <div
            className="profile__popular_artists-artist"
            onClick={() => goToArtist(artist_id)}
          >
            <Grid item xs={12} className="profile__popular_artists-artist-image">
              <img src={getImageOrUndefined(images)} alt=""/>
            </Grid>

            <Grid item xs={12} className="profile__popular_artists-artist-name">
              <p className="text">{name}</p>
            </Grid>

            <Grid item xs={12} className="profile__popular_artists-artist-desc">
              <p className="text">Artist</p>
            </Grid>
          </div>
        </Grid>
      ))}
    </Grid>
  );

  const renderMostPopularTracks = () => (
    <Grid container className="profile__tracks">
      <Grid item xs={12}>
        <h2>The most popular tracks this month</h2>
        <p>Visible only for you</p>
      </Grid>
      <TableContainer>
        <Table aria-label="most-popular-tracks-table" size="small">
          <TableBody>
            {topTracks.length > 0 && topTracks.map(
              ({artists, duration_ms, name, explicit, album}, index) => (
                <TableRow key={`track-${index}`} className="playlist__track-row">
                  <TableCell component="th" scope="row">{index + 1}</TableCell>
                  <TableCell align="left">
                    <Grid container alignItems="center">
                      <Grid item className="playlist__track-image">
                        <img src={getTrackImage(album.images)} width={40} height={40} alt=""/>
                      </Grid>
                      <Grid item>
                        <Grid item className="playlist__track-title">
                          <span>{name}</span>
                        </Grid>
                        <Grid item className="playlist__track-artists">
                          {getArtistsWithLinks(artists)}
                        </Grid>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell align="left"><Link to={`/albums/`}>{album.name}</Link></TableCell>
                  <TableCell align="left">{getMsToTime(duration_ms, true)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );

  return (
    <Grid container className="profile">
      <Grid container className="profile__header" alignItems="flex-end">
        <Grid item className="profile__info-left">
          <img src={getUserImage()} alt="profile-img" width={250} height={250}/>
        </Grid>

        <Grid item className="profile__info-right">
          <h4>PROFILE</h4>
          <h1>{getUsername()}</h1>
          <p>{totalPlaylists} public playlists · {getUserFollowers()} followers</p>
        </Grid>
      </Grid>

      {/* Render if user accesses their own profile */}
      {url_id === id && (
        <>
          {renderMostPopularArtists()}
          {renderMostPopularTracks()}
        </>
      )}

      <Grid container className="profile__public_playlists">
        {publicPlaylists.length > 0 && publicPlaylists.map(({name, images, id: playlist_id}) => (
          <Grid item xs={2} container>
            <div
              className="profile__public_playlists-playlist"
              onClick={() => goToPlaylist(playlist_id)}
            >
              <Grid item xs={12} className="profile__public_playlists-playlist-image">
                <img src={getImageOrUndefined(images)} alt="" height={200} width={200}/>
              </Grid>

              <Grid item xs={12} className="profile__public_playlists-playlist-title">
                <p className="text">{name}</p>
              </Grid>
            </div>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Profile;
