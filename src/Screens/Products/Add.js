import React, { Component } from "react";

import { SafeAreaView, ScrollView, View} from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import {styles, colors} from '../../Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

class AddProduct extends Component {
    constructor()
    {
        super();
        this.state = {
          product: {
            name: null,
            calories: null,
            carbs: null,
            sugar: null,
            fats: null,
            protein: null
          },
          errors: {}
        }
    }

    setFormFieldValue(field, value) {
      let {product} = this.state;
      product[field] = value;
      this.validate(field, value);
      this.setState({product});
    }

    saveProduct() {

      let {product} = this.state;

      Object.keys(product).forEach(field => {
        this.validate(field, product[field]);
      });

      let {errors} = this.state;

      if (0 === Object.keys(errors).length) {
        console.log('save product:', product);
      }

    }

    validate(field, value) {
      let {errors} = this.state;

      if (field == 'name') {

        if (!value || value && value.length < 4) {
          errors.name = "Name should be at least 4 symbols";
        } else {
          delete errors.name;
        }

      } else {

        if (!value) {
          errors[field] = `Enter amount of ${field}.If none, then enter 0`;
        } else {
          delete errors[field];
        }

      }

      this.setState({errors});
    }

    render() {
      const {product, errors} = this.state;
      return (
        <SafeAreaView>

        <ScrollView style={styles.viewStyle2}>
          <TextInput style={{ backgroundColor: null}}
            label="Product Name"
            value={product.name ? product.name : ""}
            error={errors.name ? true : false}
            onChangeText={value => this.setFormFieldValue('name', value)}
          />
          <HelperText type="error" visible={errors.name}>
            {errors.name ? errors.name : null}
          </HelperText>

          <TextInput style={{ backgroundColor: null}}
            label="Calories per 100 grams"
            value={product.calories ? product.calories : ""}
            error={errors.calories ? true : false}
            keyboardType="numeric"
            onChangeText={value => this.setFormFieldValue('calories', value)}
          />
          <HelperText type="error" visible={errors.calories}>
            {errors.calories}
          </HelperText>

          <TextInput style={{ backgroundColor: null}}
            label="Carbs (per 100g)"
            value={product.carbs ? product.carbs : ""}
            error={errors.carbs ? true : false}
            keyboardType="numeric"
            onChangeText={value => this.setFormFieldValue('carbs', value)}
          />
          <HelperText type="error" visible={errors.carbs}>
            {errors.carbs}
          </HelperText>

          <TextInput style={{ backgroundColor: null}}
            label="Sugar (per 100g)"
            value={product.sugar ? product.sugar : ""}
            error={errors.sugar ? true : false}
            keyboardType="numeric"
            onChangeText={value => this.setFormFieldValue('sugar', value)}
          />
          <HelperText type="error" visible={errors.sugar}>
            {errors.sugar}
          </HelperText>

          <TextInput style={{ backgroundColor: null}}
            label="Fats (per 100g)"
            value={product.fats ? product.fats : ""}
            error={errors.fats ? true : false}
            keyboardType="numeric"
            onChangeText={value => this.setFormFieldValue('fats', value)}
          />
          <HelperText type="error" visible={errors.fats}>
            {errors.fats}
          </HelperText>

          <TextInput style={{ backgroundColor: null}}
            label="Protein (per 100g)"
            value={product.protein ? product.protein : ""}
            error={errors.protein ? true : false}
            keyboardType="numeric"
            onChangeText={value => this.setFormFieldValue('protein', value)}
          />
          <HelperText type="error" visible={errors.protein}>
            {errors.protein}
          </HelperText>

          <Button style={styles.bottomBtn} mode="contained" onPress={() => this.saveProduct()}>
            <Icon name="save" color="#fff" size={18} />
            <View style={{ width: 16, height: 1 }} />
            Save Product
          </Button>

        </ScrollView>
        </SafeAreaView>
      )
    }
}

export default AddProduct
