import {createContext, useReducer} from 'react';

const type = {
  ADD: 'ADD',
  SET: 'SET',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
}

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: (expenses) => {},
  setExpenses: (expenses) => {},
  deleteExpenses: (id) => {},
  updateExpenses: (id, {description, amount, date}) => {},
});

function expensesReducer(state, action){
  switch (action.type){
    case type.ADD:
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id}, ...state];
    case type.SET:
      return action.payload.reverse();
    case type.UPDATE:
      const updateExpenses = [...state];
      const updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
      const updateItem = {...state[updatableExpenseIndex], ...action.payload.data};
      updateExpenses[updatableExpenseIndex] = updateItem;
      return updateExpenses;
    case type.DELETE:
      return state.filter(expense => expense.id !== action.payload);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({children}){
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const addExpenses = (expenseData) => {
    dispatch({type: type.ADD, payload: expenseData});
  }
  const setExpenses = (expenses) => {
    dispatch({type: type.SET, payload: expenses});
  }
  const updateExpenses = (id, expenseData) => {
    dispatch({type: type.UPDATE, payload: {id, data: expenseData}});
  }
  const deleteExpenses = (id) => {
    dispatch({type: type.DELETE, payload: id});
  }

  const value = {
    expenses: expensesState,
    addExpenses:addExpenses,
    setExpenses:setExpenses,
    deleteExpenses:deleteExpenses,
    updateExpenses:updateExpenses,
  }


  return (
    <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
  )
}
