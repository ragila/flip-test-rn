import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface SortModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectSortOption: (option: SortOption) => void;
  currentSortOption: SortOption;
}

export type SortOption = 'name_asc' | 'name_desc' | 'date_newest' | 'date_oldest';

const SortModal: React.FC<SortModalProps> = ({
  isVisible,
  onClose,
  onSelectSortOption,
  currentSortOption,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Urutkan Berdasarkan</Text>
          <TouchableOpacity style={styles.buttonContainerSort} onPress={() => onSelectSortOption('name_asc')}>
            <View style={[styles.inactiveRadio, currentSortOption === 'name_asc' && styles.activeRadio]} />
            <Text style={styles.modalOption}>
              Nama A-Z
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainerSort} onPress={() => onSelectSortOption('name_desc')}>
          <View style={[styles.inactiveRadio, currentSortOption === 'name_desc' && styles.activeRadio]} />
            <Text style={styles.modalOption}>
              Nama Z-A
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainerSort} onPress={() => onSelectSortOption('date_newest')}>
            <View style={[styles.inactiveRadio, currentSortOption === 'date_newest' && styles.activeRadio]} />
            <Text style={styles.modalOption}>
              Tanggal Terbaru
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainerSort} onPress={() => onSelectSortOption('date_oldest')}>
            <View style={[styles.inactiveRadio, currentSortOption === 'date_oldest' && styles.activeRadio]} />
            <Text style={styles.modalOption}>
              Tanggal Terlama
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <Text style={styles.modalCloseButtonText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SortModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 12,
    textAlign: 'left',
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
  },
  modalCloseButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  inactiveRadio: {
    width: 20,
    height: 20,
    borderRadius: 20/2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F06D3A',
    marginRight: 5,
  },
  activeRadio: {
    width: 20,
    height: 20,
    borderRadius: 20/2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F06D3A',
    marginRight: 5,
  },
  buttonContainerSort: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
