import React from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import { Button, IconButton, Card } from 'react-native-paper';
import Section from '../Components/Section';
import {colors, styles} from '../Styles';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={{minHeight: 450}}>
      <ScrollView style={styles.viewStyle2}>

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
          onPress={() => this.props.navigation.navigate('AddMeal')}
      />

      </SafeAreaView>
    );
  }
}

export default HomeScreen;
