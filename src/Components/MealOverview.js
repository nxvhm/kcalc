import React from 'react';
import {styles} from '../Styles';
import { View } from 'react-native';
import { Button, List, Card, Text } from 'react-native-paper';
import Bold from "./Bold";
import Format from '../Lib/Format';
const MealOverview = (props) => {

  let productsInfo = props.meal.products.map(product => {
    return <List.Item style={{padding: 0}}
      key={'meal-product-'+Format.randomKey()}
      title={product.name}
      titleStyle={{padding: 0}}
      description={`${product.amount} grams`}
      right={props => <Text style={{paddingTop:8}}>{product.per_amount}kcal</Text>}
    />

  })

  return (
    <Card mode="outlined" style={{marginTop: 5, marginBottom: 10}}>
      <Card.Title title={`${props.meal.calories}kcal.`}/>
        <Card.Content style={{padding: 0}}>
          {productsInfo}
          <View style={styles.mealNutritionsOverview}>
            <Text><Bold>Carbs:</Bold> {props.meal.carbs ?? 0}</Text>
            <Text><Bold>Sugar:</Bold> {props.meal.sugar ?? 0}</Text>
            <Text><Bold>Fats:</Bold> {props.meal.fats ?? 0}</Text>
            <Text><Bold>Protein:</Bold> {props.meal.protein ?? 0}</Text>
          </View>
          <Button mode="text" onPress={()=>props.dateDetails(props.meal.date)}>
            {props.meal.formatDate}
          </Button>
        </Card.Content>
        <Card.Actions>
          <Button icon="clipboard-text-outline" style={{flex: 1}}>Details</Button>
          <Button icon="trash-can-outline" onPress={() => props.removeMeal(props.meal.rowid)} style={{ flex: 2}}>Remove</Button>
        </Card.Actions>
    </Card>
  )
}

export default MealOverview
