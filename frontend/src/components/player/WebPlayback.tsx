import React, {FC, ReactNode} from "react";

interface WebPlaybackProps {
  children: ReactNode;
}

const WebPlayback: FC<WebPlaybackProps> = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
};

export default WebPlayback;
