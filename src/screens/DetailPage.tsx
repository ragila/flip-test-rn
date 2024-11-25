import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../App';
import { formatDate } from '../utils/helpers/textFormatter';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

type DetailNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>;

type Props = {
  route: DetailRouteProp;
  navigation: DetailNavigationProp;
};

const DetailPage: React.FC<Props> = ({ route }) => {
  const { transaction } = route.params;

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text>Transaction not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ID TRANSAKSI: #{transaction.id}</Text>

      <View style={styles.subTitleContainer}>
        <Text>DETAIL TRANSAKSI</Text>
        <TouchableOpacity>
          <Text style={{color: '#F06D3A'}}>TUTUP</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: 20}}>
        <Text style={styles.infoTitle}>
          {transaction.sender_bank.toUpperCase()} ➔ {transaction.beneficiary_bank.toUpperCase()}
        </Text>
        <View style={styles.infoContainer}>
          <View style={styles.subLeftInfoContainer}>
            <Text style={styles.infoTitle}>{transaction.beneficiary_name}</Text>
            <Text style={styles.infoText}>{transaction.account_number}</Text>
          </View>
          <View style={styles.subInfoContainer}>
            <Text style={styles.infoTitle}>NOMINAL</Text>
            <Text style={styles.infoText}>{transaction.amount}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.subLeftInfoContainer}>
            <Text style={styles.infoTitle}>BERITA TRANSFER</Text>
            <Text style={styles.infoText}>{transaction.remark}</Text>
          </View>
          <View style={styles.subInfoContainer}>
            <Text style={styles.infoTitle}>KODE UNIK</Text>
            <Text style={styles.infoText}>{transaction.unique_code}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.subLeftInfoContainer}>
            <Text style={styles.infoTitle}>WAKTU DIBUAT</Text>
            <Text style={styles.infoText}>{formatDate(transaction.created_at)}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: 'white', flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 16 },
  infoContainer: {marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'},
  infoTitle: { fontSize: 16, fontWeight: '600' },
  infoText: { fontSize: 16 },
  subTitleContainer: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingTop: 15, paddingBottom: 20 },
  subInfoContainer: { width: '50%', paddingLeft: 20 },
  subLeftInfoContainer: { width: '50%' },
});
