import React from "react";
import { Text, View, VrButton, Image, NativeModules, asset } from "react-360";
import { StyleSheet } from 'react-native'


const { AudioModule } = NativeModules;
const infoModule = NativeModules.InfoMenuModule;

export class InfoMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            isHide: false,
            img: {
                name: 'info.png',
                width: 100,
                height: 100
            }
        }
    }

    togglePanel() {
        this._changePanelDimensions(400, 500);
        this.setState({
            img: {
                name: "",
                width: 0,
                height: 0
            }
        });
    }

    resetPanel() {
        this._changePanelDimensions(100, 100);
        this.setState({
            img: {
                name: `info.png`,
                width: 100,
                height: 100
            }
        });
    }

    _changePanelDimensions(width, height) {
        infoModule.resizePanel(width, height);
    }

    render() {
        let { img } = this.state;
        return (
            <View style={styles.displayPanel}>
                <VrButton onClick={() => this.togglePanel()}>
                    <Image source={asset(img.name)} style={{ width: img.width, height: img.height }} />
                </VrButton>
                    <View style={styles.attractionBox}>
                        <View style={styles.header}>
                        <View style={{width: '30%'}}>
                        <VrButton
                            onEnter={()=>this.setState({hover: true})}
                            onExit={()=>this.setState({hover: false})}
                            onClick={() =>  this.resetPanel() }>
                        <Text style={[styles.hideIcon,this.state.hover ? {color: 'red', fontWeight: 'bold'} : null]}>
                            X
                        </Text>   
                        </VrButton> 
                        </View>  
                        <View style={{width: '70%'}}>
                        <Text style={styles.titleText}>
                            {this.props.placeName}
                        </Text>
                        </View>
                        </View>
                        <Text style={styles.bodyText}>
                            {this.props.overview}
                        </Text>
                        <SoundMenu />
                    </View>
            </View>
        );
    }
};

class SoundMenu extends React.Component {
    state = {
        played: false,
        hover: false,
        title: 'Play Sound'
    };
    _playAudio(volume){
        AudioModule.playEnvironmental({
            source: asset('sound.ogg'),
            volume: volume, // play at 3/10 original volume
        });
    }
    render() {
        return (
            <View>
                <VrButton
                    style={[styles.button, this.state.hover ? { backgroundColor: 'rgba(255, 255, 255, 0.5)',borderWidth: 5, borderColor: '#0509ff'} : null]}
                    onEnter={() => { this.setState({ hover: true }) }}
                    onExit={() => { this.setState({ hover: false }) }}
                    onClick={() => {
                        if (!this.state.played) {
                            this.setState({ played: true, title: 'Hide sound' });
                            this._playAudio(0.5);
                        } else {
                            this.setState({ played: false ,  title: 'Play sound'});
                            this._playAudio(0);
                        }
                    }}>
                    <Text style={styles.buttontext}>{this.state.title}</Text>
                </VrButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: 400,
        height: 400,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: '#303050',
        borderWidth: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 10,
    },
    name: {
        fontSize: 30,
        textAlign: 'center',
        marginRight: 5,
    },
    author: {
        fontSize: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderColor: '#FFFF',
        margin: 5,
        borderWidth: 2,
        padding: 10,
    },
    buttontext: {
        textAlign: 'center',
    },
    displayPanel: {
        width: 100,
        height: 100,
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
    },
    attractionBox: {
        padding: 20,
        backgroundColor: 'rgba(10, 10, 10, 0.9)',
        borderColor: '#595759',
        borderWidth: 3,
        borderRadius: 5,
        width: 400,
    },
    titleText: {
        fontSize: 30,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    bodyText: {
        fontSize: 20,
        textAlign: 'justify',
        margin: 5
    },hideIcon:{
        fontSize: 40,
        textAlign: 'left'      
    }
});
