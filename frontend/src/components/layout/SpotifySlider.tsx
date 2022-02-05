import Slider from "@mui/material/Slider";
import {styled} from "@mui/styles";

const SpotifySlider = styled(Slider)(() => ({
  '&.MuiSlider-root': {
    color: "#9e9e9e",
    padding: "13px 0",
    height: 3,
    '&:hover': {
      color: "#1DB954",
      '& .MuiSlider-thumb': {
        visibility: 'visible',
      }
    }
  },
  "& .MuiSlider-track": {
    height: 2,
  },
  "& .MuiSlider-rail": {
    color: "#cccccc",
    height: 4,
  },
  "& .MuiSlider-active": {},
  "& .MuiSlider-thumb": {
    height: 10,
    width: 10,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    visibility: "hidden",
    "&, &:focus, &:hover, &:active": {
      boxShadow: "#ebebeb 0 1px 1px",
    },
    color: "#fff",
  }
}));

export default SpotifySlider;
