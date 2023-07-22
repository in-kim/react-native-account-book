import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";
export default function AllExpenses(){
  const expensesCtx = useContext(ExpensesContext);
  return <ExpensesOutput expensesPeriod="Total" expenses={expensesCtx.expenses}/>
}
