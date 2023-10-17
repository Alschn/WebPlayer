import {PureComponent} from "react";
import {Box, Typography} from "@mui/material";

class PageNotFound extends PureComponent<any, any> {
  render() {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor={"#191414"}
      >
        <Typography variant="h2" color="white">
          Page not found
        </Typography>
      </Box>
    );
  }
}

export default PageNotFound;
