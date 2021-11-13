import React from "react";

import { SafeAreaView, ScrollView } from 'react-native';
import { TextInput, Button, List, Card, Paragraph  } from 'react-native-paper';
import {styles, colors} from '../Styles';
import DB from "../Lib/DB";
import { showMessage } from "react-native-flash-message";

class AddMeal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productsResult: [],
      selectedProduct: null
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
      console.log(err);
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

    // Empty selected products
    productsResult = [];
    // Updated state
    this.setState({productsResult, selectedProduct});

  }

  setSelectedProductAmount(amount) {
    let {selectedProduct} = this.state;
    selectedProduct.amount = amount;
    this.setState({selectedProduct})
  }

  getSelectedItemForm() {
    const {selectedProduct } = this.state;

    if (!selectedProduct) return false;

    return <Card mode="outlined" style={{marginTop: 5}}>
      <Card.Title title={selectedProduct.name}></Card.Title>
      <Card.Content>
        <Paragraph>Calories per 100 grams: {selectedProduct.calories}</Paragraph>
          <TextInput style={{ backgroundColor: null}}
            label={`Amount of ${selectedProduct.name} in grams`}
            value={selectedProduct.amount}
            keyboardType="numeric"
            onChangeText={value => this.setSelectedProductAmount(value)}
          />
      </Card.Content>
      <Card.Actions>
        <Button>Discard</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  }

  render() {
    const {productsResult} = this.state;

    let suggestions = this.getSuggestionsList(productsResult)
    let selectedProductForm = this.getSelectedItemForm();
    return (
      <SafeAreaView style={{minHeight: 450}}>
      <ScrollView style={styles.viewStyle2}>

        <TextInput style={{ backgroundColor: null}}
          label="Search Product, enter at least 3 symbols"
          onChangeText={value => this.searchProducts(value)}
        />

        {suggestions}

        {selectedProductForm}

      </ScrollView>
      </SafeAreaView>
    )
  }
}

export default AddMeal
