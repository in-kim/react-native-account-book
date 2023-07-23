import {View, Text, StyleSheet} from 'react-native';
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {GlobalStyles} from "../../styles";

export default function ExpensesOutput({expenses, expensesPeriod, fallBackText}){
  let content = <Text style={styles.infoText}>{fallBackText}</Text>

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
      {
        expenses.length > 0 ? <ExpensesList expenses={expenses}/>
        : <View style={styles.container}>{content}</View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32
  }
})
