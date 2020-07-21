// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface, Module} from 'react-360-web';


function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules : [
      new MainMenuModule(),
      new InfoMenuModule(),
      new PhotoGalleryModule()
    ],
    ...options,
  });

  MiddleSurface = new Surface(900, 600, Surface.SurfaceShape.Flat);
  MiddleSurface.setAngle(0,-0.1);

  RightSurface = new Surface(100, 100, Surface.SurfaceShape.Flat);
  RightSurface.setAngle(0.8, 0);

  LeftSurface = new Surface(100, 100, Surface.SurfaceShape.Flat);
  LeftSurface.setAngle(-0.8, 0);

  introRoot = r360.renderToSurface(
      r360.createRoot('MainMenu', { /* initial props */ }),
      MiddleSurface
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('ijen-boulevard-1 1.jpg'));
  //Add raycaster
}

class MainMenuModule extends Module{
  constructor() {
    super('MainMenuModule');
  }

  start(){
    r360.detachRoot(infoRoot);
    r360.detachRoot(galleryRoot);
    introRoot = r360.renderToSurface(
      r360.createRoot('MainMenu', { /* initial props */ }),
      MiddleSurface
  );
  r360.compositor.setBackground(r360.getAssetURL('ijen-boulevard-1 1.jpg'));
  }
}

class InfoMenuModule extends Module{

  constructor() {
    super('InfoMenuModule');
  }

  setParams(placeName, overview){
    this.placeName = placeName
    this.overview = overview
  }

  resizePanel(width,height){
    RightSurface.resize(width,height)
  }

  setBackground(assetPath){
    r360.compositor.setBackground(r360.getAssetURL(assetPath));
  }

  start(){
    // Render your app content to the default cylinder surface
    infoRoot = r360.renderToSurface(
        r360.createRoot('InfoMenu', {placeName: this.placeName, overview: this.overview}),
        RightSurface
    );
  }
}

class PhotoGalleryModule extends Module{
  constructor() {
    super('PhotoGalleryModule');
  }

  setParams(gallery){
    this.gallery = gallery;
  }

  resizePanel(width,height){
    LeftSurface.resize(width,height)
  }

  start(){
    galleryRoot = r360.renderToSurface(
        r360.createRoot('PhotoGallery', {gallery: this.gallery}),
        LeftSurface
    );

    r360.detachRoot(introRoot);
  }
}

window.React360 = {init};
