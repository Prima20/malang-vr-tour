import React from "react";
import styled from "styled-components";
import MdExpand from "ionicons/dist/ionicons/svg/md-expand.svg";
import MdContract from "ionicons/dist/ionicons/svg/md-contract.svg";
import NoSleep from "nosleep.js";
const noSleep = new NoSleep();

const FSButton = styled.button`
  font-size: 24px;
  background: transparent;
  border: none;
  outline: none;
  z-index: 10000;
  position: relative;
`;

export const FullScreenToggle = ({
  onEnter,
  onExit,
  lockOrientation = true,
  preventSleep = true
}) => {
  let [isFullScreen, setFullScreen] = React.useState(
    document.webkitIsFullScreen
  );

  const toggleFullScreen = () => {
    if (isFullScreen) {
      setFullScreen(false);
      document.webkitExitFullscreen();
      screen.orientation.unlock();
      noSleep.disable();
      onExit && onExit();
    } else {
      setFullScreen(true);
      document.documentElement.webkitRequestFullScreen();
      lockOrientation && screen.orientation.lock("landscape");
      preventSleep && noSleep.enable();
      onEnter && onEnter();
    }
  };

  return (
    <FSButton
      onClick={toggleFullScreen}
      title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      <img src={isFullScreen ? MdContract : MdExpand} width="24" />
    </FSButton>
  );
};
