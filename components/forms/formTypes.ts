import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
} from '@apollo/client'
import { Dispatch, SetStateAction } from 'react'
import {
  CreateLeadStatusEventMutation,
  Exact,
  LeadRef,
  LeadSource,
  LeadStatus,
  UserRole,
} from '../../generated/hooks_and_more'
import { RootStackScreenProps } from '../../navigation/navigationTypes'

export type AddLSEMutationFnType = (
  options?:
    | MutationFunctionOptions<
        CreateLeadStatusEventMutation,
        Exact<{
          lead: LeadRef
          status: LeadStatus
          myId: string
          createdAt: any
          remarks?: string | undefined
          metadata?: string
        }>,
        DefaultContext,
        ApolloCache<any>
      >
    | undefined,
) => Promise<any>

export type FormProps = {
  leadId: string | undefined
  regNo: string
  createLeadStatusEvent: AddLSEMutationFnType
  currentStatus: LeadStatus | undefined
  desiredStatus: LeadStatus
  undesiredStatus?: LeadStatus | undefined
  desiredButtonText: string
  undesiredButtonText?: string
  backStatus?: LeadStatus
  assignTo: UserRole
  hasPopup: boolean
  isPopupWithRemark?: boolean
  isPopupWithFields?: boolean
  positivePopupTitle: string
  negativePopupTitle: string
  positivePopupDescription: string
  negativePopupDescription: string
  canGoForward?: boolean
  hideUndesiredButton?: boolean
  // TODO: Type the screen navigator
  navigation: RootStackScreenProps<'LeadProcessScreen'>['navigation']
  source?: LeadSource
  postTimeline?: string
  preTimeline?: string
  onGoBack?: (lse: string, currentStatus: string) => void
}

export type formDataValidityProps = {
  isFormValid: Array<boolean>
  setIsFormValid: Dispatch<SetStateAction<boolean[]>>
}
