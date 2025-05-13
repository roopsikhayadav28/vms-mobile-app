import {useReactiveVar} from '@apollo/client'
import {useCallback} from 'react'
import {
  capturedLocalUrlVar,
  leadInputVar,
  remarksInputVar,
} from '../components/forms/leadInput'
import {LeadRef} from '../generated/hooks_and_more'
import {log} from '../utils/helpers'

export default function useUpdateLeadInput(id: string) {
  const leadInputs = useReactiveVar(leadInputVar)
  const leadInput = leadInputs?.find(li => li.id === id) ?? {...leadInputs[0]}

  const setLeadInput = useCallback(
    (input: LeadRef) => {
      if (!!input?.id) {
        leadInputVar([input, ...leadInputs.filter(l => l.id !== input?.id)])
      } else
        leadInputVar([
          {id: 'new', ...input},
          ...leadInputs.filter(l => l.id !== 'new'),
        ])
    },
    [leadInputVar, leadInputs, id],
  )
  // log(`current leadInput object at useUpdateLeadInput for id ${id}`, leadInputs)

  // log('leadInput inside useUpdateLeadInput hook', leadInput)
  return {
    leadInput,
    setLeadInput,
  }
}

export function useUpdateRemarksInput(regNo: string) {
  // log('Reg no inside useUpdateRemarksInput hook', regNo)
  const allRemarks = useReactiveVar(remarksInputVar)

  // Not required
  // const remarks = allRemarks?.find(r => r.regNo === regNo)

  // NOTE: This will make sure that always the first remarks object is returned which is the latest one
  // Tested after making this changes and it works as expected
  const remarks = allRemarks[0]

  const setRemarks = useCallback(
    (str: string) => {
      // log('all remarks inside useCallback', allRemarks)
      remarksInputVar([
        {regNo, remarks: str},
        ...allRemarks?.filter(r => r.regNo !== regNo),
      ])
    },

    [regNo, allRemarks],
  )
  // log('all remarks inside hook', allRemarks[0]?.remarks)
  return {
    remarks,
    setRemarks,
  }
}

export function useCapturedLocalUrlInput() {
  const capturedLocalUrl = useReactiveVar(capturedLocalUrlVar)

  const setCapturedLocalUrl = useCallback((str: string | undefined) => {
    log('cheking in hook', str)
    capturedLocalUrlVar({url: str})
  }, [])
  // log('url inside local Captured Url', capturedLocalUrl)

  return {
    capturedLocalUrl,
    setCapturedLocalUrl,
  }
}
