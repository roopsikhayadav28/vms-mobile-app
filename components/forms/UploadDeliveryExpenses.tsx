import {DateTimePickerEvent} from '@react-native-community/datetimepicker'
import React, {useState} from 'react'
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import {IS_MANDATORY_FIELD} from '../../constants/constants'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {ExpenseCategory, LeadExpense} from '../../generated/hooks_and_more'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import {enumToItems, log} from '../../utils/helpers'
import Button from '../basic/Button'
import {Input} from '../basic/Input'
import PickerSelectButton from '../basic/PickerSelectButton'
import RNFilerUploader from '../basic/RNFileUploader'
import Separator from '../basic/Separator'
import {H3} from '../basic/StyledText'
import {FieldId} from '../../utils/FieldValidator'
import {Text} from 'react-native'
import Colors from '../../constants/Colors'

type FormComponentProps = {leadId: string | undefined; expenseCount: number}

const UploadDeliveryExpenses = ({
  leadId = 'new',
  expenseCount = 1,
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)

  // TODO: Query expense categories
  const [expenses, setExpenses] = useState([
    {
      expCategory: '',
      expDate: new Date(),
      expAmount: '',
      description: '',
      document: '',
    },
  ])

  function getExpenseDetails(index: number) {
    //log('this show index value', index)
    const relevantExpense = leadInput?.expenses?.[index]
    //log('this return obj based on index', relevantExpense)
    //log('lead input at upload delivery expense', leadInput)

    return relevantExpense
  }

  // const expenseCategory =
  //   leadInput &&
  //   leadInput?.expenses &&
  //   leadInput?.expenses.length > 0 &&
  //   leadInput?.expenses[0]?.category
  // const expenseDescription = leadInput?.expenses?.[0]?.description

  // const expenseAmount =
  //   leadInput &&
  //   leadInput?.expenses &&
  //   leadInput?.expenses.length > 0 &&
  //   leadInput?.expenses[0]?.spentAmount
  // const expenseDate =
  //   leadInput &&
  //   leadInput?.expenses &&
  //   leadInput?.expenses.length > 0 &&
  //   leadInput?.expenses[0]?.createdAt
  // const proofUrl = leadInput?.expenses?.[0]?.receiptUrl

  // const [expenseCategory, setExpenseCategory] = useState<string>();
  // const [expenseDescription, setExpenseDescription] = useState<string>();
  // const [expenseAmount, setExpenseAmount] = useState<string>();
  // const [expenseDate, setExpenseDate] = useState<Date>(new Date());
  const newExpenses = leadInput?.expenses?.slice() ?? []

  const lastExpense = leadInput?.expenses?.[0]
  function onExpenseCategoryChange(value: string, index: number) {
    if (index < newExpenses.length) {
      newExpenses[index].category = value as ExpenseCategory
    } else {
      newExpenses.push({category: value as ExpenseCategory})
    }
    setLeadInput({
      ...leadInput,
      expenses: newExpenses,
    })
  }

  function onExpenseDescriptionChange(value: string, index: number) {
    if (index < newExpenses.length) {
      newExpenses[index].description = value
    } else {
      newExpenses.push({description: value})
    }
    setLeadInput({
      ...leadInput,
      expenses: newExpenses,
    })
  }

  function onExpenseAmountChange(value: string, index: number) {
    //log('this is new expenses', newExpenses)
    if (index < newExpenses.length) {
      newExpenses[index].spentAmount = Number(value)
    } else {
      newExpenses.push({spentAmount: Number(value)})
    }
    setLeadInput({
      ...leadInput,
      expenses: newExpenses,
    })
  }

  function onExpenseDateChange(
    event: DateTimePickerEvent,
    index: number,
    date?: Date,
  ) {
    setLeadInput({
      ...leadInput,
      expenses: [
        ...leadInput?.expenses,
        {...getExpenseDetails(index), createdAt: date},
      ],
    })
  }

  function onAddingExpenseProof(value: string, index: number) {
    if (index < newExpenses.length) {
      newExpenses[index].receiptUrl = value
    } else {
      newExpenses.push({receiptUrl: value})
    }
    setLeadInput({
      ...leadInput,
      expenses: newExpenses,
    })
    // setLeadInput({
    //   ...leadInput,
    //   expenses: [{...lastExpense, receiptUrl: value}],
    // })
  }

  function addExpense() {
    var newArray = [
      ...expenses,
      {
        expCategory: '',
        expDate: new Date(),
        expAmount: '',
        description: '',
        document: '',
      },
    ]

    setExpenses(newArray)

    onExpenseCategoryChange(undefined, newArray?.length)
    // expenseCount = newExpenses?.length
    // log(' length of array', leadInput?.expenses?.length)
    // incr(idx + 1);
    // console.log(expenses.length);
    // setExampleState(newArray);
    // changeEl(newArray);
  }

  function handleOnRemoveExpense(index: number): void {
    setExpenses(expenses.filter((_, i) => i !== index))
    setLeadInput({
      ...leadInput,
      expenses: leadInput?.expenses?.filter((_, i) => i !== index),
    })
  }

  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView>
        {expenses.map((item, index) => {
          return (
            <View key={index}>
              <Separator size={1} />
              <View style={styles.expenseContainer}>
                <View>
                  <H3 style={{marginLeft: Layout.baseSize}}>
                    EXPENSE {index + 1}
                  </H3>
                </View>
                {!!index && (
                  <TouchableOpacity
                    style={styles.removeButtonStyle}
                    onPress={() => handleOnRemoveExpense(index)}>
                    <Text style={styles.removeTextStyle}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>
              <PickerSelectButton
                isRequired={IS_MANDATORY_FIELD}
                placeholder={'Expense Category *'}
                // value={item.expCategory}
                key={index}
                value={getExpenseDetails(index)?.category as string}
                onValueChange={value => onExpenseCategoryChange(value, index)}
                items={enumToItems(ExpenseCategory)}
              />
              {leadInput?.expenses?.[index]?.category === 'OTHERS' && (
                <Input
                  label="Expense Description *"
                  value={getExpenseDetails(index)?.description}
                  // value={expenseDescription}
                  onChangeText={value =>
                    onExpenseDescriptionChange(value, index)
                  }
                  isRequired={IS_MANDATORY_FIELD}
                />
              )}
              <Input
                label="Expense Amount *"
                value={getExpenseDetails(index)?.spentAmount?.toString()}
                // value={expenseAmount?.toString()}
                onChangeText={value => onExpenseAmountChange(value, index)}
                keyboardType={'number-pad'}
                isRequired={IS_MANDATORY_FIELD}
              />

              {/* <DatePicker
                placeholder="Expense Date"
                value={getExpenseDetails(index)?.createdAt}
                // value={expenseDate}
                onChange={(value)=>onExpenseDateChange(event,value,index)}
              /> */}
              <RNFilerUploader
                variant="docs"
                documentId={FieldId.DELIVERY_EXPENSES_PAYMENT_PROOF}
                header="Expense Proof"
                title="Upload Document"
                saveDoc={value => onAddingExpenseProof(value, index)}
                isRequired={IS_MANDATORY_FIELD}
                value={leadInput?.expenses?.[index]?.receiptUrl}
              />
            </View>
          )
        })}
        <Separator size={1} />
        <Button variant="text" title="Add More +" onPress={addExpense} />
        <Separator size={1} />
      </ScrollView>

      {/* <Row style={commonStyle.buttonView}>
        <Button variant="primary" type="enable" title="Submit Delivery" />
      </Row> */}
    </View>
  )
}

export default UploadDeliveryExpenses

const styles = StyleSheet.create({
  expenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeButtonStyle: {paddingTop: 4, paddingRight: 16},
  removeTextStyle: {color: Colors.light.red},
})
