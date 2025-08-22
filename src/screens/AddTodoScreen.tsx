import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppDispatch } from '../stores/hooks';
import { addTodo } from '../stores/todoSlice';

type AddTodoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddTodo'>;

const AddTodoScreen: React.FC = () => {
  const navigation = useNavigation<AddTodoScreenNavigationProp>();
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    const trimmedTitle = title.trim();
    
    if (!trimmedTitle) {
      Alert.alert('Error', 'Please enter a todo title');
      return;
    }

    if (trimmedTitle.length < 3) {
      Alert.alert('Error', 'Todo title must be at least 3 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      dispatch(addTodo(trimmedTitle));
      
      Alert.alert(
        'Success',
        'Todo added successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to add todo. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (title.trim()) {
      Alert.alert(
        'Discard Changes',
        'Are you sure you want to discard your changes?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          { 
            text: 'Discard', 
            style: 'destructive',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Add New Todo</Text>
            <Text style={styles.subtitle}>
              Create a new task to keep track of your goals
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Todo Title</Text>
              <TextInput
                style={styles.textInput}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter your todo title..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
                maxLength={200}
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
              <Text style={styles.characterCount}>
                {title.length}/200 characters
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
                disabled={isSubmitting}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button, 
                  styles.submitButton,
                  (!title.trim() || isSubmitting) && styles.submitButtonDisabled
                ]}
                onPress={handleSubmit}
                disabled={!title.trim() || isSubmitting}
              >
                <Text style={styles.submitButtonText}>
                  {isSubmitting ? 'Adding...' : 'Add Todo'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Tips for better todos:</Text>
            <Text style={styles.tipText}>• Be specific and actionable</Text>
            <Text style={styles.tipText}>• Keep it concise but clear</Text>
            <Text style={styles.tipText}>• Set realistic expectations</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    backgroundColor: '#000',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  tipsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 20,
  },
});

export default AddTodoScreen;
