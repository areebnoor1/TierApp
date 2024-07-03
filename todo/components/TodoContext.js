import React, { createContext, useState, useContext, useEffect } from 'react';
import { createTodo, readTodos, deleteTodo, getTodos } from './TodosService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadLocalRawResource } from 'react-native-svg';

const TODOS_KEY = 'todos';
const GOALS_KEY = 'goal';
// Create a context for theme
export const TodoContext = createContext(1);

// Create a provider component
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [goal, setGoal] = useState({});

  useEffect(() => {
    //DELETE YESTERDAYS TODOS ON INITIAL COMPONENT MOUNT IF COMPLETED AND COMPLETION DATE WAS YESTER
    //clearAsyncStorage();
    getGoal()
    removeTodosCompletedBeforeToday()
  }, []);



  const goalExists = () => {
    //console.log('goal', Object.keys(goal).length)
    return Object.keys(goal).length === 0 ? false : true
  }

  const updateGoal = async (updatedGoal) => {
    try {
      new_goal = {
        ...goal,
        ...updatedGoal
      }

      const jsonValue = JSON.stringify(new_goal);
      setGoal(new_goal)
      await AsyncStorage.setItem(GOALS_KEY, jsonValue);
    } catch (e) {
      console.error('Failed to update the todo in storage', e);
    }
  };


  const isYesterday = (date) => {
    const d = new Date(date)
    const t = new Date();
    const today = new Date(t.setHours(0, 0, 0, 0))
    const comparison = new Date(d.setHours(0, 0, 0, 0))
    return today.getDate() - 1 == comparison.getDate()
  };


  const setCompleted = async () => {
    if ('last_day_completed' in goal && isYesterday(goal.last_day_completed)) {
      //updateGoal({ streak: goal.streak + 1, last_day_completed: Date.now() })
      goal.streak = goal.streak + 1
      goal.last_day_completed = Date.now()
      //setGoal(goal)
      const jsonValue = JSON.stringify(goal);

      await AsyncStorage.setItem(GOALS_KEY, jsonValue);
      //console.log(goal)
    } else {
      // updateGoal({ streak: 1, last_day_completed: Date.now() })
      goal.streak = 1
      goal.last_day_completed = Date.now()
     // setGoal(goal)

      const jsonValue = JSON.stringify(goal);

      await AsyncStorage.setItem(GOALS_KEY, jsonValue);
    }
  }

  const getGoal = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(GOALS_KEY);
      setGoal(jsonValue != null ? JSON.parse(jsonValue) : {});
    } catch (e) {
      console.error('Failed to fetch the todos from storage', e);
      return setGoal({});
    }
  };



  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully.');
    } catch (e) {
      console.error('Failed to clear AsyncStorage.');
    }
  };



  const beforeToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight to compare only dates
    return date < today;
  };



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

      //g('postadd', updatedTodos)
    } catch (error) {
      console.error('Error saving todos to AsyncStorage:', error);
    }
  };

  /* const saveTodosToStorage = async (updatedTodos) => {
     AsyncStorage.setItem('todos', JSON.stringify(updatedTodos))
       .then(() => {
         setTodos(updatedTodos); // Update todos state after saving to AsyncStorage
       })
       .catch(error => {
         console.error('Error saving todos to AsyncStorage:', error);
       });
   };*/


  const removeTodosCompletedBeforeToday = async () => {
    try {
      const get_jsonValue = await AsyncStorage.getItem(TODOS_KEY);
      the_todos = get_jsonValue != null ? JSON.parse(get_jsonValue) : [];
      const newTodos = the_todos.filter(todo => !(todo.completed && beforeToday(new Date(todo.completion_date))));
      const jsonValue = JSON.stringify(newTodos);
      await AsyncStorage.setItem(TODOS_KEY, jsonValue);
      setTodos(newTodos)
    } catch (e) {
      console.error('Failed to remove todos completed before today', e);
    }
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
      new_todos = todos.map(todo => {
        if (todo.key === key) {
          return { ...todo, ...updatedTodo };
        } else {
          return todo;
        }
      }
      )
      const jsonValue = JSON.stringify(new_todos);
      setTodos(new_todos)
      await AsyncStorage.setItem(TODOS_KEY, jsonValue);
    } catch (e) {
      console.error('Failed to update the todo in storage', e);
    }
  };

  const makeProgressDayTask = async (key, updatedTodo) => {

  }

  const toggleTodoCompleted = async (key) => {
    try {
      new_todos = todos.map(todo => {
        if (todo.key === key) {
          return { ...todo, completed: !todo.completed, completion_date: Date.now() };
        } else {
          return todo;
        }
      }
      )
      const jsonValue = JSON.stringify(new_todos);
      setTodos(new_todos)
      await AsyncStorage.setItem(TODOS_KEY, jsonValue);
    } catch (e) {
      console.error('Failed to update the todo in storage', e);
    }
  };



  return (
    <TodoContext.Provider value={{ todos, updateTodo, setTodos, addTodo, removeTodo, toggleTodoCompleted, goal, goalExists, updateGoal, setCompleted }}>
      {children}
    </TodoContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useTodos = () => useContext(TodoProvider);
