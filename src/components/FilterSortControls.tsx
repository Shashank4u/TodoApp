import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SortOption, FilterOption } from '../types/TodoTypes';

interface FilterSortControlsProps {
  sortBy: SortOption;
  filterBy: FilterOption;
  onSortChange: (sortOption: SortOption) => void;
  onFilterChange: (filterOption: FilterOption) => void;
}

const FilterSortControls: React.FC<FilterSortControlsProps> = React.memo(({
  sortBy,
  filterBy,
  onSortChange,
  onFilterChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sort by:</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.button,
              sortBy === 'most_recent' && styles.buttonActive
            ]}
            onPress={() => onSortChange('most_recent')}
          >
            <Text style={[
              styles.buttonText,
              sortBy === 'most_recent' && styles.buttonTextActive
            ]}>
              Most Recent
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.button,
              sortBy === 'id' && styles.buttonActive
            ]}
            onPress={() => onSortChange('id')}
          >
            <Text style={[
              styles.buttonText,
              sortBy === 'id' && styles.buttonTextActive
            ]}>
              By ID
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filter by:</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.button,
              filterBy === 'all' && styles.buttonActive
            ]}
            onPress={() => onFilterChange('all')}
          >
            <Text style={[
              styles.buttonText,
              filterBy === 'all' && styles.buttonTextActive
            ]}>
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.button,
              filterBy === 'active' && styles.buttonActive
            ]}
            onPress={() => onFilterChange('active')}
          >
            <Text style={[
              styles.buttonText,
              filterBy === 'active' && styles.buttonTextActive
            ]}>
              Active
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.button,
              filterBy === 'done' && styles.buttonActive
            ]}
            onPress={() => onFilterChange('done')}
          >
            <Text style={[
              styles.buttonText,
              filterBy === 'done' && styles.buttonTextActive
            ]}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    minWidth: 80,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  buttonTextActive: {
    color: '#fff',
  },
});

export default FilterSortControls;
