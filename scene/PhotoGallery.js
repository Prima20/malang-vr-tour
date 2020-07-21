import React from "react";
import { View, Text, VrButton, asset, Image, Environment, NativeModules } from "react-360";
import { StyleSheet } from 'react-native'


const photoGalleryModule = NativeModules.PhotoGalleryModule;
const mainMenuModule = NativeModules.MainMenuModule;
const items = [];
export class PhotoGallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            hideHover: false,
            img: {
                name: 'gallery.png',
                width: 100,
                height: 100
            },
            homeHover: false,
        };
    }

    togglePanel() {
        this._changePanelDimensions(1000, 600);
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
                name: `gallery.png`,
                width: 100,
                height: 100
            }
        });
    }

    _changePanelDimensions(width, height) {
        photoGalleryModule.resizePanel(width, height);
    }

    initThumbnail = (gallery) => {
        gallery.map((item, index) => (
            items.push(<ImageThumbnail key={index} name={item.title} image={item.thumbnail} target={item.photo} />)
        ))
    }

    render() {
        let { img } = this.state;
        items = [];
        this.initThumbnail(this.props.gallery)
        return (
            <View style={styles.displayPanel}
                hitSlop={20}>
                <VrButton onClick={() => this.togglePanel()}>
                    <Image source={asset(img.name)} style={{width: img.width, height: img.height}} />
                </VrButton>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>360 Photo Gallery</Text>
                </View>
                    <View style={styles.wrapper}>
                        {
                            items
                        }
                    </View>
                    <View style={{ justifyContent: 'center' , flexDirection: 'row'}}>
                        <VrButton
                            style={[styles.button, this.state.homeHover ? { borderWidth: 5, borderColor: '#0509ff' } : null]}
                            onEnter={() => { this.setState({ homeHover: true }) }}
                            onExit={() => { this.setState({ homeHover: false }) }}
                            onClick={()=> {
                                this.resetPanel()
                                mainMenuModule.start()}}>
                            <Text style={styles.buttontext}>Back to Main Menu</Text>
                        </VrButton>
                        <VrButton
                            style={[styles.button, this.state.hideHover ? { borderWidth: 5, borderColor: '#0509ff' } : null]}
                            onEnter={() => { this.setState({ hideHover: true }) }}
                            onExit={() => { this.setState({ hideHover: false }) }}
                            onClick={() => { this.resetPanel() }}>
                            <Text style={styles.buttontext}>Hide Gallery</Text>
                        </VrButton>
                    </View>
            </View>
        );
    }
}


class ImageThumbnail extends React.Component {
    state = {
        hover: false,
    };

    render() {
        return (
            <VrButton
                style={styles.postButton}
                onEnter={() => this.setState({ hover: true })}
                onExit={() => this.setState({ hover: false })}
                onClick={() => { Environment.setBackgroundImage(asset(this.props.target)); }}
            >
                <Image style={styles.postButtonPreview} source={asset(this.props.image)} />
                <View style={[styles.postButtonInfo, this.state.hover ? styles.postButtonInfoHover : null]}>
                    <View style={styles.postButtonLabel}>
                        <Text style={styles.postButtonName}>{this.props.name}</Text>
                    </View>
                </View>
            </VrButton>
        )
    }
}

const styles = StyleSheet.create({
    backdrop: {
        width: 700,
        height: 300,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
    },
    titleContainer:{
        backgroundColor: '#1f53ff', 
        marginBottom: 10
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    name: {
        fontSize: 30,
        textAlign: 'center',
    },
    author: {
        fontSize: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
    },
    postButton: {
        height: 200,
        overflow: 'hidden',
        margin: 10
    },
    postButtonPreview: {
        width: 200,
        height: 200,
        borderColor: 'black',
        borderWidth: 3,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    postButtonInfo: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        flexDirection: 'column-reverse',
    },
    postButtonInfoHover: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    postButtonLabel: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 5,
        alignSelf: 'flex-start',
    },
    postButtonName: {
        fontSize: 24,
    },
    button: {
        width: 200,
        backgroundColor: 'rgba(10, 10, 10, 0.9)',
        borderColor: '#595759',
        borderWidth: 3,
        margin: 5,
        borderWidth: 3,
        padding: 10,
    },
    buttontext: {
        textAlign: 'center',
    },
    displayPanel: {
        width: 700,
        height: 600,
        flexDirection: 'column'
    },
    attractionBox: {
        padding: 20,
        backgroundColor: '#F7F7F7',
        borderColor: '#C4002F',
        borderWidth: 2,
        width: 500
    },
    attractionText: {
        fontSize: 30,
        color: '#C4002F'
    },
});
