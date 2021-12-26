import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../Screens/Home';
import ProductsList from '../Screens/Products/List';
import ProductsAdd from '../Screens/Products/Add';
import StatisticsMain from '../Screens/StatisticsMain';
import AddMeal from "../Screens/AddMeal";
import {colors} from '../Styles';
import {DateContext} from "../Lib/RouteContext";

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProductStack = createNativeStackNavigator();
const StatsNav = createNativeStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName="HomeScreen">
            <HomeStack.Screen name="HomeScreen" component={HomeScreen}  options={{ headerTitle: "Food"}} />
            <HomeStack.Screen name="AddMeal" component={AddMeal} options={{
              headerTitle: "Add Meal"
            }}/>
        </HomeStack.Navigator>
    )
}

const ProductsStackScreen = () => {
    return (
    <ProductStack.Navigator>
        <ProductStack.Screen name="ProductsList" component={ProductsList} options={{
            headerTitle: "Products",
        }} />
        <ProductStack.Screen name="ProductsAdd" component={ProductsAdd} options={{
            headerTitle: "Add Product"
        }}></ProductStack.Screen>
    </ProductStack.Navigator>
    )
}

const StatisticsScreen = ({route}) => {
  return (
    <DateContext.Provider value={route.params && route.params.date ? route.params.date : false}>
    <StatsNav.Navigator>
      <StatsNav.Screen
        name="StatisticsMain"
        component={StatisticsMain}
        options={{headerTitle: "Statistics"}}
        />
    </StatsNav.Navigator>
    </DateContext.Provider>
  );
}

const BottomStackNavigator = () => {
    return (
        <Tab.Navigator barStyle={{ backgroundColor: colors.purple }}>
            <Tab.Screen name="Food" component={HomeStackScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="fast-food-outline" size={25} color="#fff" />
                )
            }}></Tab.Screen>
            <Tab.Screen name="Products" component={ProductsStackScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="cart-outline" size={25} color="#fff" />
                )
            }}></Tab.Screen>
            <Tab.Screen name="Statistics" component={StatisticsScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="stats-chart" size={25} color="#fff" />
                )
            }}></Tab.Screen>
        </Tab.Navigator>
    )
}

export {BottomStackNavigator}
