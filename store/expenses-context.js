import {createContext, useReducer} from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-07-19'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2023-07-05'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2023-07-01'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2023-07-19'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2023-07-18'),
  },
  {
    id: 'e6',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-07-19'),
  },
  {
    id: 'e7',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2023-07-05'),
  },
  {
    id: 'e8',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2023-07-01'),
  },
  {
    id: 'e9',
    description: 'A book',
    amount: 14.99,
    date: new Date('2023-07-19'),
  },
  {
    id: 'e10',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2023-07-18'),
  },
];

const type = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
}

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({ description, amount, date}) => {},
  deleteExpenses: (id) => {},
  updateExpenses: (id, {description, amount, date}) => {},
});

function expensesReducer(state, action){
  switch (action.type){
    case type.ADD:
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id}, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
  const addExpenses = (expenseData) => {
    dispatch({type: type.ADD, payload: expenseData});
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
    deleteExpenses:deleteExpenses,
    updateExpenses:updateExpenses,
  }


  return (
    <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
  )
}
