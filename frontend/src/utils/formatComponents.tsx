import React from "react";
import {Link} from "react-router-dom";
import {SpotifyArtistObject} from "../types/spotify";

export const getArtistsWithLinks = (artists: SpotifyArtistObject[]): JSX.Element[] => {
  return artists.map(({name, id}, index): JSX.Element => {
    let separator: string;
    if (artists.length - 1 === index) separator = "";
    else separator = ", ";
    return <><Link to={`/artists/${id}`} key={name}>{name}</Link>{separator}</>
  });
};

export const getTrackImage = (images: any): string | undefined => {
  if (images.length === 3) return images[2].url;
  return undefined;
}
