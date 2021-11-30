import React from 'react';
import {styles} from '../Styles';
import { View } from 'react-native';
import { Button, List, Card, Text } from 'react-native-paper';
import Bold from "./Bold";

const MealCard = (props) => {

  let productsInfo = props.meal.products.map(product => {
    return <List.Item style={{padding: 0}}
      key={'meal-product-data'+product.rowid}
      title={product.name}
      titleStyle={{padding: 0}}
      description={`${product.amount} grams`}
      right={props => <Text style={{paddingTop:8}}>{product.per_amount}kcal</Text>}
    />

  })

  return (
    <Card mode="outlined" style={{marginTop: 5}}>
      <Card.Title title={`Current meal: ${props.meal.calories}kcal.`}/>
        <Card.Content style={{padding: 0}}>
          {productsInfo}
          <View style={styles.mealNutritionsOverview}>
            <Text><Bold>Carbs:</Bold> {props.meal.carbs ?? 0}</Text>
            <Text><Bold>Sugar:</Bold> {props.meal.sugar ?? 0}</Text>
            <Text><Bold>Fats:</Bold> {props.meal.fats ?? 0}</Text>
            <Text><Bold>Protein:</Bold> {props.meal.protein ?? 0}</Text>
          </View>
          <Button mode="text" onPress={() => props.toggleDatePicker()}>
            {props.meal.date}
          </Button>
        </Card.Content>
    </Card>
  )
}

export default MealCard
