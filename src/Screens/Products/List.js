import React, {useState, Component} from "react";

import {View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Button, IconButton, Card, Paragraph } from 'react-native-paper';
import {styles, colors} from '../../Styles';
import DB from "../../Lib/DB";

class List extends Component{

    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts() {
        DB.getProducts().then(res => {
            if (res.rows && res.rows.length) {

                let products = [];

                for (let index = 0; index < res.rows.length; index++) {
                    products.push(res.rows.item(index));                
                }

                this.setState({products})
            }
        }).catch(err => {
            console.log('error during products fetch', err);
        })
    }

    render() {

        const {products} = this.state;

        const productsList = products.map(product => {
            return <Card key={'product-'+product.rowid} mode="outlined" style={styles.productCard}>
                <Card.Title title={product.name}></Card.Title>
                <Card.Content>
                    <Paragraph>Calories per 100 grams: {product.calories}</Paragraph>
                    <Paragraph>Carbohydrates: {product.carbs}</Paragraph>
                    <Paragraph>Fats: {product.fats}</Paragraph>
                    <Paragraph>Proteins: {product.proteins}</Paragraph>
                </Card.Content>
            </Card>
        })

        return (
        <SafeAreaView>
            
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

        </SafeAreaView>
        )
    }
}

export default List