import React from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import { Button, IconButton, Card } from 'react-native-paper';
import {colors, styles} from '../Styles';
import DB from '../Lib/DB';
import { showMessage } from "react-native-flash-message";
import moment from "moment";

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      meals: [],
    }
  }

  componentDidUpdate() {
    const {params} = this.props.route;
    let {id} = this.state;

    if (params && params.id && id != params.id) {
      id = params.id;

      this.getMeals(id);

      if (params.message) {
        showMessage(params.message);
      }
    }
  }

  componentDidMount() {
    this.getMeals();
  }

  getMeals(updatedId = 0) {
    let {id} = this.state;
    id = updatedId;

    DB.getMeals().then(res => {
      if (!res.rows || !res.rows.length) {
        return false;
      }

      let meals = [];

      for (let index = 0; index < res.rows.length; index++) {
        let meal = res.rows.item(index);
        meal.date = moment(meal.date).format('D/M/yyyy');
        meal.products = JSON.parse(meal.products);
        meals.push(meal);
      }

      this.setState({id, meals});

    }).catch(err => {
      showMessage({
        type: 'error',
        message: 'Error occured',
        description: err.message
      })
    })

  }

  render() {
    const {meals, id} = this.state;
    console.log(meals);
    return (
      <SafeAreaView style={{minHeight: 450}} key={id}>
      <ScrollView style={styles.viewStyle2}>

      </ScrollView>

      <IconButton
          icon="reload"
          color={colors.white}
          style={{
            backgroundColor:colors.purple,
            position: "absolute",
            bottom: 10,
            left: 10,
            alignSelf: 'flex-start'
          }}
          size={35}
          onPress={() => this.props.navigation.navigate('AddMeal')}
      />

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
          onPress={() => this.props.navigation.navigate('AddMeal')}
      />

      </SafeAreaView>
    );
  }
}

export default HomeScreen;
