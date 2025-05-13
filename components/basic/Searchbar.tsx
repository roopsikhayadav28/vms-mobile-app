import React from 'react'
import {StyleSheet} from 'react-native'
import {Searchbar} from 'react-native-paper'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {View} from './Themed'

type SearchbarProps = {
  value: string
  onChangeText?: (text: string) => void
  placeholder?: string
  onBlur?: () => void
  onSubmitEditing?: () => void
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder,
}: SearchbarProps) {
  return (
    <View style={styles.searchBarContainerStyle}>
      <Searchbar
        value={value}
        placeholder={placeholder ?? 'Search'}
        style={styles.searchBarStyle}
        onChangeText={onChangeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchBarStyle: {
    margin: Layout.baseSize * 0.5,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'grey',
    backgroundColor: Colors.light.background,
  },
  searchBarContainerStyle: {marginBottom: Layout.baseSize * 0.5},
})
