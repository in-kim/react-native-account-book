import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://react-native-account-book-default-rtdb.firebaseio.com/',
});

export async function storeExpense(expenseData){
  const respones = await instance.post('/expenses.json', expenseData);
  const id = respones.data.name;
  return id;
}

export async function fetchExpenses(){
  try{
    const res = await instance.get('/expenses.json');
    let expenses = [];

    for(let key in res.data){
      expenses.push({id: key, ...res.data[key]});
    }
    return expenses;
  }catch(e){
    console.log(e);
  }
}

export function updateExpense(id, expenses){
  throw Error('error');
  return;
  return instance.put(`expenses/${id}.json`, expenses);
}

export async function deleteExpense(){
  return instance.delete(`expenses/${id}.json`);
}
