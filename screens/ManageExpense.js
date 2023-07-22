import {View, StyleSheet} from 'react-native';
import {useLayoutEffect} from "react";
import IconButton from '../components/UI/IconButton'
import {GlobalStyles} from "../styles";
import Button from "../components/UI/Button";
export default function ManageExpense({ route, navigation}){
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const deleteExpenseHandler = () => {
    navigation.goBack();
  }
  const cancelHandler = () => {
    navigation.goBack();
  }
  const confirmHandler = () => {
    navigation.goBack();
  }


  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  },[navigation, isEditing])
  return (
    <View style={styles.container}>
      <View style={styles.bottons}>
        <Button mode="flat" style={styles.botton} onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.botton} onPress={confirmHandler}>Confirm</Button>
      </View>
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
  bottons:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  botton:{
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer:{
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  }
})
