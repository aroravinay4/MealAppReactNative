import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

import { useSelector, useDispatch } from 'react-redux';
import { toggaleFavorite } from '../store/actions/MealsAction';


const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );

};
const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));


    const selectMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggaleFavorite(mealId));

    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealIsFavorite });
    }, [currentMealIsFavorite]);

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler })

    }, [toggleFavoriteHandler]);

    return (
        <ScrollView>
            <Image source={{ uri: selectMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectMeal.duration}m</DefaultText>
                <DefaultText>{selectMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectMeal.ingredients.map(ingredients =>
                <ListItem key={ingredients}>{ingredients}</ListItem>)}
            <Text style={styles.title}>Steps</Text>
            {selectMeal.steps.map(steps =>
                <ListItem key={steps}>{steps}</ListItem>)}

        </ScrollView>
    );

};

MealDetailScreen.navigationOptions = navigationData => {
    //  const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');



    return {
        headerTitle: mealTitle,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Favorite' iconName={isFavorite ? 'ios-star' : 'ios-star-outline'} onPress={toggleFavorite} />
            </HeaderButtons>


        )
    };

};

const styles = StyleSheet.create({
    details: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around"


    },
    image: {
        width: '100%',
        height: 200

    },
    title: {
        fontFamily: 'OpenSansBold',
        fontSize: 22,
        textAlign: "center"
    },
    listItem: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    }

});

export default MealDetailScreen;