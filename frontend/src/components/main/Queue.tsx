import {Grid} from "@material-ui/core";
import React, {FC} from "react";

const Queue: FC = () => {
  return (
    <Grid container className="queue">
      <Grid item xs={12}>
        <h2>Queue</h2>
      </Grid>

      <Grid item xs={12}>
        <h3>Now playing</h3>
        {/* current track */}
      </Grid>

      <Grid item xs={12} container className="queue__tracks">
        <h3>Next</h3>
        {/* tracks */}
      </Grid>
    </Grid>
  )
};

export default Queue;
