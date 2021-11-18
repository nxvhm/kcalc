import React, {useState, Component} from "react";

import { SafeAreaView, ScrollView, View } from 'react-native';
import { IconButton, Card, Paragraph, Button, Text } from 'react-native-paper';
import {styles, colors} from '../../Styles';
import DB from "../../Lib/DB";
import { showMessage } from "react-native-flash-message";
import ConfirmationDialog from "../../Components/ConfirmationDialog";
import Bold from "../../Components/Bold";

class List extends Component{

    constructor() {
        super();
        this.state = {
          id: 0,
          products: [],
          showDialog: false,
          productToRemove: false
        }
    }

    componentDidMount() {
        this.loadProducts();
    }

    componentDidUpdate() {
      const {params} = this.props.route;
      let {id} = this.state;

      if (params && params.productId && id != params.productId) {
        id = params.productId;

        this.loadProducts(params.productId);

        if (params.message) {
          showMessage(params.message);
        }
      }
    }

    loadProducts(newId = 0) {
        let {id} = this.state;
        id = id != newId ? newId : id;

        DB.getProducts().then(res => {
          if (res.rows && res.rows.length) {

            let products = [];

            for (let index = 0; index < res.rows.length; index++) {
                products.push(res.rows.item(index));
            }

            this.setState({id, products})
          }
        }).catch(err => {
          console.log('error during products fetch', err);
        })
    }

    showDialog(product) {
      this.setState({showDialog: true, productToRemove: {
        id: product.rowid,
        name: product.name
      }});
    }

    hideDialog() {
      this.setState({showDialog: false});
    }


    removeProduct() {
      let {productToRemove, id} = this.state;
      console.log("Remove product with id:", productToRemove);

      if (productToRemove && productToRemove.id) {
        DB.removeProduct(productToRemove.id).then(res => {
          this.setState({showDialog: false, productToRemove: false});
          this.loadProducts(id++);
        }).catch(err => {
          showMessage({
            type: 'error',
            message: 'Error occured',
            description: err.message
          })
        })
      }

    }

    render() {

        const {products, id, showDialog, productToRemove} = this.state;

        const productsList = products.map(product => {
            return <Card key={'product-'+product.rowid} style={styles.productCard}>
                <Card.Title
                  title={`${product.name} ${product.calories}kcal/100gr`}
                  titleStyle={{color: colors.white}}
                  style={{backgroundColor:colors.purple, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
                </Card.Title>
                <Card.Content>
                  <View style={styles.mealNutritionsOverview}>
                    <Text><Bold>Carbs:</Bold> {product.carbs ?? 0}</Text>
                    <Text><Bold>Sugar:</Bold> {product.sugar ?? 0}</Text>
                    <Text><Bold>Fats:</Bold> {product.fats}</Text>
                    <Text><Bold>Protein:</Bold> {product.protein}</Text>
                  </View>
                </Card.Content>
                <Card.Actions style={{alignSelf: 'center'}}>
                  <Button mode="outlined"
                    onPress={() => this.showDialog(product)}
                    color={colors.red}
                    style={{borderColor:colors.red, marginLeft: "auto"}}
                    icon="delete">
                      Delete
                  </Button>
              </Card.Actions>
            </Card>
        })

        return (
        <SafeAreaView id={id} style={{minHeight: 450}}>

            <ScrollView style={styles.viewStyle}>
                {productsList}
            </ScrollView>

            <IconButton
                icon="plus"
                color={colors.white}
                style={{
                    backgroundColor:colors.purple,
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    alignSelf: 'flex-end'
                }}
                size={35}
                onPress={() => this.props.navigation.navigate('ProductsAdd')}
            />

            <ConfirmationDialog
              text={`Are you sure you want to delete product: ${productToRemove.name} ?`}
              visible={showDialog}
              onDismiss={() => this.hideDialog()}
              onConfirm={() => this.removeProduct()}>
            </ConfirmationDialog>


        </SafeAreaView>
        )
    }
}

export default List
