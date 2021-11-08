import React from "react";

import {View, Text} from 'react-native';
import { Button } from 'react-native-paper';
import {colors} from '../../Styles';

const List = ({navigation}) => {
    return (
        <View>
            <Text>List of products here</Text>
            <Button mode="contained" icon="plus" 
                onPress={() => navigation.navigate('ProductsAdd')}
                style={{backgroundColor: colors.purple, width: 250, alignSelf: "center"}}
            >
                    Add Product
            </Button>
        </View>
    )
}

export default List