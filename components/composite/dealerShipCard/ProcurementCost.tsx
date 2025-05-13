import DealershipDetailCard from './DealershipDetailCard'

const ProcurementCostDetail = () => {
  const procurementCostDetail: {key: string; value: string}[] = [
    {key: 'Total Cost ', value: ''},
    {key: 'Deal Amount  ', value: ''},
    {key: 'Parking Amount ', value: ''},
    {key: 'Expense Amount ', value: ''},
  ]
  return (
    <DealershipDetailCard
      data={procurementCostDetail}
      leftCardLabel="Procurement Cost"
    />
  )
}
export default ProcurementCostDetail
