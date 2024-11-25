import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TransactionListPage from './src/screens/TransactionListPage';
import DetailPage from './src/screens/DetailPage';
import { Transaction } from './src/hooks/useTransactions';

export type RootStackParamList = {
  TransactionList: undefined;
  Detail: { transaction: Transaction };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TransactionList">
        <Stack.Screen name="TransactionList" component={TransactionListPage} options={{ title: 'Transactions' }} />
        <Stack.Screen name="Detail" component={DetailPage} options={{ title: 'Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
