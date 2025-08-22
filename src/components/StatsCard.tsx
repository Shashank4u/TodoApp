import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TodoStats } from '../types/TodoTypes';

interface StatsCardProps {
  stats: TodoStats;
}

const StatsCard: React.FC<StatsCardProps> = React.memo(({ stats }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.total}</Text>
        <Text style={styles.statLabel}>Total</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.active}</Text>
        <Text style={styles.statLabel}>Active</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.completed}</Text>
        <Text style={styles.statLabel}>Completed</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    backgroundColor: '#eee',
    marginHorizontal: 8,
  },
});

export default StatsCard;
