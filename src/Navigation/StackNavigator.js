import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../Screens/Home';
import ProductsList from '../Screens/Products/List';
import ProductsAdd from '../Screens/Products/Add';
import Statistics from '../Screens/Statistcis';
import {colors} from '../Styles';

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProductStack = createNativeStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName="HomeScreen">
            <HomeStack.Screen name="HomeScreen" component={HomeScreen}  options={{ headerTitle: "Home"}} />        
        </HomeStack.Navigator>
    )
}

const ProductsStackScreen = () => {
    return (
    <ProductStack.Navigator>
        <ProductStack.Screen name="ProductsList" component={ProductsList} options={{
            headerTitle: "Products"
        }} />
        <ProductStack.Screen name="ProductsAdd" component={ProductsAdd} options={{
            headerTitle: "Add Product"
        }}></ProductStack.Screen>
    </ProductStack.Navigator>
    )
}

const BottomStackNavigator = () => {
    return (
        <Tab.Navigator barStyle={{ backgroundColor: colors.purple }}>
            <Tab.Screen name="Home" component={HomeStackScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home-outline" size={25} color="#fff" />
                )
            }}></Tab.Screen>
            <Tab.Screen name="Products" component={ProductsStackScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="list-outline" size={25} color="#fff" />
                )
            }}></Tab.Screen>
            <Tab.Screen name="Statistics" component={Statistics} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="stats-chart" size={25} color="#fff" />
                )
            }}></Tab.Screen>
        </Tab.Navigator>
    )
}

export {BottomStackNavigator}