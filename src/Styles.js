import React from 'react';
import {StyleSheet} from 'react-native';

const colors = {
  purple: '#673AB7',
  blue: '#1976D2',
  red: '#F44336',
  green: '#4CAF50',
  white: '#FFFFFF'
};

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },

    productCard: {
      marginBottom: 5,
      marginTop: 5
    },

    viewStyle: {
      padding: 5
    },

    viewStyle2: {
      padding: 15,
      backgroundColor: '#fff',
    },

    bottomBtn: {
      backgroundColor: colors.purple,
      marginBottom: 30,
      marginTop: 15
    }
});
export {styles}

export {colors}

