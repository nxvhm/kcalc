import React from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import { Button, IconButton, Card } from 'react-native-paper';
import {colors, styles} from '../Styles';
import DB from '../Lib/DB';
import { showMessage } from "react-native-flash-message";
import moment from "moment";
import MealOverview from '../Components/MealOverview';
import Format from '../Lib/Format';

moment.suppressDeprecationWarnings = true;

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
      this.props.route.params = {};

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
      let meals = [];

      for (let index = 0; index < res.rows.length; index++) {
        let meal = res.rows.item(index);
        meal.date = moment(meal.date, 'x').format('D/M/yyyy');
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

  removeMeal(mealId) {
    DB.removeMeal(mealId).then(res => {

      showMessage({
        type: 'success',
        message: 'Meal deleted',
      });

      this.getMeals(Format.randomKey());

    }).catch(err => {
      showMessage({
        type: 'error',
        message: 'Error occured',
        description: err.message
      })
    })

  }

  getMealsOverview() {
    const {meals} = this.state;
    return meals.map(meal => {
      return <MealOverview meal={meal} key={'meal-'+meal.rowid} removeMeal={mealId => this.removeMeal(mealId)}></MealOverview>
    })
  }

  render() {
    const {id} = this.state;
    const mealsOverview = this.getMealsOverview()
    return (
      <SafeAreaView style={{minHeight: 450}} key={id}>
      <ScrollView style={styles.viewStyle2}>
        {mealsOverview}
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
