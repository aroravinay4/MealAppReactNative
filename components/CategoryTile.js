import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TouchableNativeFeedback } from 'react-native';

const CategoryTile = props => {
    let TouableComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouableComponent = TouchableNativeFeedback;
    }

    return (
        <View style={styles.gridItem}>
            <TouableComponent style={{ flex: 1 }} onPress={props.onSelect}>
                <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>

                    <Text styles={styles.title} numberOfLines={2}>{props.title}</Text>
                </View>

            </TouableComponent >
        </View>

    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: Platform.OS === 'android' && Platform.Version >= 21
            ? 'hidden' :
            'visible',
        elevation: 5,
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,

        padding: 10,
        justifyContent: "flex-end",
        alignItems: "flex-end"


    },
    title: {
        fontFamily: "OpenSansBold",
        fontSize: 22,
        textAlign: "right"
    }

});

export default CategoryTile;

