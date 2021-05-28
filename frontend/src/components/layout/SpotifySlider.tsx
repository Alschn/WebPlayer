import {withStyles} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";

const SpotifySlider = withStyles({
  root: {
    color: "#9e9e9e",
    padding: "13px 0",
    height: 3,
    '&:hover': {
      color: "#1DB954",
      '& .MuiSlider-thumb': {
        visibility: 'visible',
      }
    },
  },
  track: {
    height: 4,
  },
  rail: {
    color: "#cccccc",
    height: 4,
  },
  active: {},
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -6,
    marginLeft: -6,
    visibility: "hidden",
    boxShadow: "#ebebeb 0 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0 2px 3px 1px",
    },
    color: "#fff",
  },
})(Slider);

export default SpotifySlider;
