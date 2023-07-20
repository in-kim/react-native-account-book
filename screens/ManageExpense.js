import {Text} from 'react-native';
import {useLayoutEffect} from "react";
export default function ManageExpense({ route, navigation}){
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  },[navigation, isEditing])
  return <Text>ManageExpense</Text>
}
