import React from 'react';
import {
    Text,
    View
} from 'react-native';

import { Button } from 'react-native-paper';
import Section from '../Components/Section';

const HomeScreen = ({ navigation }) => {  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Section title="Hello world, home screen">
          <Text>Example simple text</Text>
        </Section>
        {/* <Button  mode="contained" onPress={() => navigation.navigate('Profile', { name: 'Jane' })}> 
          Go to Jane's profile
        </Button>        
        <Button onPress={() => navigation.navigate('Details')}>Details</Button>    */}
      </View>
    );
};

export default HomeScreen;