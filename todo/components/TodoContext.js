import React, { createContext, useState, useContext, useEffect } from 'react';
import { createTodo, readTodos, deleteTodo, getTodos } from './TodosService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadLocalRawResource } from 'react-native-svg';

const TODOS_KEY = 'todos';
// Create a context for theme
export const TodoContext = createContext(1);

// Create a provider component
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
    console.log('loaded todos', todos)
  }, []);


  const getTodos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(TODOS_KEY);
      setTodos(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.error('Failed to fetch the todos from storage', e);
      return setTodos([]);
    }
  };

  const addTodo = async (new_todo) => {
    try {
      createTodo(new_todo)
      const updatedTodos = [...todos, new_todo];
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error saving todos to AsyncStorage:', error);
    }
  };

  const saveTodosToStorage = async (updatedTodos) => {
    AsyncStorage.setItem('todos', JSON.stringify(updatedTodos))
      .then(() => {
        setTodos(updatedTodos); // Update todos state after saving to AsyncStorage
      })
      .catch(error => {
        console.error('Error saving todos to AsyncStorage:', error);
      });
  };



    const removeTodo = async (key) => {
      try {
        const newTodos = todos.filter(todo => todo.key !== key);
        const jsonValue = JSON.stringify(newTodos);
        await AsyncStorage.setItem(TODOS_KEY, jsonValue);
        setTodos(newTodos)
      } catch (e) {
        console.error('Failed to delete the todo from storage', e);
      }
    };

    const updateTodo = async (key, updatedTodo) => {
      try {
        const index = todos.findIndex(todo => todo.key === key);
        if (index !== -1) {
          todos[index] = { ...todos[index], ...updatedTodo };
          const jsonValue = JSON.stringify(todos);
          console.log('updates', todos)
          setTodos(todos)
          await AsyncStorage.setItem(TODOS_KEY, jsonValue);
        }
      } catch (e) {
        console.error('Failed to update the todo in storage', e);
      }
    };

    const toggleTodoCompleted = async (key) => {
      //console.log('toggled')
      const todo = todos.find(todo => todo.key === key);
      updateTodo(key, { completed: !todo.completed });
      
      //console.log('posttoggle', todos)
    };
  


  return (
    <TodoContext.Provider value={{ todos,updateTodo, setTodos, addTodo, removeTodo, toggleTodoCompleted }}>
      {children}
    </TodoContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useTodos = () => useContext(TodoProvider);