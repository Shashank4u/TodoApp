export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  created_at: string;
  updated_at: string;
}

export interface NewTodoItem {
  title: string;
  userId: number;
}

export type SortOption = 'most_recent' | 'id';
export type FilterOption = 'all' | 'active' | 'done';

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
}
