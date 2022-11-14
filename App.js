import { StyleSheet, Text, View } from 'react-native';
import MainNavigation from './src/Navigation/MainNavigation';

export default function App() {
  return (
    <MainNavigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
