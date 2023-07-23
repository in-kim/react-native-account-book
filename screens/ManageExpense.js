import {View, StyleSheet} from 'react-native';
import {useContext, useLayoutEffect} from "react";
import IconButton from '../components/UI/IconButton'
import {GlobalStyles} from "../styles";
import Button from "../components/UI/Button";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
export default function ManageExpense({ route, navigation}){
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expenseData = isEditing ? expensesCtx.expenses.find(expense => expense.id === editedExpenseId) : {};

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpenses(editedExpenseId);
    navigation.goBack();
  }
  const cancelHandler = () => {
    navigation.goBack();
  }
  const confirmHandler = (expenseData) => {
    if(isEditing){
      expensesCtx.updateExpenses(editedExpenseId, {...expenseData});
    }else{
      expensesCtx.addExpenses(expenseData);
    }
    navigation.goBack();
  }


  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  },[navigation, isEditing])
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
