import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TodoItem, SortOption, FilterOption } from '../types/TodoTypes';

interface TodoState {
  todos: TodoItem[];
  loading: boolean;
  error: string | null;
  sortBy: SortOption;
  filterBy: FilterOption;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  sortBy: 'most_recent',
  filterBy: 'all'
};

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20');
    
    const todosWithTimestamps = response.data.map((todo: any) => ({
      ...todo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
    
    return todosWithTimestamps;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: TodoItem = {
        id: Date.now(),
        title: action.payload.trim(),
        completed: false,
        userId: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      state.todos.unshift(newTodo);
    },

    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updated_at = new Date().toISOString();
      }
    },

    updateTodo: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const todo = state.todos.find(t => t.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title.trim();
        todo.updated_at = new Date().toISOString();
      }
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },

    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },

    setFilterBy: (state, action: PayloadAction<FilterOption>) => {
      state.filterBy = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to fetch todos';
      });
  }
});

export const {
  addTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
  setSortBy,
  setFilterBy,
  clearError
} = todoSlice.actions;

export default todoSlice.reducer;

export const selectAllTodos = (state: { todos: TodoState }) => state.todos.todos;
export const selectLoading = (state: { todos: TodoState }) => state.todos.loading;
export const selectError = (state: { todos: TodoState }) => state.todos.error;
export const selectSortBy = (state: { todos: TodoState }) => state.todos.sortBy;
export const selectFilterBy = (state: { todos: TodoState }) => state.todos.filterBy;

export const selectFilteredAndSortedTodos = (state: { todos: TodoState }) => {
  const { todos, filterBy, sortBy } = state.todos;
  
  let filteredTodos = todos;
  
  if (filterBy === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (filterBy === 'done') {
    filteredTodos = todos.filter(todo => todo.completed);
  }
  
  if (sortBy === 'most_recent') {
    return [...filteredTodos].sort((a, b) => 
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  } else if (sortBy === 'id') {
    return [...filteredTodos].sort((a, b) => a.id - b.id);
  }
  
  return filteredTodos;
};

export const selectTodoStats = (state: { todos: TodoState }) => {
  const { todos } = state.todos;
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const active = total - completed;
  
  return { total, completed, active };
};
