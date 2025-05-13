import {LazyQueryExecFunction} from '@apollo/client'
import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {Searchbar} from 'react-native-paper'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import {
  CentreFilter,
  Exact,
  FilterLeadsQuery,
  LeadFilter,
  UserRole,
  VehicleFilter,
} from '../generated/hooks_and_more'
import useLoggedInUser from '../hooks/useLoggedInUser'
import useUserToken from '../hooks/useUserToken'
import Filter from './Filter'
import Icon from './basic/Icon'
import {Row} from './basic/StyledView'

type ListHeaderProps = {
  onClearSearchText?: () => void
  onFinishTypingSearchText?: (text: string) => void
  onApplyingFilter?: (data) => void
  getFilteredData?: LazyQueryExecFunction<
    FilterLeadsQuery,
    Exact<{
      leadFilter?: LeadFilter
      vehicleFilter?: VehicleFilter
      centreFilter?: CentreFilter
    }>
  >
  setIsFilterApplied?: React.Dispatch<React.SetStateAction<boolean>>
}

const ListHeaderComponent = ({
  onClearSearchText,
  onFinishTypingSearchText,
  onApplyingFilter,
  getFilteredData,
  setIsFilterApplied,
}: ListHeaderProps) => {
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)
  const [searchText, setSearchText] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)

  function onChangeText(text: string) {
    if (!text || text.length <= 0) {
      setSearchText('')
      onClearSearchText()
    } else {
      setSearchText(text)
    }
  }
  function onFinishTypingStuff() {
    onFinishTypingSearchText(searchText)
  }
  function onPressFilterIcon() {
    // actionSheetRef.current?.show()
    setShowFilter(value => !value)
  }
  return (
    <View style={styles.searchBarContainerStyle}>
      <Row>
        <View style={{flex: 1}}>
          <Searchbar
            value={searchText}
            placeholder={'Try make model and more'}
            style={styles.searchBarStyle}
            onChangeText={onChangeText}
            onBlur={onFinishTypingStuff}
            onSubmitEditing={onFinishTypingStuff}
            right={() =>
              loggedInUser?.role !== UserRole.ProcurementExecutive &&
              loggedInUser?.role !== UserRole.Driver && (
                <Icon
                  iconName={showFilter ? 'close' : 'filter-list'}
                  onPress={onPressFilterIcon}
                  style={{
                    paddingRight: Layout.baseSize,
                  }}
                  size={Layout.baseSize * 1.25}
                />
              )
            }
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: Layout.baseSize,
            marginRight: Layout.baseSize / 2,
          }}></View>
      </Row>
      <View style={{display: showFilter ? 'flex' : 'none'}}>
        <Filter
          onApplyingFilter={onApplyingFilter}
          getFilteredData={getFilteredData}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          setIsFilterApplied={setIsFilterApplied}
        />
      </View>
    </View>
  )
}

export default ListHeaderComponent

const styles = StyleSheet.create({
  searchBarStyle: {
    margin: Layout.baseSize * 0.5,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'grey',
    backgroundColor: Colors.light.background,
  },
  searchBarContainerStyle: {marginBottom: Layout.baseSize * 0.5},
})
