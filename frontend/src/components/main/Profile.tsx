import {Grid, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import React, {FC, useContext, useEffect, useState} from "react";
import UserContext from "../../context/userContext";
import {Link, useParams} from "react-router-dom";
import {getArtistsWithLinks, getTrackImage} from "../../utils/formatComponents";
import {getMsToTime} from "../../utils/dataFormat";
import {SpotifyArtistObject} from "../../types/spotify";

interface Parameters {
  id: string;
}

interface ProfileInfo {
  username: string | undefined,
  imageURL: string | undefined,
  followers: number,

}

interface SpotifyTrack {
  track: any, // to be replaced
}

interface SpotifyPlaylist {
  //
}

const Profile: FC = () => {
  // url parameter
  let {id: url_id} = useParams<Parameters>();

  const {username, imageURL: image_url, id, followers} = useContext(UserContext);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>();
  const [publicPlaylists, setPublicPlaylists] = useState<SpotifyPlaylist[]>();

  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>();
  const [topArtists, setTopArtists] = useState<SpotifyArtistObject[]>();

  useEffect(() => {
    // fetch profile info
    // fetch 6 public playlists
  }, [])

  useEffect(() => {
    if (url_id === id) {
      // fetch 6 top artists
      // fetch 4 top tracks
    }
  }, [id, url_id])

  const getUsername = (): string | undefined => {
    if (url_id === id) return username
    else try {
      return profileInfo?.username;
    } catch {
      return undefined;
    }
  }

  const getUserFollowers = (): number | undefined => {
    if (url_id === id) return followers
    else try {
      return profileInfo?.followers;
    } catch {
      return undefined;
    }
  }

  const getUserImage = (): string | undefined => {
    if (url_id === id) return image_url
    else try {
      return profileInfo?.imageURL;
    } catch {
      return undefined;
    }
  }

  const renderMostPopularArtists = () => (
    <Grid container className="profile__popular_artists">
      {topArtists && topArtists.map((artist) => (
        <Grid item xs={2}>

        </Grid>
      ))}
    </Grid>
  )

  const renderMostPopularTracks = () => (
    <Grid container className="profile__tracks">
      <TableContainer>
        <Table aria-label="most-popular-tracks-table" size="small">
          <TableBody>
            {topTracks && topTracks.map(
              (
                {
                  track: {
                    track_number, name, duration_ms, album: {
                      name: album_name,
                      id: album_id, images
                    }, artists
                  }
                },
                index
              ) => (
                <TableRow key={`track-${index}`} className="playlist__track-row">
                  <TableCell component="th" scope="row">{index + 1}</TableCell>
                  <TableCell align="left">
                    <Grid container alignItems="center">
                      <Grid item className="playlist__track-image">
                        <img src={getTrackImage(images)} width={40} height={40} alt=""/>
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
                  <TableCell align="left"><Link to={`/albums/${album_id}`}>{album_name}</Link></TableCell>
                  <TableCell align="left">{getMsToTime(duration_ms, true)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )

  return (
    <Grid container className="profile__root">
      <Grid container className="profile__header" alignItems="flex-end">
        <Grid item className="profile__info-left">
          <img src={getUserImage()} alt="profile-img" width={250} height={250}/>
        </Grid>

        <Grid item className="profile__info-right">
          <h4>PROFILE</h4>
          <h1>{getUsername()}</h1>
          <p>X public playlists · {getUserFollowers()} followers</p>
        </Grid>
      </Grid>

      {/*{url_id === id && <>*/}
      {/*  {renderMostPopularArtists()}*/}
      {/*  {renderMostPopularTracks()}*/}
      {/*</>*/}
      {/*}*/}

      <Grid container className="profile__public_playlists">

      </Grid>
    </Grid>
  )
};

export default Profile;
