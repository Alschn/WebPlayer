"use server";

import { redirect } from "next/navigation";
import { axiosClient } from "~/api/AxiosClient";

interface CreatePlaylistResponse {
  id: string;
}

export async function createPlaylist(userId: string, _formData: FormData) {
  try {
    const res = await axiosClient.post<CreatePlaylistResponse>(
      `/api/spotify/users/${userId}/playlists/`,
      {
        name: "New Playlist",
        description: `Playlist by user ${userId}`,
      },
    );
    const playlistId = res.data.id;
    redirect(`/playlists/${playlistId}`);
  } catch (err) {
    // todo: handle error in server action
    console.log(err);
    return { error: "" };
  }
}
