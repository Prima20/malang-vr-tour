import React from "react";
import {StyleSheet, Text, View} from "react-360";

export class InfoMenu extends React.Component{
    constructor(props) {
        super(props);

    }

    render(){
        return (
            <View style={styles.wrapper}>
                <Text style={styles.name}>Candi Badut</Text>
                <Text style={styles.description}>Candi ini diperkirakan berusia lebih dari 1400 tahun,
                    merupakan yang tertua di Jawa Timur dan diyakini adalah peninggalan Prabu Gajayana,
                    penguasa kerajaan Kanjuruhan sebagaimana yang termaktub dalam prasasti Dinoyo bertahun 760 Masehi.
                    Candi Badut ini meninggalkan jejak purbakala sebagai peninggalan sejarah yang perlu di
                    jaga dan dilestarikan keadaannya.</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    wrapper: {
        width: 400,
        height: 300,
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
    },
    author: {
        fontSize: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
    },
});
