import { useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  amount: number;
  unique_code: number;
  status: string;
  sender_bank: string;
  account_number: string;
  beneficiary_name: string;
  beneficiary_bank: string;
  remark: string;
  created_at: string;
  completed_at: string;
  fee: number;
}

const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://recruitment-test.flip.id/frontend-test')
      .then((response) => response.json())
      .then((data) => {
        const transactionsArray = Object.values(data) as Transaction[];
        setTransactions(transactionsArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      });
  }, []);

  return { transactions, loading };
};

export default useTransactions;
