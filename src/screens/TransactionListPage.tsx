import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import useTransactions from '../hooks/useTransactions';
import { RootStackParamList } from '../../App';
import { useDebounce } from '../hooks/useDebounce';
import { formatDate, getStatusColor, getStatusText } from '../utils/helpers/textFormatter';
import SortModal, { SortOption } from '../components/SortModal';

type TransactionListNavigationProp = StackNavigationProp<RootStackParamList, 'TransactionList'>;

type Props = {
  navigation: TransactionListNavigationProp;
};

const TransactionListPage: React.FC<Props> = ({ navigation }) => {
  const { transactions, loading } = useTransactions();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name_asc');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const debouncedSetSearchQuery = useDebounce((query: string) => {
    setSearchQuery(query);
  }, 500);

  const handleSort = (option: SortOption) => {
    setSortOption(option);
  };

  const handleSortOption = (option: SortOption) => {
    handleSort(option);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const filteredTransactions = React.useMemo(() => {
    const query = searchQuery.toLowerCase();

    const filtered = transactions.filter((transaction) => {
      const nameMatch = transaction.beneficiary_name.toLowerCase().includes(query);
      const senderBankMatch = transaction.sender_bank.toLowerCase().includes(query);
      const beneficiaryBankMatch = transaction.beneficiary_bank.toLowerCase().includes(query);
      const amountMatch = transaction.amount.toString().includes(searchQuery);
      return nameMatch || senderBankMatch || beneficiaryBankMatch || amountMatch;
    });

    return filtered.sort((a, b) => {
      if (sortOption === 'name_asc') {
        return a.beneficiary_name.localeCompare(b.beneficiary_name);
      } else if (sortOption === 'name_desc') {
        return b.beneficiary_name.localeCompare(a.beneficiary_name);
      } else if (sortOption === 'date_newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
    });
  }, [transactions, searchQuery, sortOption]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchInput}>
        <TextInput
          style={styles.inputContainer}
          placeholder="Search by name, bank, amount..."
          defaultValue={searchQuery}
          onChangeText={debouncedSetSearchQuery}
        />
        <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.sortButtonText}>Urutkan</Text>
        </TouchableOpacity>
      </View>

      <SortModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onSelectSortOption={handleSortOption}
        currentSortOption={sortOption}
      />

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.transactionItem, { borderLeftColor: getStatusColor(item.status) }]}
            onPress={() => navigation.navigate('Detail', { transaction: item })}
          >
            <Text style={styles.transactionText}>
              {item.sender_bank.toUpperCase()} ➔ {item.beneficiary_bank.toUpperCase()}
            </Text>
            <View style={styles.sectionMid}>
              <Text style={styles.transactionText}>{item.beneficiary_name}</Text>
              <View
                style={[{ backgroundColor: getStatusColor(item.status) }, styles.statusContainer]}
              >
                <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
              </View>
            </View>
            <View style={styles.textThird}>
              <Text style={styles.transactionText}>
                Rp{item.amount.toLocaleString('id-ID')} •{' '}
              </Text>
              <Text style={styles.transactionText}>
                {formatDate(item.created_at)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TransactionListPage;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  inputContainer: { flex: 1 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginBottom: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortButtonText: {
    color: '#F06D3A',
    fontSize: 16,
  },
  transactionItem: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 7,
    borderRadius: 5,
    borderLeftWidth: 5,
  },
  transactionText: { fontSize: 16 },
  statusText: { fontSize: 16, color: 'white', fontWeight: '500' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  textThird: { flexDirection: 'row' },
  sectionMid: { marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between' },
  statusContainer: { paddingVertical: 3, paddingHorizontal: 5, borderRadius: 3 },
});
