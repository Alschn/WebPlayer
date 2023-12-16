import {Grid, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {FC} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getArtistsWithLinks, getTrackImage} from "../../utils/formatComponents";
import {getMsToTime} from "../../utils/dataFormat";
import {SpotifyPlaylistObject, SpotifyPublicUserObject} from "../../types/spotify";
import {getCurrentUserTopArtists, getCurrentUserTopTracks, getUser, getUserPlaylists} from "../../api/spotify";
import useAuth from "../../hooks/useAuth";
import {useQuery} from "@tanstack/react-query";

const Profile: FC = () => {
  const {user} = useAuth();

  let {profile_id} = useParams();
  const profileId = profile_id as string;

  const navigate = useNavigate();

  const {
    data: profileData,
  } = useQuery({
    queryKey: ['user', profileId] as const,
    queryFn: async ({queryKey}) => {
      const res = await getUser(queryKey[1]);
      console.log({profile: res.data});
      return res.data as SpotifyPublicUserObject;
    },
    enabled: profileId !== user?.id,
  });

  const {
    data: playlistsData,
  } = useQuery({
    queryKey: ['user-playlists', profileId] as const,
    queryFn: async ({queryKey}) => {
      const res = await getUserPlaylists(queryKey[1]);
      return res.data as SpotifyPlaylistObject;
    }
  });

  const {
    data: topArtistsData,
  } = useQuery({
    queryKey: ['user-top-artists', profileId] as const,
    queryFn: async ({queryKey}) => {
      const res = await getCurrentUserTopArtists(queryKey[1]);
      return res.data;
    },
    enabled: profileId === user?.id,
  });

  const {
    data: topTracksData,
  } = useQuery({
    queryKey: ['user-top-tracks', profileId] as const,
    queryFn: async ({queryKey}) => {
      const res = await getCurrentUserTopTracks(queryKey[1]);
      return res.data;
    },
    enabled: profileId === user?.id,
  });

  const getUsername = () => {
    if (profileId === user?.id) return user?.display_name;
    return profileData?.display_name;
  };

  const getUserFollowers = () => {
    if (profileId === user?.id) return user?.followers.total;
    return profileData?.followers?.total;
  };

  const getUserImage = (): string | undefined => {
    if (profileId === user?.id) return user?.images[0]?.url;
    return profileData?.images[0]?.url;
  };

  const goToPlaylist = (playlist_id: string) => navigate(`/playlists/${playlist_id}`);

  const goToArtist = (artist_id: string) => navigate(`/artists/${artist_id}`);

  const getImageOrUndefined = (images: any[]) => {
    return images[0]?.url;
  };

  const renderMostPopularArtists = () => (
    <Grid container className="profile__popular_artists">
      <Grid item xs={12}>
        <h2>The most popular artists this month</h2>
        <p>Visible only for you</p>
      </Grid>
      {topArtistsData?.map(({id: artist_id, name, images}) => (
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
            {topTracksData?.items?.map(
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
          <p>{playlistsData?.followers.total} public playlists · {getUserFollowers()} followers</p>
        </Grid>
      </Grid>

      {/* Render if user accesses their own profile */}
      {profileId === user?.id && (
        <>
          {renderMostPopularArtists()}
          {renderMostPopularTracks()}
        </>
      )}

      <Grid container className="profile__public_playlists">
        {playlistsData?.tracks?.map(({name, images, id: playlist_id}) => (
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
