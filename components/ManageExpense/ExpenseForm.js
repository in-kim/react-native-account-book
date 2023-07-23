import {View, Text, Alert, StyleSheet} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDate} from "../../util/date";
import {GlobalStyles} from "../../styles";

export default function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValue}){
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue.amount ? defaultValue.amount.toString() : '',
      isValid: true,
    },
    date: {
      value:defaultValue.date ? getFormattedDate(defaultValue.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValue.description ? defaultValue.description : '',
      isValid: true,
    },
  });
  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((curInputvalues) => {
      return {
        ...curInputvalues,
        [inputIdentifier]: {value: enteredValue, isValid: true}
      }
    })
  };

  const submitHandler = () => {
    const expenseData = {
      amount : +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid Input','Please check your input values');
      setInputs((curInputs) => {
        return {
          amount: {
            value: curInputs.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: curInputs.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        }
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;
  return (
    <View>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCorrect: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
        invalid={!inputs.description.isValid}
      />

      {formIsValid && <Text style={styles.errorText}>Invalid Input values - please Check your entered date!</Text>}

      <View style={styles.bottons}>
        <Button mode="flat" style={styles.botton} onPress={onCancel}>Cancel</Button>
        <Button style={styles.botton} onPress={submitHandler}>{submitButtonLabel}</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form:{
    marginTop: 40
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput:{
    flex:1,
  },
  errorText:{
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  bottons:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  botton:{
    minWidth: 120,
    marginHorizontal: 8,
  },
})
