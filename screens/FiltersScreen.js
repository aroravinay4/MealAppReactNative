import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Color';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/MealsAction';

const FilterSwitch = props => {

    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch trackColor={{ true: Colors.primaryColor }}
                thumbColor={Colors.primaryColor}
                value={props.state} onValueChange={props.onChange} />
        </View>


    );
};


const FilterScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [vegan, setVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: vegan,
            vegetarian: isVegetarian

        };
        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, vegan, isVegetarian, dispatch]);// callback take second argument as array for dependency that lead us to re-create function

    useEffect(() => {
        navigation.setParams({ save: saveFilters });

    }, [saveFilters]); //This is dependency when changes in savefilters then rebuild the component.

    return (


        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters/Restrictions</Text>
            <FilterSwitch
                label='Gluten-free'
                state={isGlutenFree}
                onChange={(newValue => setIsGlutenFree(newValue))} />

            <FilterSwitch label='Lactose-free' state={isLactoseFree}
                onChange={(newValue => setIsLactoseFree(newValue))} />

            <FilterSwitch label='Vegan' state={vegan}
                onChange={(newValue => setVegan(newValue))} />

            <FilterSwitch label='Vegetarian' state={isVegetarian}
                onChange={(newValue => setIsVegetarian(newValue))} />

        </View>




    );

};

FilterScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }} />

        </HeaderButtons>
        ),
        headerRight: (
            < HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item title="Save" iconName='ios-save' onPress={() => {
                    navData.navigation.getParam('save');

                }} />

            </HeaderButtons>
        ),


    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center"
    },

    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '80%',
        marginVertical: 10,
        paddingHorizontal: 10

    },
    title: {
        fontFamily: 'OpenSansBold',
        fontSize: 22,
        margin: 20,
        textAlign: "center",


    }
});

export default FilterScreen;