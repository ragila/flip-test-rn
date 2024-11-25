# Flip Test

## Overview

The Flip Transaction Application testing needs

## Features

### 1. Transaction List Page

- **Display Transactions**: Shows a list of transactions with key details such as sender bank, beneficiary bank, beneficiary name, amount, date, and status.

### 2. Detail Page

- **Transaction Details**: Displays comprehensive information about the selected transaction, including all available fields.

### 3. Performance Optimization

- **Debounced Search**: Implements a debounce mechanism to optimize search performance and reduce unnecessary re-renders.
- **Memoization**: Uses `useMemo` to memoize filtered and sorted transaction lists, improving rendering efficiency.

## Technologies Used

- **React Native**: For building cross-platform mobile applications.
- **TypeScript**: Provides static typing for better code quality and maintenance.
- **React Navigation**: Handles navigation between screens.
- **Custom Hooks**: Implements `useTransactions` and `useDebounce` for state and performance management.
- **No External Utility Libraries**: All date and string manipulations are performed using native JavaScript methods to meet project requirements.

## Project Structure

```
src/
├── components/
│   └── SortModal.tsx           # Modular component for the sorting modal
├── hooks/
│   ├── useDebounce.ts          # Custom hook for debouncing functions
│   └── useTransactions.ts      # Custom hook for fetching transactions
├── screens/
│   ├── DetailPage.tsx          # Screen displaying transaction details
│   └── TransactionListPage.tsx # Screen displaying the list of transactions
├── utils/
│   └── helpers/
│       └── textFormatter.ts    # Utility functions for text formatting
└── App.tsx                     # Entry point of the application
```

## Installation and Setup

### Prerequisites

- **Node.js** (version 12 or higher)
- **npm** or **yarn**
- **React Native CLI**
- **Android Studio** or **Xcode** (for running on emulators or physical devices)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/flip-transaction-app.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd flip-transaction-app
   ```

3. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Link Native Dependencies (If Required)**

   ```bash
   npx react-native link
   ```

5. **Start the Metro Bundler**

   ```bash
   npx react-native start
   ```

6. **Run the Application**

   - For **iOS**:

     ```bash
     npx react-native run-ios
     ```

   - For **Android**:

     ```bash
     npx react-native run-android
     ```

## Usage

- **Search Transactions**: Use the search bar to filter transactions based on name, bank, or amount.
- **Sort Transactions**: Click on the "Urutkan" button to open the sorting modal and select a sort option.
- **View Transaction Details**: Tap on any transaction in the list to view detailed information.


## License

This project is licensed under the **MIT License**.

---