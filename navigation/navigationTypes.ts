import {DrawerScreenProps} from '@react-navigation/drawer'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {
  ImageStage,
  LeadSource,
  LeadStatus,
  PaymentFor,
  VehicleImages,
} from '../generated/hooks_and_more'

export type RootStackParamList = {
  Drawer:
    | {
        screen: 'Leads'
        params: {
          screen: keyof RootStackParamList | keyof LeadStackParamList
          params: {
            regNo: string
            currentStatus: LeadStatus
            lseId: string | null
            leadId: string
          }
        }
      }
    | {
        screen: 'ViewNotificationsDetails'
        params: {
          regNo: string
          currentStatus: LeadStatus
        }
      }
    | undefined
  MessagesScreen: undefined
  PurchaseItemsList: {
    centreId: string
    productName: string
    productId: string
  }
  PurchaseItemsDetails: {
    centreId: string
    purchaseId: string
    requestType: string
    purchaseAt: string
    regNo?: string
  }

  DocumentsCheckList: {
    regNo: string
  }

  LeadDetailsScreenNew: {
    leadId: string
    regNo: string
    currentStatus: LeadStatus
  }
  ViewNotificationsDetails: {
    screen: keyof LeadStackParamList
    params: {
      regNo: string
      currentStatus: LeadStatus
      leadId?: string
      lseId?: string
    }
  }
  LeadProcessScreen: {
    leadId?: string
    regNo?: string
    currentStatus?: LeadStatus
    source?: LeadSource
    onGoBack?: (lse: string, currentStatus: string) => void
    lseId?: string
  }
  Notifications: undefined
  Profile: undefined
  CameraScreen: {
    onCapture: ({
      contentUrl,
      contentType,
    }: {
      contentUrl: string
      contentType: 'image' | 'video'
    }) => void
    isSelfie?: boolean
    isVideo?: boolean
  }
  LoginScreen: undefined
  ViewImageScreen: {
    imageUrl: string
    title?: string
  }
  RaisePaymentRequestScreen: {
    leadId: string
    payFor: PaymentFor
    regNo: string
    currentStatus: LeadStatus
    title: string
    source?: LeadSource.DealershipSale
  }
  ViewVideoScreen: {
    url: string
    title?: string
  }
  ViewPdfScreen: {
    pdfUrl: string
    regNo?: string
    title?: string
  }
  NotFoundScreen: undefined
}

export type LeadStackParamList = {
  AllLeads: undefined

  LeadDetailsScreen: {
    leadId: string
    regNo: string
    currentStatus: LeadStatus
    lseId: string | null
  }
  ProductStagesScreen: undefined
  ViewImagesFilterScreen: {
    regNo: string
    imageStage: ImageStage
    imgKey: [string, string]
    imagesArray: VehicleImages[]
  }
  ViewImagesAtStageScreen: {
    regNo: string
  }
  UploadImagesAtStageScreen: {
    regNo: string
    vehicleImages: VehicleImages
  }
} & RootStackParamList

export type RefurbishmentStackParamList = {
  InStockLeads: undefined

  LeadDetailsScreen: {
    leadId: string
    regNo: string
    currentStatus: LeadStatus
    lseId: string | null
  }
  ProductStagesScreen: undefined
  ViewImagesFilterScreen: {
    regNo: string
    imageStage: ImageStage
    imgKey: [string, string]
    imagesArray: VehicleImages[]
  }
  ViewImagesAtStageScreen: {
    regNo: string
  }
  UploadImagesAtStageScreen: {
    regNo: string
    vehicleImages: VehicleImages
  }
} & RootStackParamList

export type TaskStackParamList = {
  AllTask: undefined
  LeadDetailsScreenFromTask: {
    leadId: string
    regNo: string
    currentStatus: LeadStatus
    lseId: string | null
  }
  ProductStagesScreen: undefined
  ViewImagesFilterScreen: {
    regNo: string
    imageStage: ImageStage
    imgKey: [string, string]
    imagesArray: VehicleImages[]
  }
  ViewImagesAtStageScreen: {
    regNo: string
  }
}

export type DrawerParamList = {
  Leads:
    | {
        screen: keyof LeadStackParamList
        params: {
          leadId: string
          regNo: string
          currentStatus: LeadStatus
        }
      }
    | undefined
  Tasks: undefined
  Profile: undefined
  Analytics: undefined
  Inventory: undefined
  Tools: undefined
  Training: undefined
  Refurbishment:
    | {
        screen: keyof RefurbishmentStackParamList
        params: {
          leadId: string
          regNo: string
          currentStatus: LeadStatus
        }
      }
    | undefined
  BookingList:
    | {
        screen: keyof BookingStackParamList
        params: {
          leadId: string
          regNo: string
          currentStatus: LeadStatus
        }
      }
    | undefined
  LoanServiceList:
    | {
        screen: keyof LoanServiceStackparamList
        params: {
          leadId: string
          regNo: string
          currentStatus: LeadStatus
        }
      }
    | undefined
}

export type BookingStackParamList = {
  BookingLead: undefined

  LeadDetailsScreen: {
    leadId: string
    regNo: string
    currentStatus: LeadStatus
    lseId: string | null
  }
  ProductStagesScreen: undefined
  ViewImagesFilterScreen: {
    regNo: string
    imageStage: ImageStage
    imgKey: [string, string]
    imagesArray: VehicleImages[]
  }
  ViewImagesAtStageScreen: {
    regNo: string
  }
  UploadImagesAtStageScreen: {
    regNo: string
    vehicleImages: VehicleImages
  }
} & RootStackParamList

export type LoanServiceStackparamList = {
  FinancedLeads: undefined

  LeadDetailsScreen: {
    leadId: string
    regNo: string
    currentStatus: LeadStatus
    lseId: string | null
  }
  ProductStagesScreen: undefined
  ViewImagesFilterScreen: {
    regNo: string
    imageStage: ImageStage
    imgKey: [string, string]
    imagesArray: VehicleImages[]
  }
  ViewImagesAtStageScreen: {
    regNo: string
  }
  UploadImagesAtStageScreen: {
    regNo: string
    vehicleImages: VehicleImages
  }
} & RootStackParamList

export type LeadStackScreenProps<Screen extends keyof LeadStackParamList> =
  NativeStackScreenProps<LeadStackParamList, Screen>

export type RefurbishmentStackScreenProps<
  Screen extends keyof RefurbishmentStackParamList,
> = NativeStackScreenProps<RefurbishmentStackParamList, Screen>

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type OurDrawerScreenProps<Screen extends keyof DrawerParamList> =
  DrawerScreenProps<DrawerParamList, Screen>

export type BookingStackScreenProps<
  Screen extends keyof BookingStackParamList,
> = NativeStackScreenProps<BookingStackParamList, Screen>

export type LoanServiceStackScreenProps<
  Screen extends keyof LoanServiceStackparamList,
> = NativeStackScreenProps<LoanServiceStackparamList, Screen>
