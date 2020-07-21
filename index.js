import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  asset,
  VrButton,
  Image,
  View,
    NativeModules
} from 'react-360';
import {InfoMenu} from "./scene/InfoMenu";
import {PhotoGallery} from "./scene/PhotoGallery";
import {contentData} from "./data/contentData";

const surfaceModule = [NativeModules.InfoMenuModule, NativeModules.PhotoGalleryModule];

const items = [];
export default class MainMenu extends React.Component {

  constructor(){
    super()
    this.state = {
      hover: false
    }
  }

  initContentData = ()=>{
    contentData.map((item,index)=>(
          items.push(<DestinationList key={index} index={index}/>)
  ))}

  render() {
    items = [];
    this.initContentData();
    return (
        <View style={styles.backdrop}>
          <View style={styles.panel}>
            <View style={{backgroundColor: '#1f53ff', padding: 10, marginBottom: 10}}>
              <Text style={{fontSize: 24}}>Malang VR Tour</Text>
            </View>           
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
              {items}
            </View>
          </View>
        </View>
    );
  }
};

class DestinationList extends React.Component{

  constructor(){
    super()
    this.state= {
      hover: false
    }
  }

    displayScene = (i)=>{
        surfaceModule[0].setBackground(contentData[i].background);
        surfaceModule[0].setParams(contentData[i].placeName, contentData[i].description);
        surfaceModule[0].start();

        surfaceModule[1].setParams(contentData[i].gallery);
        surfaceModule[1].start();
    }

    render() {
        return(
            <VrButton style={thumbNailStyles.image}
                      onClick={()=>{this.displayScene(this.props.index);}}
                      onEnter={()=>{this.setState({hover: true})}}
                      onExit={()=>{this.setState({hover: false})}}
                      >
                <DestinationPhoto placeName={ contentData[this.props.index].placeName }
                                uri={contentData[this.props.index].thumbnail} 
                                hovering={this.state.hover}/>
            </VrButton>
        );
    }
}

class DestinationPhoto extends React.Component{

  render() {
    return(
        <View>
          <Image
              style={[{width: 200, height: 200, borderColor: '#FFFF', borderWidth: 3, borderTopLeftRadius: 5,borderTopRightRadius: 5,borderBottomLeftRadius: 5,borderRadius: 5},
              this.props.hovering?{width: 210, height: 210, borderColor: '#ff4ff3', borderWidth: 6}:null]}
              source={asset(this.props.uri)}
          />
          <View style={{...StyleSheet.absoluteFillObject,flexDirection: 'column-reverse'}}>
            <View style={thumbNailStyles.postButtonLabel}>
                <Text style={thumbNailStyles.postButtonName}>{this.props.placeName}</Text>
            </View>
          </View>         
        </View>
    );
  }
}

const thumbNailStyles = StyleSheet.create({
    postButtonInfo: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    postButtonInfoHover: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    postButtonLabel: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      paddingHorizontal: 10,
      paddingVertical: 2,
      alignSelf: 'flex-start',
    },
    postButtonName: {
      fontSize: 24,
    },
    image: {
        width: 200,
        height: 200,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 20
    }
});

const styles = StyleSheet.create({
  backdrop: {
      // Fill the entire surface
      width: 720,
      height: 350,
      //backgroundColor: 'rgba(0, 0, 0, 0.8)',
      //borderColor: '#303050',
      //borderWidth: 2,
      alignItems: 'center',
  },
  panel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

const menuStyles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: 'rgba(1, 1, 255, 1)',
  },
  prevnext: {
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 5
  },
  prevnexthover: {
    backgroundColor: 'rgba(255,255,255,0.7)',
  }
});

AppRegistry.registerComponent('MainMenu', () => MainMenu);
AppRegistry.registerComponent('InfoMenu', () => InfoMenu);
AppRegistry.registerComponent('PhotoGallery', () => PhotoGallery);
