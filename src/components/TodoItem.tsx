import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { TodoItem as TodoItemType } from '../types/TodoTypes';

interface TodoItemProps {
  todo: TodoItemType;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const TodoItem: React.FC<TodoItemProps> = React.memo(({ 
  todo, 
  onToggle, 
  onDelete, 
  onEdit 
}) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleValue }] }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.checkbox,
          todo.completed && styles.checkboxCompleted
        ]}
        onPress={onToggle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {todo.completed && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.contentContainer}
        onPress={onEdit}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.title,
            todo.completed && styles.titleCompleted
          ]}
          numberOfLines={2}
        >
          {todo.title}
        </Text>
        <Text style={styles.timestamp}>
          Updated {formatTimestamp(todo.updated_at)}
        </Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onEdit}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.actionButtonText}>✏️</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={onDelete}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 6,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  checkboxCompleted: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: '#f8f9fa',
  },
  deleteButton: {
    backgroundColor: '#fff5f5',
  },
  actionButtonText: {
    fontSize: 16,
  },
  deleteButtonText: {
    fontSize: 16,
  },
});

export default TodoItem;
