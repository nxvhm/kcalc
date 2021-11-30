import React from 'react';
import { TextInput, Button, Card, Paragraph, Text } from 'react-native-paper';

const caloriesPerAmountParagraph = (product) => {
  if (product.amount) {
    return <Paragraph>
        Calories per amount: {product.amount}gr./{product.per_amount}kcal
      </Paragraph>;
  }

  return null;
}

const SelectedFoodForm = (props) => {
  return (
  <Card mode="outlined" style={{marginTop: 5}}>
  <Card.Title title={`${props.selectedProduct.name}: 100g/${props.selectedProduct.calories} kcal`}></Card.Title>
    <Card.Content>
        {caloriesPerAmountParagraph(props.selectedProduct)}
        <TextInput style={{ backgroundColor: null, paddingHorizontal: 0}}
          label={`Amount of ${props.selectedProduct.name} in grams`}
          value={props.selectedProduct.amount}
          keyboardType="numeric"
          onChangeText={value => props.setSelectedProductAmount(value)}
        />
    </Card.Content>
    <Card.Actions>
      <Button onPress={() => {props.discardSelectedProduct()}}>Discard</Button>
      <Button onPress={() => {props.addToMeal()}}>Add to meal</Button>
    </Card.Actions>
  </Card>
  )
}

export default SelectedFoodForm
