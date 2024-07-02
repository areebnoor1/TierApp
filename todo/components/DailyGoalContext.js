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
      setGoal(goal)
      const jsonValue = JSON.stringify(goal);

      await AsyncStorage.setItem(GOALS_KEY, jsonValue);
      //console.log(goal)
    } else {
      // updateGoal({ streak: 1, last_day_completed: Date.now() })
      goal.streak = 1
      goal.last_day_completed = Date.now()
      setGoal(goal)

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

  return (
    <GoalContext.Provider value={{ goal, goalExists, updateGoal, setCompleted }}>
      {children}
    </GoalContext.Provider>
  );
};
