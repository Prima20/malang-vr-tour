import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  position: absolute;
  width: ${props => (props.viewerWidth ? props.viewerWidth : "")};
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
`;

const Divider = styled.div`
  height: 100%;
  width: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin-left: -1px;
`;

const Viewer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const VRContainer = ({ children, divider, viewerWidth }) => {
  return (
    <Wrapper viewerWidth={viewerWidth}>
      <Viewer>
        {React.cloneElement(children, {
          className: "left"
        })}
      </Viewer>
      {divider && <Divider className="divider"></Divider>}
      <Viewer>
        {React.cloneElement(children, {
          className: "right"
        })}
      </Viewer>
    </Wrapper>
  );
};
