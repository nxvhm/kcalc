import { openDatabase } from 'react-native-sqlite-storage';

let db = openDatabase({ name: 'kcalc.db' });