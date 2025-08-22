import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { 
  fetchTodos, 
  deleteTodo, 
  updateTodo,
  setSortBy,
  setFilterBy,
  clearError,
  toggleTodo,
  selectFilteredAndSortedTodos,
  selectTodoStats
} from '../stores/todoSlice';
import TodoItem from '../components/TodoItem';
import StatsCard from '../components/StatsCard';
import FilterSortControls from '../components/FilterSortControls';
import { TodoItem as TodoItemType } from '../types/TodoTypes';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const MainScreen: React.FC = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.todos);
  const loading = useAppSelector(state => state.todos.loading);
  const error = useAppSelector(state => state.todos.error);
  const sortBy = useAppSelector(state => state.todos.sortBy);
  const filterBy = useAppSelector(state => state.todos.filterBy);
  const filteredAndSortedTodos = useAppSelector(selectFilteredAndSortedTodos);
  const stats = useAppSelector(selectTodoStats);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchTodos());
    setRefreshing(false);
  };

  const handleDeleteTodo = (id: number, title: string) => {
    Alert.alert(
      'Delete Todo',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => dispatch(deleteTodo(id))
        },
      ]
    );
  };

  const handleEditTodo = (id: number, currentTitle: string) => {
    Alert.prompt(
      'Edit Todo',
      'Enter new title:',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Save', 
          onPress: (newTitle: string | undefined) => {
            if (newTitle && newTitle.trim()) {
              dispatch(updateTodo({ id, title: newTitle }));
            }
          }
        },
      ],
      'plain-text',
      currentTitle
    );
  };

  const renderTodoItem = ({ item }: { item: TodoItemType }) => (
    <TodoItem
      todo={item}
      onToggle={() => dispatch(toggleTodo(item.id))}
      onDelete={() => handleDeleteTodo(item.id, item.title)}
      onEdit={() => handleEditTodo(item.id, item.title)}
    />
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading todos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => dispatch(fetchTodos())}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatsCard stats={stats} />

      <FilterSortControls
        sortBy={sortBy}
        filterBy={filterBy}
        onSortChange={(sortOption) => dispatch(setSortBy(sortOption))}
        onFilterChange={(filterOption) => dispatch(setFilterBy(filterOption))}
      />

      <FlatList
        data={filteredAndSortedTodos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.todoList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#000']}
            tintColor="#000"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No todos found</Text>
            <Text style={styles.emptySubtext}>
              {filterBy === 'all' 
                ? 'Add your first todo!' 
                : `No ${filterBy} todos found`
              }
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTodo')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  todoList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default MainScreen;
