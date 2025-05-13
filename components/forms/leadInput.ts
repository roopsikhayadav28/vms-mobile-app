import {makeVar, ReactiveVar} from '@apollo/client'
import {LeadRef, LeadSource} from '../../generated/hooks_and_more'

type LeadInputVarType = Array<LeadRef>
export const leadInputVar: ReactiveVar<LeadInputVarType> =
  makeVar<LeadInputVarType>([
    // Default state when no form has added any kind of inputs yet
    {id: 'new'},
  ])

type RemarksInputVar = {regNo: string; remarks: string}[]
export const remarksInputVar: ReactiveVar<RemarksInputVar> =
  makeVar<RemarksInputVar>([])

type CapturedLocalUrlVar = {url: string | undefined}
export const capturedLocalUrlVar: ReactiveVar<CapturedLocalUrlVar> =
  makeVar<CapturedLocalUrlVar>({url: undefined})
