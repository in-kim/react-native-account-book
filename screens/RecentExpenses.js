import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDays} from "../util/date";
export default function RecentExpenses(){
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const date7DayAgo = getDateMinusDays(today, 7);

    return (expense.date >= date7DayAgo) && (expense.date <= today);
  })
  return <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recentExpenses}/>
}
