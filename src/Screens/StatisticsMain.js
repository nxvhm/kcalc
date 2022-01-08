import React from "react";
import DB from '../Lib/DB';
import { showMessage } from "react-native-flash-message";
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {DateContext} from "../Lib/RouteContext";
import {colors, styles} from '../Styles';
import { Headline } from 'react-native-paper';
import Format from "../Lib/Format";
import DateOverview from '../Components/DateOverview';

class StatisticsMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      data: false,
      id: 0
    }

  }

  componentDidMount() {
    if (this.props.route.params && this.props.route.params.date) {
      let stateDate = this.state.date;
      if (this.props.route.params.date != stateDate) {
        this.getDateData(this.props.route.params.date);
      }
    }
  }

  componentDidUpdate() {
    if (this.props.route.params && this.props.route.params.date) {
      let stateDate = this.state.date;
      if (this.props.route.params.date != stateDate) {
        this.getDateData(this.props.route.params.date);
      }
    }
  }

  getDateData(date) {
    return DB.getMealsForDate(date).then(res => {
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
      this.setState({date, data})
    }).catch(err => {
      showMessage({
        type: 'error',
        message: 'Error occured',
        description: err.message
      })
    })
  }

  dateOverview() {
    let {date, data} = this.state;
    return data ? <DateOverview data={data}></DateOverview> : false;
  }

  dateHeadline() {
    let date = this.state.date;
    return date
      ? <Headline style={{textAlign: 'center', marginTop: 10}}>Meals data for {Format.formattedDate(date)}</Headline>
      : false
  }

  render() {
    return (
      <SafeAreaView style={styles.fullViewStyle}>
        <ScrollView>
          <View>{this.dateHeadline()}</View>
          {this.dateOverview()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
StatisticsMain.contextType = DateContext

export default StatisticsMain
