import React from "react";
import {View, Text, StyleSheet, VrButton, asset, Image, Environment} from "react-360";


export class ViewMenu extends React.Component{
    state = {
        hover: false,
    };

    render(){
        return (
            <View style={styles.backdrop}>
                <Text style={styles.title}>Photo Gallery</Text>
                <View style={styles.wrapper}>
                    <ImageThumbnail name="Candi Badut" image="candi_thumb.png" target="candi_badut.jpg"/>
                    <ImageThumbnail name="Candi Dalam" image="candi_dalam_thumb.png" target="candi_badut_dalam.jpg"/>
                    <ImageThumbnail name="Candi Luar" image="candi_luar_thumb.png" target="candi_badut_luar.jpg"/>
                </View>
            </View>
        );
    }
}

class ImageThumbnail extends React.Component{
    state = {
        hover: false,
    };

    render(){
        return(
            <VrButton
                style={styles.postButton}
                onEnter={() => this.setState({hover: true})}
                onExit={() => this.setState({hover: false})}
                onClick={() => {
                    Environment.setBackgroundImage(asset(this.props.target));
                }}
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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: '#303050',
        borderWidth: 5,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
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
        backgroundColor: '#000000',
        overflow: 'hidden',
    },
    postButtonPreview: {
        width: 200,
        height: 200,
        margin: 2,
    },
    postButtonInfo: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        flexDirection: 'column',
    },
    postButtonInfoHover: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    postButtonLabel: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'flex-start',
    },
    postButtonName: {
        fontSize: 24,
    },
});
