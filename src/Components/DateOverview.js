import React from "react";
import { Badge } from 'react-native-paper';
import {View, Text} from 'react-native';
import { Colors } from "react-native-paper";
const DateOverview = (props) => {
  return (
    <View>
      <View style={{flexDirection: 'row', padding: 12}}>
        <Badge size={48} style={{flex: 1, backgroundColor: Colors.purple700}}>{props.data.calories} calories for the day</Badge>
      </View>
      <View style={{flexDirection: 'row', paddingLeft: 12}}>
        <Text style={{fontSize: 24}}>
          {props.data.carbs} grams of Carbs
        </Text>
      </View>

      <View style={{flexDirection: 'row', paddingLeft: 12}}>
        <Text style={{fontSize: 24}}>
        {props.data.sugar} grams of which is Sugar
        </Text>
      </View>

      <View style={{flexDirection: 'row', paddingLeft: 12}}>
        <Text style={{fontSize: 24}}>
        {props.data.fats} grams of Fats
        </Text>
      </View>

      <View style={{flexDirection: 'row', paddingLeft: 12}}>
        <Text style={{fontSize: 24}}>
        {props.data.protein} grams of Proteins
        </Text>
      </View>
    </View>
  )
}

export default DateOverview
