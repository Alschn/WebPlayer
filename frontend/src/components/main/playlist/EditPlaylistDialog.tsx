import {Dialog, DialogContent, DialogTitle, IconButton, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {FC, useState} from "react";
import {SpotifyPlaylistInfo} from "../Playlist";
import {editPlaylist} from "../../../api/spotify_adapter";

interface EditPlaylistDialogProps {
  open: boolean;
  handleClose: () => void;
  forceUpdate: () => void;
  playlistInfo: SpotifyPlaylistInfo;
}

const EditPlaylistDialog: FC<EditPlaylistDialogProps> = ({open, handleClose, playlistInfo, forceUpdate}) => {
  const [playlistTitle, setPlaylistTitle] = useState<string | undefined>(playlistInfo.name);
  const [playlistDesc, setPlaylistDesc] = useState<string | undefined>(playlistInfo.description);

  const submitChanges = (): void => {
    editPlaylist(playlistInfo.id, {
      name: playlistTitle,
      description: playlistDesc,
    }).then(() => {
      forceUpdate();
      handleClose();
    }).catch(err => console.log(err));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="playlist__edit-dialog"
      id="playlist-edit-dialog"
    >
      <DialogTitle>
        Edit details
        <IconButton onClick={handleClose} className="playlist__edit-dialog-close">
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent className="playlist__edit-dialog-content">
        <img src="" alt="" width={200} height={200}/>
        <TextField
          id="playlist__edit-dialog-title"
          variant="outlined"
          value={playlistTitle}
          onChange={(e) => setPlaylistTitle(e.target.value)}
        />

        <TextField
          id="playlist__edit-dialog-desc"
          variant="outlined"
          value={playlistDesc}
          onChange={(e) => setPlaylistDesc(e.target.value)}
        />
        <button onClick={submitChanges} className="playlist__edit-dialog-button">
          Save
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlaylistDialog;
