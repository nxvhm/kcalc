import React from 'react';
import {StyleSheet} from 'react-native';

const colors = {
  purple: '#673AB7',
  blue: 'blue',
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
      marginTop: 5,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: colors.purple,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
    },

    viewStyle: {
      padding: 5
    },

    viewStyle2: {
      padding: 15,
      backgroundColor: '#fff',
    },

    fullViewStyle: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },

    bottomBtn: {
      backgroundColor: colors.purple,
      marginBottom: 30,
      marginTop: 15
    },

    mealNutritionsOverview: {
      flexDirection: 'row',
      flexGrow: 4,
      justifyContent: 'space-between',
      marginTop: 3
    },

    loading: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
});
export {styles}

export {colors}

