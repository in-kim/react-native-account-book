import {View, Text, FlatList} from 'react-native';
import ExpensesItem from "./ExpenseItem";
function renderExpenseItem(itemData){
  return (
    <ExpensesItem {...itemData.item}/>
  )
}

export default function ExpensesList({expenses}){
  return (
    <View>
      <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id}/>
    </View>
  )
}
