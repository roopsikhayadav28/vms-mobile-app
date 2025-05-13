import {useGetFinalParkingQuery} from '../../generated/hooks_and_more'
import {log} from '../../utils/helpers'

export const useFinalParkingExpenses = (id: string) => {
  const {data, loading, error} = useGetFinalParkingQuery({
    variables: {
      id: id,
    },
    onCompleted(data) {
      log('expense ammount', data)
    },
  })

  return {
    data,
    loading,
    error,
  }
}
