import React, { createContext, useState, useContext, useEffect } from 'react';
import { createTodo, readTodos, deleteTodo, getTodos } from './TodosService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadLocalRawResource } from 'react-native-svg';

const GOALS_KEY = 'goal';
export const GoalContext = createContext(1);
// minutes_tasks, hours_tasks, days_tasks, completed: false, last_goal_refresh

export const GoalProvider = ({ children }) => {
  const [goal, setGoal] = useState({});

  useEffect(() => {
    getGoal()
  }, []);

  const goalExists = () => {
    console.log('goal', Object.keys(goal).length)
    return Object.keys(goal).length === 0 ? false:true
  }

  const updateGoal = async (updatedGoal) => {
    try {
     /* console.log(goal)
      console.log(updatedGoal)
      new_goal = () => ({
        ...goal,
        ...updatedGoal
      })*/

      for (const key in updatedGoal) {
        if (updatedGoal.hasOwnProperty(key)) {
          goal[key] = updatedGoal[key];
        }
      }

      const jsonValue = JSON.stringify(goal);

      console.log(goal)
      setGoal(goal)
      await AsyncStorage.setItem(GOALS_KEY, jsonValue);
    } catch (e) {
      console.error('Failed to update the todo in storage', e);
    }
  };

  const getGoal = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(GOALS_KEY);
      setGoal(jsonValue != null ? JSON.parse(jsonValue) : {});
    } catch (e) {
      console.error('Failed to fetch the todos from storage', e);
      return setGoal({});
    }
  };

  return (
    <GoalContext.Provider value={{ goal, goalExists, updateGoal }}>
      {children}
    </GoalContext.Provider>
  );
};
