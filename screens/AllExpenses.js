import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import {useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {fetchExpenses} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
export default function AllExpenses(){
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoding] = useState(false);
  const [isError, setError] = useState(null);

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

  if(isError){
    return (
      <ErrorOverlay message={isError}/>
    )
  }

  if(isLoading){
    return (
      <LoadingOverlay />
    )
  }

  return <ExpensesOutput expensesPeriod="Total" expenses={expensesCtx.expenses} fallBackText="No registered expenses found!"/>
}
