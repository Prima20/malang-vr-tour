// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface} from 'react-360-web';
import CustomRaycaster from "./custom-raycaster";

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  RightSurface = new Surface(600, 600, Surface.SurfaceShape.Flat);
  RightSurface.setAngle(0.8, 0);

  LeftSurface = new Surface(1000, 600, Surface.SurfaceShape.Flat);
  LeftSurface.setAngle(-0.8, 0);

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('InfoMenu', { /* initial props */ }),
      RightSurface
  );

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
      r360.createRoot('ViewMenu', { /* initial props */ }),
      LeftSurface
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('candi_badut.jpg'));
  //Add raycaster
  r360.controls.clearRaycasters();
  r360.controls.addRaycaster(CustomRaycaster);
}

window.React360 = {init};
