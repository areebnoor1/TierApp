import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
// Key for the todos array in local storage
const TODOS_KEY = 'todos';

// Helper function to get all todos
const getTodos = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TODOS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch the todos from storage', e);
    return [];
  }
};

// Create a new todo
export const createTodo = async (todo) => {
  try {
    const todos = await getTodos();
    todos.push(todo);
    const jsonValue = JSON.stringify(todos);
    await AsyncStorage.setItem(TODOS_KEY, jsonValue);
    //console.log('saved the todo')
  } catch (e) {
    console.error('Failed to save the todo to storage', e);
  }
};

// Read all todos
export const readTodos = async () => {
  return await getTodos();
};

export const deleteCompletedTodos = async () => {
  try {
    const todos = await getTodos();
    const today = dayjs().format('YYYY-MM-DD');
    const newTodos = todos.filter(todo => !todo.completed || dayjs(todo.key).format('YYYY-MM-DD') === today);
    const jsonValue = JSON.stringify(newTodos);
    await AsyncStorage.setItem(TODOS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to delete completed todos from storage', e);
  }
};

// Update an existing todo
export const updateTodo = async (key, updatedTodo) => {
  try {
    const todos = await getTodos();
    const index = todos.findIndex(todo => todo.key === key);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...updatedTodo };
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem(TODOS_KEY, jsonValue);
    }
  } catch (e) {
    console.error('Failed to update the todo in storage', e);
  }
};

// Delete a todo
export const deleteTodo = async (key) => {
  try {
    const todos = await getTodos();
    const newTodos = todos.filter(todo => todo.key !== key);
    const jsonValue = JSON.stringify(newTodos);
    await AsyncStorage.setItem(TODOS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to delete the todo from storage', e);
  }
};
