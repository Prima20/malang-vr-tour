import React from 'react'
import {VrButton, Image, Text, Environment} from 'react-360'

class ImageThumbnail extends React.Component{

    constructor(props){
        super(props);
        state = {
            hover: false,
        };
    }

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

export const styles = StyleSheet.create({
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

export default ImageThumbnail