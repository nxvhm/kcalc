import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {colors, styles} from '../Styles';
import DB from '../Lib/DB';
import { showMessage } from "react-native-flash-message";
import moment from "moment";
import MealOverview from '../Components/MealOverview';
import Format from '../Lib/Format';
import { FAB,  ActivityIndicator, Colors } from 'react-native-paper';

moment.suppressDeprecationWarnings = true;

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      meals: [],
      loading: true
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
    this.setState({loading: true});

    DB.getMeals().then(res => {
      let meals = [];

      for (let index = 0; index < res.rows.length; index++) {
        let meal = res.rows.item(index);
        meal.formatDate = moment(meal.date, 'x').format('D/M/yyyy');
        meal.products = JSON.parse(meal.products);
        meals.push(meal);
      }

      this.setState({id, meals, loading: false});

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
      return <MealOverview
        key={'meal-'+meal.rowid}
        meal={meal}
        removeMeal={mealId => this.removeMeal(mealId)}
        dateDetails={date => this.dateDetails(date)}
      />
    })
  }

  dateDetails(date) {
    this.props.navigation.navigate('Statistics', {
      screen: 'StatisticsMain',
      params: {date}
    });
  }

  render() {
    const {id, loading} = this.state;
    const mealsOverview = this.getMealsOverview()
    return (
      <SafeAreaView style={styles.fullViewStyle} key={id}>
        {loading &&
          <View style={styles.loading}>
            <ActivityIndicator animating={true} size={'large'} color={Colors.purple800} />
          </View>
        }
      <ScrollView style={styles.viewStyle2}>
        {mealsOverview}
      </ScrollView>
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          left: 0,
          bottom: 0,
          backgroundColor:colors.purple,
          color: '#fff'
        }}
        small
        icon="reload"
        onPress={() => console.log('Pressed')}
      />

      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor:colors.purple,
          color: colors.white
        }}
        small
        icon="plus"
        onPress={() => this.props.navigation.navigate('AddMeal')}
      />

      </SafeAreaView>
    );
  }
}

export default HomeScreen;
