import React from "react";

import { SafeAreaView, ScrollView, View } from 'react-native';
import { TextInput, Button, List, Card, Paragraph, Text } from 'react-native-paper';
import {styles, colors} from '../Styles';
import DB from "../Lib/DB";
import { showMessage } from "react-native-flash-message";
import Bold from "../Components/Bold";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import Dates from "../Lib/Dates";

class AddMeal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productsResult: [],
      selectedProduct: null,
      showDatepicker: false,
      meal: {
        fats: 0,
        carbs: 0,
        sugar: 0,
        protein: 0,
        calories: 0,
        products: [],
        date: moment(Date.now()).format('D/M/yyyy')
      }
    }
  }


  searchProducts(name) {

    if (!name || name.length < 3) {
      return;
    }

    DB.getProductsByName(name).then(res => {

      if (!res.rows.length) {
        return;
      }

      let productsResult = [];

      for (let index = 0; index < res.rows.length; index++) {
        productsResult.push(res.rows.item(index));
      }

      this.setState({productsResult});

    }).catch(err => {
      showMessage({
        type: 'error',
        message: "Error occured",
        description: err.message
      })

    })
  }

  getSuggestionsList(productsList) {

    if (!productsList.length) {
      return false;
    }

    let list = productsList.map(product => {
      let desc = `Per 100g: Calories:${product.calories}, Carbs: ${product.carbs}, Proteins:${product.protein}`

      return <List.Item
        title={product.name}
        description={desc}
        onPress={() => this.selectProduct(product.rowid)}
        right={props => <List.Icon {...props} icon="check" color={colors.purple} />}
        key={"product-"+product.rowid}
      />
    })

    return list;
  }

  selectProduct(id) {
    let {productsResult} = this.state;

    // Filter only selected product
    productsResult = productsResult.filter(product => {
      return product.rowid == id;
    });

    // Selected product to add to meal items
    let selectedProduct = productsResult[0];

    // Add amount field to selected product
    selectedProduct.amount = null;
    selectedProduct.per_amount = null;

    // Empty selected products
    productsResult = [];
    // Updated state
    this.setState({productsResult, selectedProduct});

  }

  setSelectedProductAmount(amount) {
    let {selectedProduct} = this.state;
    selectedProduct.amount = amount;
    selectedProduct.per_amount = (selectedProduct.amount/100)*selectedProduct.calories;
    selectedProduct.per_amount = Math.round(selectedProduct.per_amount*100)/100;
    this.setState({selectedProduct})
  }

  caloriesPerAmountParagraph(selectedProduct) {

    if (selectedProduct.amount) {
      return <Paragraph>
        Calories per amount: {selectedProduct.amount}gr./{selectedProduct.per_amount}kcal
      </Paragraph>
    }

    return null;
  }

  addToMeal() {
    let {meal, selectedProduct} = this.state;

    delete selectedProduct.photo;
    delete selectedProduct.description;

    // Save product data to meal
    meal.products.push(selectedProduct);

    // Calculate meal nutritions
    meal.calories += selectedProduct.per_amount;

    ['carbs', 'sugar', 'fats', 'protein'].forEach(nutrition => {
      meal[nutrition] += Math.round(
        (((selectedProduct.amount/100)*selectedProduct[nutrition])*100)/100
      );
    });

    // Remove selected product
    selectedProduct = null;

    // console.log(meal);

    this.setState({meal, selectedProduct});
  }

  discardSelectedProduct() {
    let {selectedProduct} = this.state;
    selectedProduct = null;
    this.setState({selectedProduct});
  }

  onDateChange(event, date) {
    if (event.type == 'dismissed') {
      this.setState({showDatepicker: false});

    } else if (event.type == 'set') {

      let {meal} = this.state;
      meal.date = moment(date).format('D/M/yyyy');
      this.setState({meal, showDatepicker: false});
    }

  }

  toggleDatePicker() {
    let {showDatepicker} = this.state;
    this.setState({showDatepicker: !showDatepicker});
  }

  getMealCard() {
    const {meal} = this.state;

    if (meal.products && meal.products.length) {
      let productsInfo = meal.products.map(product => {
        return <List.Item style={{padding: 0}}
          key={'meal-product-data'+product.rowid}
          title={product.name}
          titleStyle={{padding: 0}}
          description={`${product.amount} grams`}
          right={props => <Text style={{paddingTop:8}}>{product.per_amount}kcal</Text>}
        />

      })

      return <Card mode="outlined" style={{marginTop: 5}}>
        <Card.Title title={`Current meal: ${meal.calories}kcal.`}/>
        <Card.Content style={{padding: 0}}>
          {productsInfo}
          <View style={styles.mealNutritionsOverview}>
            <Text><Bold>Carbs:</Bold> {meal.carbs ?? 0}</Text>
            <Text><Bold>Sugar:</Bold> {meal.sugar ?? 0}</Text>
            <Text><Bold>Fats:</Bold> {meal.fats ?? 0}</Text>
            <Text><Bold>Protein:</Bold> {meal.protein ?? 0}</Text>
          </View>
          <Button mode="text" onPress={() => this.toggleDatePicker()}>
            {meal.date}
          </Button>
        </Card.Content>
      </Card>
    }

    return null;
  }

  getSelectedItemForm() {
    const {selectedProduct } = this.state;

    if (!selectedProduct) return false;

    return <Card mode="outlined" style={{marginTop: 5}}>
      <Card.Title title={`${selectedProduct.name}: 100g/${selectedProduct.calories} kcal`}></Card.Title>
      <Card.Content>
          {this.caloriesPerAmountParagraph(selectedProduct)}
          <TextInput style={{ backgroundColor: null, paddingHorizontal: 0}}
            label={`Amount of ${selectedProduct.name} in grams`}
            value={selectedProduct.amount}
            keyboardType="numeric"
            onChangeText={value => this.setSelectedProductAmount(value)}
          />
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => {this.discardSelectedProduct()}}>Discard</Button>
        <Button onPress={() => {this.addToMeal(selectedProduct)}}>Add to meal</Button>
      </Card.Actions>
    </Card>
  }

  render() {
    const {productsResult, showDatepicker} = this.state;

    let suggestions = this.getSuggestionsList(productsResult)
    let selectedProductForm = this.getSelectedItemForm();
    let mealData = this.getMealCard();

    const SaveButton = mealData ? <Button icon="content-save-outline" mode="contained">Save</Button> : null;
    return (
      <SafeAreaView style={{minHeight: 450}}>
      <ScrollView style={styles.viewStyle2}>

        <TextInput style={{ backgroundColor: null}}
          label="Search Product, enter at least 3 symbols"
          onChangeText={value => this.searchProducts(value)}
        />

        {suggestions}

        {selectedProductForm}

        {mealData}

        {SaveButton}

        {showDatepicker && <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          is24Hour={true}
          display="calendar"
          onChange={(event, date) => this.onDateChange(event, date)}
        />}

      </ScrollView>
      </SafeAreaView>
    )
  }
}

export default AddMeal
