import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import {useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDays} from "../util/date";
import {fetchExpenses} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
export default function RecentExpenses(){
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoding] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoding(true);
      try{
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (e){
        setError(e.message);
      }
      setIsLoding(false);
    }
    getExpenses();
  }, [])

  if(error){
    return (
      <ErrorOverlay message={error}/>
    )
  }

  if(isLoading){
    return (
      <LoadingOverlay />
    )
  }
  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const date7DayAgo = getDateMinusDays(today, 7);

    return (expense.date >= date7DayAgo) && (expense.date <= today);
  })
  return <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recentExpenses} fallBackText="No expenses registered for the last 7 days."/>
}
