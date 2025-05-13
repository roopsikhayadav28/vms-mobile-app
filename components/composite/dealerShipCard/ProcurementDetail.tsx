import DealershipDetailCard from './DealershipDetailCard'

const ProcurementDetail = () => {
  const procurementDetail: {key: string; value: string}[] = [
    {key: 'Registration no ', value: ''},
    {key: 'Sourced by  ', value: ''},
    {key: 'Sourced on ', value: ''},
    {key: 'Delivered by ', value: ''},
    {key: 'Delivered on ', value: ''},
    {key: 'Delivered at ', value: ''},
  ]
  return (
    <DealershipDetailCard
      data={procurementDetail}
      leftCardLabel="Procurement Detail"
    />
  )
}
export default ProcurementDetail
