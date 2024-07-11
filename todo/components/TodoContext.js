import React, { createContext, useState, useContext, useEffect } from 'react';
import { createTodo, readTodos, deleteTodo, getTodos } from './TodosService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadLocalRawResource } from 'react-native-svg';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


const TODOS_KEY = 'todos';
const COMPLETED_KEY = 'completed';
const GOALS_KEY = 'goal';
// Create a context for theme
export const TodoContext = createContext(1);

// Create a provider component
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [completedThisWeek, setCompletedThisWeek] = useState([]);
  const [goal, setGoal] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    //run on day change even if user has the app open
    getGoal()
    removeTodosCompletedBeforeToday()
    const onDayChange = () => {
      console.log('Day changed!');
      removeTodosCompletedBeforeToday()
      // Add your code here to perform actions on day change
    };

    const intervalId = setInterval(() => {
      const now = new Date();
      if (now.getDate() !== currentDate.getDate()) {
    //if (now.getHours() !== currentDate.getHours()) {
        onDayChange();
        setCurrentDate(now);
      }
    }, 60000); // Check every minute (60000 ms)

    return () => clearInterval(intervalId);
    //DELETE YESTERDAYS TODOS ON INITIAL COMPONENT MOUNT IF COMPLETED AND COMPLETION DATE WAS YESTER
    //clearAsyncStorage();
  }, [currentDate]);

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



  /*const beforeToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight to compare only dates
    return date < today;
  };
*/


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



      updatedTodos.sort((a, b) => {
        // Compare importance (higher importance first)
        if (a.importance !== b.importance) {
          return b.importance - a.importance;
        }
        // Compare due_date (earlier due date first)
        const dateA = new Date(a.due_date);
        const dateB = new Date(b.due_date);

        return dateA - dateB;
      });


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

  function isDateInThisWeek(date) {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();
    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
  }

  const removeTodosCompletedBeforeToday = async () => {
    try {
      const get_jsonValue = await AsyncStorage.getItem(TODOS_KEY);
      the_todos = get_jsonValue != null ? JSON.parse(get_jsonValue) : [];
      const newTodos = the_todos.filter(todo => !(todo.completed && beforeToday(new Date(todo.completion_date))));
//keep the todos that are not completed before today (keeps not-completed ones, and ones that were completed today)

      const get_jsonValue2 = await AsyncStorage.getItem(COMPLETED_KEY);
      prev_completed = get_jsonValue2 != null ? JSON.parse(get_jsonValue2) : [];
      //get todos completed this week
      new_completed = prev_completed.filter(todo => todo.completed && isDateInThisWeek(new Date(todo.completion_date)));
      //get todos completed this week, drop last week's
      toThisWeek = the_todos.filter(todo => todo.completed && beforeToday(new Date(todo.completion_date)));
    //
      final_completed = new_completed.concat(toThisWeek)

      var jsonValue1 = JSON.stringify(final_completed);
      await AsyncStorage.setItem(COMPLETED_KEY, jsonValue1);
      setCompletedThisWeek(final_completed)


      newTodos.sort((a, b) => {
        // Compare importance (higher importance first)
        if (a.importance !== b.importance) {
          return b.importance - a.importance;
        }
        // Compare due_date (earlier due date first)
         var dateA = new Date(a.due_date);
         var dateB = new Date(b.due_date);

        return dateA - dateB;
      });


      var jsonValue = JSON.stringify(newTodos);
      await AsyncStorage.setItem(TODOS_KEY, jsonValue);
      console.log('newTodos', newTodos)
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
      console.log('edited', new_todos)
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
    <TodoContext.Provider value={{ todos, completedThisWeek, updateTodo, setTodos, addTodo, removeTodo, toggleTodoCompleted, goal, goalExists, updateGoal, setCompleted }}>
      {children}
    </TodoContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useTodos = () => useContext(TodoProvider);