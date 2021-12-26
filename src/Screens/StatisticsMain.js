import React from "react";
import DB from '../Lib/DB';
import { showMessage } from "react-native-flash-message";
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import { Button } from 'react-native-paper';
import {DateContext} from "../Lib/RouteContext";



class StatisticsMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null
    }

  }

  componentDidMount() {
    console.log('mounteed');
    this.props.navigation.setOptions({
      headerRight: () => {
        return <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>Select date</Button>
      }
    });
  }




  render() {
    let date = this.context;

      let dateBtn = date ? <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>{date}</Button>
       : null;
    return (
      <SafeAreaView>
        <ScrollView>
          <View><Text>Statistics view here</Text></View>
          {dateBtn}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
StatisticsMain.contextType = DateContext

export default StatisticsMain
