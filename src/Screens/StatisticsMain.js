import React from "react";
import DB from '../Lib/DB';
import { showMessage } from "react-native-flash-message";
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import { Button } from 'react-native-paper';
import {DateContext} from "../Lib/RouteContext";
import {colors, styles} from '../Styles';
import { Headline } from 'react-native-paper';
import Format from "../Lib/Format";


class StatisticsMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      data: false
    }

  }

  componentDidMount() {
    console.log('mounteed');
  }

  getDateData() {
    return DB.getMealsForDate(this.context).then(res => {
      let data = {
        meals: [],
        calories: 0,
        carbs: 0,
        fats: 0,
        sugar: 0,
        protein: 0
      };

      for (let index = 0; index < res.rows.length; index++) {
        let meal = res.rows.item(index);
        data.meals.push(meal);
        ['calories', 'carbs', 'sugar', 'fats', 'protein'].forEach(nutrition => {
          data[nutrition] += Format.decimalAdjust('round', meal[nutrition], -1);
        })
      }
      // this.setState({data})
      return Promise.resolve(data);
    }).catch(err => {
      showMessage({
        type: 'error',
        message: 'Error occured',
        description: err.message
      })
    })
  }


  dateHeadline() {
    let date = this.context;
    return date
      ? <Headline style={{textAlign: 'center', marginTop: 10}}>Meals data for {Format.formattedDate(date)}</Headline>
      : false
  }

  render() {
    console.log(this.props.route);
    return (
      <SafeAreaView style={styles.fullViewStyle}>
        <ScrollView>
          <View>{this.dateHeadline()}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
StatisticsMain.contextType = DateContext

export default StatisticsMain
