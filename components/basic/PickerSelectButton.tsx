import React, {useEffect, useState} from 'react'
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import {HelperText, Modal, Portal, TextInput} from 'react-native-paper'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {titleCaseToReadable} from '../../utils/helpers'
import SearchBar from './Searchbar'
import {H3, P1} from './StyledText'
import {Text} from './Themed'

export type Item = {
  label: string
  value: string
}
type PickerSelectButtonProps = {
  value?: string
  placeholder: string
  onValueChange: (value: string, index: number) => void
  items: Item[]
  isRequired?: boolean
  disabled?: boolean
  showSearchBar?: boolean
  stockInStatus?: string
}

export default function PickerSelectButton({
  items,
  onValueChange,
  placeholder,
  value,
  isRequired,
  disabled,
  showSearchBar = false,
  stockInStatus,
}: PickerSelectButtonProps) {
  const [pickerVisible, setPickerVisible] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [searchText, setSearchText] = useState<string>('')
  useEffect(() => {
    if (isRequired && !value && value?.length <= 0) {
      setErrorMessage('This is a required field')
    } else if (errorMessage) {
      setErrorMessage(undefined)
    }
  }, [isRequired, value])

  function openPicker() {
    setPickerVisible(true)
  }
  function closePicker() {
    setPickerVisible(false)
  }
  function onPressModalItem(value: string, index: number) {
    onValueChange(value, index)
    closePicker()
    setSearchText('')
  }
  function handleChangeText(text: string) {
    if (!text || text.length <= 0) {
      setSearchText('')
    } else {
      setSearchText(old => text)
    }
  }

  return (
    <TouchableOpacity onPress={!disabled ? openPicker : undefined}>
      <TextInput
        underlineColor={'white'}
        activeOutlineColor={'black'}
        outlineColor={Colors.light.inputBg}
        mode={'outlined'}
        style={{
          margin: Layout.baseSize * 0.5,
          backgroundColor: Colors.light.inputBg,
        }}
        editable={false}
        // pointerEvents={"box-only"}
        onPressIn={!disabled ? openPicker : undefined}
        label={placeholder}
        value={value && titleCaseToReadable(value)}
        right={
          <TextInput.Icon
            icon={'menu-down'}
            size={Layout.baseSize * 1.8}
            onPress={!disabled ? openPicker : undefined}
            hitSlop={Layout.hitSlop.icon}
            disabled
          />
        }
        // disabled={disabled}
      />
      {!!stockInStatus && (
        <View
          style={{
            paddingTop: 2,
            alignItems: 'flex-end',
            paddingRight: 10,
          }}>
          <Text style={{paddingTop: 4}}>{`Status:${stockInStatus} `}</Text>
        </View>
      )}
      {errorMessage && (
        <HelperText type="error" visible={!!errorMessage}>
          {errorMessage}
        </HelperText>
      )}
      <Portal>
        <Modal
          visible={pickerVisible}
          onDismiss={closePicker}
          contentContainerStyle={styles.modalContentContainer}
          style={styles.modalStyle}>
          <H3>{placeholder}</H3>
          {showSearchBar && (
            <SearchBar
              value={searchText}
              placeholder={placeholder}
              onChangeText={handleChangeText}
            />
          )}
          <ScrollView keyboardShouldPersistTaps={'always'}>
            {/* {listItems} */}
            {items
              ?.filter(i =>
                i.label?.toLowerCase()?.includes(searchText?.toLowerCase()),
              )
              ?.map((i, index) => (
                <TouchableOpacity
                  key={`picker-item-${i?.value}-${index}`}
                  onPress={() => {
                    console.log('i.value', i?.value)
                    onPressModalItem(i?.value, index)
                  }}
                  style={commonStyle.paddingVertical16}>
                  <P1 style={styles.labelStyle}>{i?.label}</P1>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </Modal>
      </Portal>
      {/* <Picker
        ref={pickerRef as LegacyRef<Picker<string>> | undefined}
        selectedValue={value}
        onValueChange={onValueChange}
        mode="dialog"
      >
        {items?.map((i) => (
          <Picker.Item {...i} />
        ))}
      </Picker> */}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  picker: {
    borderRadius: Layout.baseSize * 0.25,
    backgroundColor: Colors.light.background,
    height: Layout.baseSize * 6,
    // margin: Layout.baseSize * 0.5,
  },
  modalStyle: {flex: 1, marginVertical: Layout.baseSize * 2},
  modalContentContainer: {
    backgroundColor: Colors.light.background,
    padding: Layout.baseSize,
    marginTop: Layout.baseSize * 2,
    marginBottom: Layout.baseSize * 5,
    marginHorizontal: Layout.baseSize * 2,
    borderRadius: Layout.baseSize / 4,
  },
  labelStyle: {height: Layout.baseSize * 1.2},
})
