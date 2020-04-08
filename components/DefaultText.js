import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const DefaultText = props => {

    return <Text style={styles.text}>{props.children}</Text>
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'OpenSansBold'

    }


});

export default DefaultText;