import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import { Platform, color } from 'react-native';
import Colors from '../constants/Color';
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoriteScreen from '../screens/FavoritesScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from 'react-navigation-drawer';
import FilterScreen from '../screens/FiltersScreen';



const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primaryColor
    },
    headerTintColor: 'white',
    headerTitle: 'A Screen'
};

const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen
        },
        CategoryMeals: {
            screen: CategoryMealScreen
        },
        MealDetail: MealDetailScreen
    },
    {
        // initialRouteName: 'Categories',
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const FavNavigator = createStackNavigator(
    {
        Favorites: FavoriteScreen,
        MealDetail: MealDetailScreen
    },
    {
        // initialRouteName: 'Categories',
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const FilterNav = createStackNavigator({
    Filter: FilterScreen,


},
    {
        // initialRouteName: 'Categories',
        defaultNavigationOptions: defaultStackNavOptions
    });

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Icon name="ios-restaurant" size={25} color={tabInfo.tintColor} />
                );
            },
            tabBarColor: Colors.primaryColor
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Icon name="ios-star" size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.accentColor
        },
        defaultNavigationOptions: defaultStackNavOptions
    }
};

const MealsFavTabNavigator = createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: Colors.accentColor
    }
});

const MainNavigator = createDrawerNavigator({
    MealsFav: {
        screen: MealsFavTabNavigator, navigationOptions: {
            drawerLabel: 'Melas'

        }
    },
    Filter: FilterNav
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily:'OpenSansBold'

        }

    }
}
);

export default createAppContainer(MainNavigator);