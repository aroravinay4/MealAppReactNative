import React from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import MealItem from '../components/MealItem';
import { useSelector } from 'react-redux';
const MealList = props => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
  

    const renderMealItem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);
        return (
            <MealItem title={itemData.item.title}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                image={itemData.item.imageUrl}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'MealDetail', params: {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFavorite
                        }
                    })
                }
                } />


        );
    };

    return (
        <View style={styles.list}>
            <FlatList data={props.listData} keyExtractor={(DataTransferItem, index) => DataTransferItem.id}
                renderItem={renderMealItem} style={{ width: '100%' }} />

        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        padding: 15
    }
});

export default MealList;