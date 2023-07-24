import {View, StyleSheet} from 'react-native';
import {useContext, useLayoutEffect, useState} from "react";
import IconButton from '../components/UI/IconButton'
import {GlobalStyles} from "../styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpense, storeExpense, updateExpense} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
export default function ManageExpense({ route, navigation}){
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoding] = useState(false);
  const [isError, setIsError] = useState(false);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expenseData = isEditing ? expensesCtx.expenses.find(expense => expense.id === editedExpenseId) : {};

  const deleteExpenseHandler = async () => {
    try {
      setIsLoding(true);
      const res = await deleteExpense(editedExpenseId);
      if (res.status === 200 || res.status === '200')
        expensesCtx.deleteExpenses(editedExpenseId);
    } catch (e) {
      console.error(e);
    }
    setIsLoding(false);
    expensesCtx.deleteExpenses(editedExpenseId);
    navigation.goBack();
  }
  const cancelHandler = () => {
    navigation.goBack();
  }
  const confirmHandler = async (expenseData) => {
    setIsLoding(true);
      try {
        if (isEditing) {
          const res = await updateExpense(editedExpenseId, expenseData);
          if (res.status === 200 || res.status === '200')
            expensesCtx.updateExpenses(editedExpenseId, {...res.data});
        } else {
          const id = await storeExpense(expenseData);
          expensesCtx.addExpenses({...expenseData, id: id});
        }
      }catch (e){
        setIsError('Something went wrong! Please try again later.');
      }
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  },[navigation, isEditing])

  if(isError){
    return (
      <ErrorOverlay message={isError}/>
    )
  }

  if(isLoading){
    return (<LoadingOverlay />)
  }

  return (
    <View style={styles.container}>
      <ExpenseForm onSubmit={confirmHandler} onCancel={cancelHandler} submitButtonLabel={isEditing ? 'Edit' : 'Add'} defaultValue={expenseData}/>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton icon="trash" size={36} color={GlobalStyles.colors.error500} onPress={deleteExpenseHandler}/>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer:{
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  }
})
