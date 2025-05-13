import {useEffect} from 'react'
import {
  AddModelByMakeInput,
  useSeedModelByMakeMutation,
} from '../generated/hooks_and_more'
import {log} from '../utils/helpers'

export default function useSeedModelByMake() {
  const input: AddModelByMakeInput[] = seedData?.map(i => ({
    make: i['Brand Name'],
    model: i['Model Name'],
  }))
  const [seedModelByMake] = useSeedModelByMakeMutation({
    variables: {
      input,
    },
    onCompleted: ({addModelByMake}) => {
      log('seeded model by make', addModelByMake)
    },
  })
  useEffect(() => {
    seedModelByMake()
  }, [])
}

const seedData = [
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '1030 DI MAHA SHAKTI',
    'Tractors id': '78',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5050 E',
    'Tractors id': '79',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '242',
    'Tractors id': '80',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'ARJUN NOVO 605 DI�i-4WD',
    'Tractors id': '81',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '265 DI',
    'Tractors id': '82',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI-854 NG',
    'Tractors id': '84',
  },
  {
    'Brand Name': 'Captain',
    'Model Name': '120 DI',
    'Tractors id': '85',
  },
  {
    'Brand Name': 'Captain',
    'Model Name': '120 DI-4WD',
    'Tractors id': '86',
  },
  {
    'Brand Name': 'Captain',
    'Model Name': '200 DI',
    'Tractors id': '87',
  },
  {
    'Brand Name': 'Captain',
    'Model Name': '200 DI-4WD',
    'Tractors id': '88',
  },
  {
    'Brand Name': 'Captain',
    'Model Name': '250 DI',
    'Tractors id': '89',
  },
  {
    'Brand Name': 'Captain',
    'Model Name': '250 DI-4WD',
    'Tractors id': '90',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI-350+',
    'Tractors id': '91',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI-350NG',
    'Tractors id': '92',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI-450+',
    'Tractors id': '93',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI-550+',
    'Tractors id': '94',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI-550 STAR',
    'Tractors id': '95',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI-550 NG',
    'Tractors id': '96',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI-450 NG',
    'Tractors id': '97',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '245 DI',
    'Tractors id': '98',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '5245 DI PLANETARY PLUS V1',
    'Tractors id': '101',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Yuvraj 215 NXT',
    'Tractors id': '102',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '255 DI Power plus',
    'Tractors id': '103',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '275 DI ECO',
    'Tractors id': '104',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '265 DI POWER PLUS',
    'Tractors id': '105',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '275 DI TU',
    'Tractors id': '106',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '595 DI TURBO',
    'Tractors id': '107',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '415 DI',
    'Tractors id': '108',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '295 DI SUPER TURBO',
    'Tractors id': '109',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '475 DI',
    'Tractors id': '110',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '575 DI',
    'Tractors id': '111',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '245 DI Orchard',
    'Tractors id': '112',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Arjun Novo 605 Di-i 2 WD',
    'Tractors id': '113',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Arjun Novo 605 Di-ps',
    'Tractors id': '114',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '245 DI MAHA SHAKTI',
    'Tractors id': '115',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '9000 PLANETARY PLUS',
    'Tractors id': '116',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '241 DI MAHA SHAKTI',
    'Tractors id': '117',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '5245 DI PLANETARY PLUS',
    'Tractors id': '118',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '241 DI PLANETARY PLUS',
    'Tractors id': '119',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '9500 2WD',
    'Tractors id': '120',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '1035 DI MAHA SHAKTI',
    'Tractors id': '121',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '7250',
    'Tractors id': '122',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '1035 DI',
    'Tractors id': '124',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '241 DI MAHAAN',
    'Tractors id': '126',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '5245 MAHA MAHAAN',
    'Tractors id': '127',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '241',
    'Tractors id': '128',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '312',
    'Tractors id': '129',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '333',
    'Tractors id': '130',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '368',
    'Tractors id': '131',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '380',
    'Tractors id': '132',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '5150 SUPER DI',
    'Tractors id': '133',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '5660 SUPER DI',
    'Tractors id': '134',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '480',
    'Tractors id': '136',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '485',
    'Tractors id': '137',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '364',
    'Tractors id': '138',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5075E-4WD',
    'Tractors id': '139',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5065E',
    'Tractors id': '140',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5060 E',
    'Tractors id': '141',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5055 E',
    'Tractors id': '142',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5050 D',
    'Tractors id': '143',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5045 D',
    'Tractors id': '144',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5042 D',
    'Tractors id': '145',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5039 D',
    'Tractors id': '147',
  },
  {
    'Brand Name': 'Force',
    'Model Name': 'ORCHARD MINI',
    'Tractors id': '148',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'YUVO 275 DI',
    'Tractors id': '156',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'YUVO 415 DI',
    'Tractors id': '157',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'YUVO 475 DI',
    'Tractors id': '158',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'YUVO 575 DI',
    'Tractors id': '159',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'CHAMPION 35',
    'Tractors id': '162',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'CHAMPION XP 41',
    'Tractors id': '164',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '45',
    'Tractors id': '165',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '60',
    'Tractors id': '166',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '6065 Supermaxx',
    'Tractors id': '169',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '6050 Executive Ultramaxx',
    'Tractors id': '171',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '434',
    'Tractors id': '173',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '425 DS',
    'Tractors id': '174',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '439 DS Super Saver',
    'Tractors id': '175',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '724 XM',
    'Tractors id': '177',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '724 XM ORCHARD',
    'Tractors id': '178',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '825 XM',
    'Tractors id': '179',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '834 XM',
    'Tractors id': '180',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '735 FE',
    'Tractors id': '181',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '735 XM',
    'Tractors id': '182',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '841 XM',
    'Tractors id': '183',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '843 XM',
    'Tractors id': '184',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '744 FE',
    'Tractors id': '185',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '744 XM',
    'Tractors id': '186',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '855 FE',
    'Tractors id': '187',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '855 XM',
    'Tractors id': '188',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '2030 DI',
    'Tractors id': '189',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '2042 DI',
    'Tractors id': '191',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '3035 DI',
    'Tractors id': '192',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '3040 DI',
    'Tractors id': '193',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '3048 DI 2wd',
    'Tractors id': '194',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '3055 NV',
    'Tractors id': '195',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '3055 DI',
    'Tractors id': '196',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '3065 DI',
    'Tractors id': '197',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '4175 DI 2 WD',
    'Tractors id': '198',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '4190 DI - 2WD',
    'Tractors id': '200',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '4190 DI 4WD',
    'Tractors id': '201',
  },
  {
    'Brand Name': 'Force',
    'Model Name': 'ORCHARD DELUXE',
    'Tractors id': '202',
  },
  {
    'Brand Name': 'Force',
    'Model Name': 'BALWAN 400',
    'Tractors id': '204',
  },
  {
    'Brand Name': 'Force',
    'Model Name': 'BALWAN 500',
    'Tractors id': '206',
  },
  {
    'Brand Name': 'Force',
    'Model Name': 'BALWAN 550',
    'Tractors id': '207',
  },
  {
    'Brand Name': 'Escort',
    'Model Name': 'MPT JAWAN',
    'Tractors id': '208',
  },
  {
    'Brand Name': 'Escort',
    'Model Name': 'JOSH 335',
    'Tractors id': '209',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 730 II HDM',
    'Tractors id': '211',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 734 (S1)',
    'Tractors id': '212',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 740 III S3',
    'Tractors id': '218',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 745 III',
    'Tractors id': '219',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 750III',
    'Tractors id': '220',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 60',
    'Tractors id': '221',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 60 RX- 4WD',
    'Tractors id': '222',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 42 RX',
    'Tractors id': '223',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 47 RX',
    'Tractors id': '224',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 60 RX',
    'Tractors id': '225',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 35 Rx',
    'Tractors id': '228',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 745 III Rx PP',
    'Tractors id': '229',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Worldtrac 75 RX 2WD / 4WD',
    'Tractors id': '230',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3032 Nx',
    'Tractors id': '233',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3510',
    'Tractors id': '234',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3037 TX',
    'Tractors id': '235',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '4010',
    'Tractors id': '236',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3230 TX Super',
    'Tractors id': '237',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '4510',
    'Tractors id': '238',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '4710 Turbo Super',
    'Tractors id': '239',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3600-2TX',
    'Tractors id': '240',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3630-TX Super',
    'Tractors id': '241',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '5500 Turbo Super',
    'Tractors id': '243',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '6500 Turbo Super',
    'Tractors id': '244',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '7500 Turbo Super',
    'Tractors id': '245',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': 'TD 5.90',
    'Tractors id': '246',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '955',
    'Tractors id': '247',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '3549',
    'Tractors id': '248',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '4549',
    'Tractors id': '249',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '6049',
    'Tractors id': '250',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '6549',
    'Tractors id': '251',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '7549 - 4WD',
    'Tractors id': '252',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '9049 - 4WD',
    'Tractors id': '253',
  },
  {
    'Brand Name': 'Kubota',
    'Model Name': 'NeoStar A211N 4WD',
    'Tractors id': '256',
  },
  {
    'Brand Name': 'Kubota',
    'Model Name': 'B2420',
    'Tractors id': '257',
  },
  {
    'Brand Name': 'Kubota',
    'Model Name': 'Neostar B2441 4WD',
    'Tractors id': '258',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '717',
    'Tractors id': '259',
  },
  {
    'Brand Name': 'Kubota',
    'Model Name': 'L3408',
    'Tractors id': '262',
  },
  {
    'Brand Name': 'Kubota',
    'Model Name': 'L4508',
    'Tractors id': '263',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': 'MT 270 - VIRAAT 4WD',
    'Tractors id': '273',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': 'MT180D / JAI-2W',
    'Tractors id': '274',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': 'VT-180D HS/JAI-4W Tractor',
    'Tractors id': '275',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': 'VT 224 -1D',
    'Tractors id': '277',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': 'VT224-1D-AJAI-4WB',
    'Tractors id': '278',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '960 FE',
    'Tractors id': '279',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '1134 DI',
    'Tractors id': '281',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5310',
    'Tractors id': '283',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5038 D',
    'Tractors id': '284',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '4455 BT',
    'Tractors id': '287',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'ALT 4000',
    'Tractors id': '288',
  },
  {
    'Brand Name': 'Kubota',
    'Model Name': 'MU5501',
    'Tractors id': '290',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 50',
    'Tractors id': '292',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': 'Excel 6010',
    'Tractors id': '293',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': 'Excel 9010',
    'Tractors id': '294',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': 'Excel 8010',
    'Tractors id': '295',
  },
  {
    'Brand Name': 'Standard',
    'Model Name': 'DI 335',
    'Tractors id': '296',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'GT 20',
    'Tractors id': '297',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'GT 22',
    'Tractors id': '298',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'GT 26',
    'Tractors id': '299',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '557',
    'Tractors id': '300',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '548',
    'Tractors id': '301',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 30 RX BAGBAN SUPER',
    'Tractors id': '305',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI-6565',
    'Tractors id': '306',
  },
  {
    'Brand Name': 'Force',
    'Model Name': 'BALWAN 450',
    'Tractors id': '307',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '1026',
    'Tractors id': '308',
  },
  {
    'Brand Name': 'Standard',
    'Model Name': 'DI 345',
    'Tractors id': '321',
  },
  {
    'Brand Name': 'Standard',
    'Model Name': 'DI 450',
    'Tractors id': '322',
  },
  {
    'Brand Name': 'Standard',
    'Model Name': 'DI 475',
    'Tractors id': '323',
  },
  {
    'Brand Name': 'Standard',
    'Model Name': 'DI 490',
    'Tractors id': '324',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '2035 DI',
    'Tractors id': '325',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '371 Super Power',
    'Tractors id': '326',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3630 TX Plus',
    'Tractors id': '327',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5036 D',
    'Tractors id': '328',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agrolux 50 2WD',
    'Tractors id': '332',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agrolux 50 4WD',
    'Tractors id': '333',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agrolux 60 2WD',
    'Tractors id': '334',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agrolux 60 4WD',
    'Tractors id': '335',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agrolux 75 Profiline',
    'Tractors id': '336',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agrolux 70',
    'Tractors id': '337',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agromaxx 55 2WD',
    'Tractors id': '338',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agromaxx 55 4WD',
    'Tractors id': '339',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agrolux 80 ProfiLine 2WD',
    'Tractors id': '340',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agrolux 80 ProfiLine',
    'Tractors id': '341',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agrolux 4.80 2WD',
    'Tractors id': '342',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agrolux 4.80 4WD',
    'Tractors id': '343',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '585 DI Power Plus BP',
    'Tractors id': '344',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '585 DI Sarpanch',
    'Tractors id': '345',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agromaxx 60 2WD',
    'Tractors id': '347',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agromaxx 60',
    'Tractors id': '348',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '45 Smart',
    'Tractors id': '353',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '45 Classic',
    'Tractors id': '354',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 37',
    'Tractors id': '356',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 41',
    'Tractors id': '357',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 45',
    'Tractors id': '358',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 4455',
    'Tractors id': '359',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '425 N',
    'Tractors id': '360',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '434 DS Super Saver',
    'Tractors id': '361',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'ALT 3500',
    'Tractors id': '362',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '5630 Tx Plus 4WD',
    'Tractors id': '364',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '2635 4WD',
    'Tractors id': '365',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '6028 4WD',
    'Tractors id': '368',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '551',
    'Tractors id': '369',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'JIVO 245 DI',
    'Tractors id': '370',
  },
  {
    'Brand Name': 'Kubota',
    'Model Name': 'MU4501 2WD',
    'Tractors id': '371',
  },
  {
    'Brand Name': 'Kubota',
    'Model Name': 'MU4501 4WD',
    'Tractors id': '372',
  },
  {
    'Brand Name': 'Kubota',
    'Model Name': 'MU5501 2WD',
    'Tractors id': '373',
  },
  {
    'Brand Name': 'Kubota',
    'Model Name': 'MU5501 4WD',
    'Tractors id': '374',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '6055 Classic T20',
    'Tractors id': '375',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': 'MT 270- VIRAAT 4WD PLUS',
    'Tractors id': '376',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': 'MT 171 DI - SAMRAAT',
    'Tractors id': '377',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 41 Plus',
    'Tractors id': '378',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '5245 DI 4WD',
    'Tractors id': '379',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 60',
    'Tractors id': '380',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '434 Plus',
    'Tractors id': '381',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '439 Plus',
    'Tractors id': '382',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '9500 4WD',
    'Tractors id': '383',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '7250 Power Up',
    'Tractors id': '384',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5210',
    'Tractors id': '385',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Sikander Worldtrac 60',
    'Tractors id': '387',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '742 FE',
    'Tractors id': '388',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '6080 X Pro',
    'Tractors id': '389',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '3036EN',
    'Tractors id': '390',
  },
  {
    'Brand Name': 'Kubota',
    'Model Name': 'NeoStar B2741S 4WD',
    'Tractors id': '391',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5310 4WD',
    'Tractors id': '392',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Worldtrac 90 Rx 4WD',
    'Tractors id': '393',
  },
  {
    'Brand Name': 'Escort',
    'Model Name': 'Steeltrac',
    'Tractors id': '397',
  },
  {
    'Brand Name': 'Trakstar',
    'Model Name': '531',
    'Tractors id': '398',
  },
  {
    'Brand Name': 'Trakstar',
    'Model Name': '536',
    'Tractors id': '399',
  },
  {
    'Brand Name': 'Trakstar',
    'Model Name': '540',
    'Tractors id': '400',
  },
  {
    'Brand Name': 'Trakstar',
    'Model Name': '545',
    'Tractors id': '401',
  },
  {
    'Brand Name': 'Trakstar',
    'Model Name': '550',
    'Tractors id': '402',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 55',
    'Tractors id': '403',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': '3035 E',
    'Tractors id': '404',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': '3040 E',
    'Tractors id': '405',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': '3042 E',
    'Tractors id': '406',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Arjun Novo 605 Di-i-with AC Cabin',
    'Tractors id': '407',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '555 DI Powerplus',
    'Tractors id': '408',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': 'TAFE 30 DI Orchard Plus',
    'Tractors id': '409',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '241 4WD',
    'Tractors id': '410',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'JIVO 225 DI',
    'Tractors id': '411',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5305',
    'Tractors id': '412',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '7250 Power',
    'Tractors id': '413',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5105',
    'Tractors id': '414',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '963 FE',
    'Tractors id': '415',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '3028 EN',
    'Tractors id': '416',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'NOVO 755 DI',
    'Tractors id': '417',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'NOVO 655 DI',
    'Tractors id': '418',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '6110 B',
    'Tractors id': '419',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '6120 B',
    'Tractors id': '420',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Sikander DI 35',
    'Tractors id': '421',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': '35 RX Sikander',
    'Tractors id': '422',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': '42 RX Sikander',
    'Tractors id': '423',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': '42 DI Sikander',
    'Tractors id': '424',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': '47 RX Sikander',
    'Tractors id': '425',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': '745 DI III Sikander',
    'Tractors id': '426',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': '745 RX III Sikander',
    'Tractors id': '427',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '3036E',
    'Tractors id': '428',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5045 D 4WD',
    'Tractors id': '429',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5050 D - 4WD',
    'Tractors id': '430',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5055 E 4WD',
    'Tractors id': '431',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5060 E 4WD',
    'Tractors id': '432',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5065 E- 4WD',
    'Tractors id': '433',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5075E - 4WD AC Cabin',
    'Tractors id': '434',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'Atom 26',
    'Tractors id': '435',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'Champion 39',
    'Tractors id': '436',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '45 Epi Pro',
    'Tractors id': '437',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '45 Ultramaxx - 4WD',
    'Tractors id': '438',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '6065 Ultramaxx',
    'Tractors id': '439',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 45 Plus - 4WD',
    'Tractors id': '440',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 45 Plus',
    'Tractors id': '441',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5060 E - 2WD AC Cabin',
    'Tractors id': '442',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5060 E - 4WD AC Cabin',
    'Tractors id': '443',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5065 E - 4WD AC Cabin',
    'Tractors id': '444',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 30 BAAGBAN',
    'Tractors id': '446',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 30 BAAGBAN SUPER',
    'Tractors id': '447',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': '50 RX SIKANDER',
    'Tractors id': '448',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 50 SIKANDER',
    'Tractors id': '449',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 750 III RX SIKANDER',
    'Tractors id': '450',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI-60 MM SUPER RX',
    'Tractors id': '451',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 60 MM SUPER',
    'Tractors id': '452',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': '60 RX SIKANDER',
    'Tractors id': '453',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 60 SIKANDER',
    'Tractors id': '454',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'WT 60 RX SIKANDER',
    'Tractors id': '455',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'WT 60',
    'Tractors id': '456',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'JIVO 365 DI',
    'Tractors id': '457',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '3600',
    'Tractors id': '458',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'EURO 75',
    'Tractors id': '459',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'ALT 3000',
    'Tractors id': '460',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'ALT 4800',
    'Tractors id': '461',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '188',
    'Tractors id': '462',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5310 Perma Clutch',
    'Tractors id': '463',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': 'Excel 4710',
    'Tractors id': '464',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3600 Tx Heritage Edition',
    'Tractors id': '465',
  },
  {
    'Brand Name': 'Force',
    'Model Name': 'SANMAN 6000',
    'Tractors id': '466',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5039 D PowerPro',
    'Tractors id': '467',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5042 D PowerPro',
    'Tractors id': '468',
  },
  {
    'Brand Name': 'Force',
    'Model Name': 'ABHIMAN',
    'Tractors id': '469',
  },
  {
    'Brand Name': 'Force',
    'Model Name': 'SANMAN 5000',
    'Tractors id': '470',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5405 GearPro',
    'Tractors id': '471',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agrolux 55',
    'Tractors id': '472',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': 'Viraaj XT 9045 DI',
    'Tractors id': '473',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': 'Viraaj XP 9054 DI',
    'Tractors id': '474',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': '5025 R Branson',
    'Tractors id': '475',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': 'Viraaj XS 9042 DI',
    'Tractors id': '476',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': '225 - AJAI POWER PLUS',
    'Tractors id': '477',
  },
  {
    'Brand Name': 'Captain',
    'Model Name': '280 4WD',
    'Tractors id': '478',
  },
  {
    'Brand Name': 'Solis',
    'Model Name': '5015 E',
    'Tractors id': '479',
  },
  {
    'Brand Name': 'Digitrac',
    'Model Name': 'PP 43i',
    'Tractors id': '480',
  },
  {
    'Brand Name': 'Digitrac',
    'Model Name': 'PP 46i',
    'Tractors id': '481',
  },
  {
    'Brand Name': 'Digitrac',
    'Model Name': 'PP 51i',
    'Tractors id': '482',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '50 Smart',
    'Tractors id': '483',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '50  EPI Classic Pro',
    'Tractors id': '484',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5205',
    'Tractors id': '486',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5005',
    'Tractors id': '487',
  },
  {
    'Brand Name': 'Solis',
    'Model Name': '4215 E',
    'Tractors id': '488',
  },
  {
    'Brand Name': 'Solis',
    'Model Name': '4515 E',
    'Tractors id': '489',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '60 EPI T20',
    'Tractors id': '490',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Arjun Novo 605 DI-MS',
    'Tractors id': '491',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Arjun 555 DI',
    'Tractors id': '492',
  },
  {
    'Brand Name': 'Kubota',
    'Model Name': 'A211N-OP',
    'Tractors id': '493',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'MM 35 DI',
    'Tractors id': '495',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'MM+ 39 DI',
    'Tractors id': '496',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'MM+ 41 DI',
    'Tractors id': '497',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'MM+ 45 DI',
    'Tractors id': '498',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'MM+ 50',
    'Tractors id': '499',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 750 Sikander',
    'Tractors id': '500',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 50 Rx',
    'Tractors id': '501',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 35',
    'Tractors id': '502',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '60 Supermaxx',
    'Tractors id': '503',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI- 45 RX',
    'Tractors id': '504',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': '52 RX Tiger',
    'Tractors id': '505',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Tiger 26',
    'Tractors id': '506',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': '60 Max Tiger',
    'Tractors id': '507',
  },
  {
    'Brand Name': 'Ford',
    'Model Name': '3600',
    'Tractors id': '508',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Yuvo 575 DI 4WD',
    'Tractors id': '509',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '437',
    'Tractors id': '510',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '575 DI XP Plus',
    'Tractors id': '511',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '275 DI XP Plus',
    'Tractors id': '512',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '475 DI XP Plus',
    'Tractors id': '513',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '843 XM-OSM',
    'Tractors id': '514',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '445 PLUS',
    'Tractors id': '515',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '2549',
    'Tractors id': '516',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '3049',
    'Tractors id': '517',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '4049',
    'Tractors id': '518',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '7549',
    'Tractors id': '519',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '8049',
    'Tractors id': '520',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '2549 4WD',
    'Tractors id': '521',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '3049 4WD',
    'Tractors id': '522',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '3549 4WD',
    'Tractors id': '523',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '4049 4WD',
    'Tractors id': '524',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '4549 4WD',
    'Tractors id': '525',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '4549 CR - 4WD',
    'Tractors id': '526',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '955 4WD',
    'Tractors id': '527',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '6049 4WD',
    'Tractors id': '528',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '6049 NT - 4WD',
    'Tractors id': '529',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '6549 4WD',
    'Tractors id': '530',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '8049 4WD',
    'Tractors id': '531',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '9049 AC - 4WD',
    'Tractors id': '532',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5210 E 4WD',
    'Tractors id': '533',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '10049 4WD',
    'Tractors id': '534',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '735 XT',
    'Tractors id': '535',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '724 XM Orchard NT',
    'Tractors id': '536',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '744 XM Potato Expert',
    'Tractors id': '537',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '1035 DI Tonner',
    'Tractors id': '538',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '245 SMART',
    'Tractors id': '539',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': 'Smart 9500',
    'Tractors id': '540',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '1035 DI Dost',
    'Tractors id': '541',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '430 Plus',
    'Tractors id': '542',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '435 Plus',
    'Tractors id': '543',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'Champion XP 37',
    'Tractors id': '544',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'Champion 42',
    'Tractors id': '545',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'Champion Plus',
    'Tractors id': '546',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '60 Valuemaxx',
    'Tractors id': '547',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '60 EPI Supermaxx',
    'Tractors id': '549',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'Executive 6060 2WD',
    'Tractors id': '550',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Yuvo 265 DI',
    'Tractors id': '551',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 42 PLUS',
    'Tractors id': '552',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '4710 2WD WITH CANOPY',
    'Tractors id': '553',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agromaxx 4045 E',
    'Tractors id': '554',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agromaxx 4050 E',
    'Tractors id': '555',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agromaxx 4055 E',
    'Tractors id': '556',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agromaxx 4060 E',
    'Tractors id': '557',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agrolux 45',
    'Tractors id': '558',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'Executive  6060',
    'Tractors id': '559',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agromaxx 45 E',
    'Tractors id': '560',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': 'Agromaxx 50 E',
    'Tractors id': '561',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '333 Super Plus',
    'Tractors id': '562',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '575 DI SP Plus',
    'Tractors id': '563',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': 'MT 270 -VIRAAT 2W-AGRIMASTER',
    'Tractors id': '564',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'Atom 22',
    'Tractors id': '565',
  },
  {
    'Brand Name': 'Standard',
    'Model Name': 'DI 460',
    'Tractors id': '566',
  },
  {
    'Brand Name': 'Standard',
    'Model Name': 'DI 355',
    'Tractors id': '567',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': 'Excel 4710 Red',
    'Tractors id': '568',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '978 FE',
    'Tractors id': '569',
  },
  {
    'Brand Name': 'Trakstar',
    'Model Name': '450',
    'Tractors id': '570',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 32 Baagban',
    'Tractors id': '571',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5110',
    'Tractors id': '572',
  },
  {
    'Brand Name': 'Solis',
    'Model Name': '2516 SN',
    'Tractors id': '573',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '742 XT',
    'Tractors id': '574',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '744 XT',
    'Tractors id': '575',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '475 DI SP Plus',
    'Tractors id': '576',
  },
  {
    'Brand Name': 'Ford',
    'Model Name': '3610',
    'Tractors id': '577',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': '932',
    'Tractors id': '578',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '1035 DI Planetary Plus',
    'Tractors id': '579',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '241 DI Tonner',
    'Tractors id': '580',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '650',
    'Tractors id': '581',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '9500 Smart',
    'Tractors id': '582',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '245 DI Planetary Plus',
    'Tractors id': '583',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '9500 E',
    'Tractors id': '584',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '9500 Smart 4WD',
    'Tractors id': '585',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '6055 PowerMaxx',
    'Tractors id': '586',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '60 PowerMaxx',
    'Tractors id': '587',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Tiger 47',
    'Tractors id': '588',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Tiger 50',
    'Tractors id': '589',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Tiger 55',
    'Tractors id': '590',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Tiger 60',
    'Tractors id': '591',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'JIVO 225 DI 4WD',
    'Tractors id': '592',
  },
  {
    'Brand Name': 'Solis',
    'Model Name': '6024 S',
    'Tractors id': '593',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '4175 DI',
    'Tractors id': '594',
  },
  {
    'Brand Name': 'Captain',
    'Model Name': '273 DI',
    'Tractors id': '595',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3600-2 TX All Rounder Plus',
    'Tractors id': '596',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3630 Tx Special Edition',
    'Tractors id': '597',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '50 EPI PowerMaxx',
    'Tractors id': '598',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5045 D PowerPro',
    'Tractors id': '599',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '60 PowerMaxx 4WD',
    'Tractors id': '600',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '6055 PowerMaxx 4WD',
    'Tractors id': '601',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5210 GearPro',
    'Tractors id': '602',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI 9000 4WD',
    'Tractors id': '603',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI 7500',
    'Tractors id': '604',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI 7500 4WD',
    'Tractors id': '605',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI 7575',
    'Tractors id': '606',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI 6500',
    'Tractors id': '607',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI 6500 4WD',
    'Tractors id': '608',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI 450 NG 4WD',
    'Tractors id': '609',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI 550 NG 4WD',
    'Tractors id': '610',
  },
  {
    'Brand Name': 'Captain',
    'Model Name': '280 DI',
    'Tractors id': '611',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '3055 NV 4wd',
    'Tractors id': '612',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '3055 DI 4WD',
    'Tractors id': '613',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '3065 DI 4 WD',
    'Tractors id': '614',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': 'DI 3090',
    'Tractors id': '615',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': 'DI 3090 4 WD',
    'Tractors id': '616',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': 'DI 3075',
    'Tractors id': '617',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '5118',
    'Tractors id': '618',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '242 Super Star',
    'Tractors id': '620',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '6100',
    'Tractors id': '621',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '30',
    'Tractors id': '622',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'Hero 34',
    'Tractors id': '623',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'Hero 37',
    'Tractors id': '624',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '55',
    'Tractors id': '625',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '40',
    'Tractors id': '626',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '6045',
    'Tractors id': '627',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '65 EPI',
    'Tractors id': '628',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '70',
    'Tractors id': '629',
  },
  {
    'Brand Name': 'Ford',
    'Model Name': '3230',
    'Tractors id': '630',
  },
  {
    'Brand Name': 'Ford',
    'Model Name': '3630',
    'Tractors id': '631',
  },
  {
    'Brand Name': 'Ford',
    'Model Name': '3620',
    'Tractors id': '632',
  },
  {
    'Brand Name': 'Ford',
    'Model Name': '5630',
    'Tractors id': '633',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '2040',
    'Tractors id': '634',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '2050',
    'Tractors id': '635',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5036 C',
    'Tractors id': '636',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5039 C',
    'Tractors id': '637',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5041 C',
    'Tractors id': '638',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5042 C',
    'Tractors id': '639',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5103 S',
    'Tractors id': '640',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5103',
    'Tractors id': '641',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5104',
    'Tractors id': '642',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5203',
    'Tractors id': '643',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5204',
    'Tractors id': '644',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '585 DI XP Plus',
    'Tractors id': '645',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '235 DI',
    'Tractors id': '646',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '365 DI',
    'Tractors id': '647',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '395 DI Turbo',
    'Tractors id': '648',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '405 DI',
    'Tractors id': '649',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '445 DI Arjun',
    'Tractors id': '650',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Arjun International',
    'Tractors id': '651',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Shaktiman 30',
    'Tractors id': '652',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Shaktiman 40',
    'Tractors id': '653',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Shaktiman 45',
    'Tractors id': '654',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Shaktiman 405',
    'Tractors id': '655',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Yuvraj 255',
    'Tractors id': '656',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '35',
    'Tractors id': '657',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '8775 DI',
    'Tractors id': '658',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3030',
    'Tractors id': '659',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3130',
    'Tractors id': '660',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3630 TX Turbo Super',
    'Tractors id': '661',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '430',
    'Tractors id': '662',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '435',
    'Tractors id': '663',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '440',
    'Tractors id': '664',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '445',
    'Tractors id': '665',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '450',
    'Tractors id': '666',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '455',
    'Tractors id': '667',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': '393',
    'Tractors id': '668',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': '453',
    'Tractors id': '669',
  },
  {
    'Brand Name': 'Same Deutz Fahr',
    'Model Name': '50',
    'Tractors id': '670',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '724 FE',
    'Tractors id': '671',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '733 FE',
    'Tractors id': '672',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '939 FE',
    'Tractors id': '673',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '722 FE',
    'Tractors id': '674',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '855 FE 4WD',
    'Tractors id': '675',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '963 FE 4WD',
    'Tractors id': '676',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '855 DT Plus',
    'Tractors id': '677',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '744 FE 4WD',
    'Tractors id': '678',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '5620 Tx Plus',
    'Tractors id': '679',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3037 NX',
    'Tractors id': '680',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3230 NX',
    'Tractors id': '681',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': 'Excel 4710 Paddy Special',
    'Tractors id': '682',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3630 TX Super Plus+',
    'Tractors id': '683',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '6510',
    'Tractors id': '684',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '7510',
    'Tractors id': '685',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '744 FE Potato Xpert',
    'Tractors id': '686',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Arjun Ultra 1 605 Di',
    'Tractors id': '687',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '1035 DI Super Plus',
    'Tractors id': '689',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': 'Excel 5510',
    'Tractors id': '690',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 745 DLX',
    'Tractors id': '691',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 47 DLX',
    'Tractors id': '692',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 50 DLX',
    'Tractors id': '693',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 750 III DLX',
    'Tractors id': '694',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 750 III Multi Speed DLX',
    'Tractors id': '695',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 60 DLX',
    'Tractors id': '696',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Sikander DI 55 DLX',
    'Tractors id': '697',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 55  Multi speed DLX',
    'Tractors id': '698',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 60 Multi Speed DLX',
    'Tractors id': '699',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'RX 745 DLX',
    'Tractors id': '700',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'RX 47 DLX',
    'Tractors id': '701',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'RX 50 DLX',
    'Tractors id': '702',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'RX 55 DLX',
    'Tractors id': '703',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'RX 60 DLX',
    'Tractors id': '704',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'RX 750 III Multi Speed DLX',
    'Tractors id': '705',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'RX 55 Multi Speed DLX',
    'Tractors id': '706',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'RX 60 Multi speed DLX',
    'Tractors id': '707',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'RX 750 III DLX',
    'Tractors id': '708',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5310 GearPro',
    'Tractors id': '709',
  },
  {
    'Brand Name': 'Force',
    'Model Name': 'ORCHARD DLX LT',
    'Tractors id': '710',
  },
  {
    'Brand Name': 'Force',
    'Model Name': 'SANMAN 6000 LT',
    'Tractors id': '711',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'YUVO 585 MAT',
    'Tractors id': '712',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '241 DI DYNATRACK',
    'Tractors id': '713',
  },
  {
    'Brand Name': 'Force',
    'Model Name': 'Balwan 330',
    'Tractors id': '714',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Tiger Electric',
    'Tractors id': '715',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '415 DI XP PLUS',
    'Tractors id': '716',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Rx 47 Mahabali',
    'Tractors id': '717',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Rx 42 Mahabali',
    'Tractors id': '718',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '439 RDX',
    'Tractors id': '719',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 439',
    'Tractors id': '720',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 50 Next',
    'Tractors id': '721',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 55 Next',
    'Tractors id': '722',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 60 Next',
    'Tractors id': '723',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 60 Next 4wd',
    'Tractors id': '724',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro G28',
    'Tractors id': '725',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '434 RDX',
    'Tractors id': '726',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'JIVO 245 VINEYARD',
    'Tractors id': '727',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '275 DI SP Plus',
    'Tractors id': '728',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '415 DI SP Plus',
    'Tractors id': '729',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '241 R',
    'Tractors id': '730',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'JIVO 305 DI',
    'Tractors id': '731',
  },
  {
    'Brand Name': 'Captain',
    'Model Name': '283 4WD- 8G',
    'Tractors id': '732',
  },
  {
    'Brand Name': 'Solis',
    'Model Name': 'Hybrid 5015 E',
    'Tractors id': '733',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': '927',
    'Tractors id': '734',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 47',
    'Tractors id': '735',
  },
  {
    'Brand Name': 'Belarus',
    'Model Name': '451 4WD',
    'Tractors id': '736',
  },
  {
    'Brand Name': 'Belarus',
    'Model Name': '622 4WD with AC Cabin',
    'Tractors id': '737',
  },
  {
    'Brand Name': 'Belarus',
    'Model Name': '1025.4 4WD',
    'Tractors id': '738',
  },
  {
    'Brand Name': 'Belarus',
    'Model Name': '952.4 4WD',
    'Tractors id': '739',
  },
  {
    'Brand Name': 'Belarus',
    'Model Name': '920.4 4WD',
    'Tractors id': '740',
  },
  {
    'Brand Name': 'Belarus',
    'Model Name': '651 4WD',
    'Tractors id': '741',
  },
  {
    'Brand Name': 'Hindustan',
    'Model Name': '60',
    'Tractors id': '742',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '275 DI TU XP Plus',
    'Tractors id': '743',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '275 DI TU SP Plus',
    'Tractors id': '744',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '969 FE',
    'Tractors id': '745',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'Atom 35',
    'Tractors id': '746',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '60 supermax',
    'Tractors id': '747',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '6055 supermax',
    'Tractors id': '748',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '265 DI XP Plus',
    'Tractors id': '749',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '7235 DI',
    'Tractors id': '750',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '244 DI',
    'Tractors id': '751',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '244 DI Dynatrack 4WD',
    'Tractors id': '752',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3600-2 Excel',
    'Tractors id': '753',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3600 Tx Super Heritage Edition',
    'Tractors id': '754',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3600-2 Tx  Super',
    'Tractors id': '755',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '246 DI DYNATRACK 4WD',
    'Tractors id': '756',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '246 DI DYNATRACK',
    'Tractors id': '757',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI-305 NG',
    'Tractors id': '758',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI-450 STAR',
    'Tractors id': '759',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': '6565 4WD',
    'Tractors id': '760',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': '6565 V2 4WD 24 gears',
    'Tractors id': '761',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI-350NG 4WD',
    'Tractors id': '762',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI-6500 NG V2 2WD 24 Gears',
    'Tractors id': '763',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'DI-350NG STAR',
    'Tractors id': '764',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '280',
    'Tractors id': '765',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 745 III MAHARAJA',
    'Tractors id': '766',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5305 Trem IV',
    'Tractors id': '769',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5310 Trem IV',
    'Tractors id': '770',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5310 Trem IV-4wd',
    'Tractors id': '771',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5405 Trem IV',
    'Tractors id': '772',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5405 Trem IV-4wd',
    'Tractors id': '773',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5075E-Trem IV',
    'Tractors id': '774',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5075E Trem IV-4wd',
    'Tractors id': '775',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'YUVO TECH Plus 275 DI',
    'Tractors id': '776',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'YUVO TECH Plus 405 DI',
    'Tractors id': '777',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'YUVO TECH Plus 415 DI',
    'Tractors id': '778',
  },
  {
    'Brand Name': 'Kubota',
    'Model Name': 'MU 5502 2wd',
    'Tractors id': '779',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Tiger Di 65',
    'Tractors id': '780',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Tiger DI 65 4WD',
    'Tractors id': '781',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Tiger Di 75',
    'Tractors id': '782',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Tiger Di 75 4WD',
    'Tractors id': '783',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 42 Plus PowerHouse',
    'Tractors id': '788',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 55 PowerHouse',
    'Tractors id': '789',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 50 PowerHouse',
    'Tractors id': '790',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 47 PowerHouse',
    'Tractors id': '791',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '439 Plus Powerhouse',
    'Tractors id': '792',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': '434 Plus PowerHouse',
    'Tractors id': '793',
  },
  {
    'Brand Name': 'Ace',
    'Model Name': 'Veer 20',
    'Tractors id': '794',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'YUVO TECH Plus 475',
    'Tractors id': '795',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'YUVO TECH Plus 575',
    'Tractors id': '796',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'YUVO TECH Plus 585',
    'Tractors id': '797',
  },
  {
    'Brand Name': 'Kubota',
    'Model Name': 'MU 5502 4WD',
    'Tractors id': '798',
  },
  {
    'Brand Name': 'Solis',
    'Model Name': '3016 SN',
    'Tractors id': '800',
  },
  {
    'Brand Name': 'Solis',
    'Model Name': '5724 S',
    'Tractors id': '801',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': 'Code',
    'Tractors id': '802',
  },
  {
    'Brand Name': 'Swaraj',
    'Model Name': '724 FE 4WD',
    'Tractors id': '803',
  },
  {
    'Brand Name': 'Solis',
    'Model Name': 'YM 342A 4WD',
    'Tractors id': '804',
  },
  {
    'Brand Name': 'Solis',
    'Model Name': 'YM 348A 4WD',
    'Tractors id': '805',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'Champion 35 Haulage Master',
    'Tractors id': '806',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'Champion 35 All Rounder',
    'Tractors id': '807',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': 'Champion XP 41 Plus',
    'Tractors id': '808',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '45 Potato Smart',
    'Tractors id': '809',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '45 Super Smart',
    'Tractors id': '810',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '50 Powermaxx T20',
    'Tractors id': '811',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '60 Powermaxx T20',
    'Tractors id': '812',
  },
  {
    'Brand Name': 'Kartar',
    'Model Name': '5136',
    'Tractors id': '813',
  },
  {
    'Brand Name': 'Kartar',
    'Model Name': '4536',
    'Tractors id': '814',
  },
  {
    'Brand Name': 'Kartar',
    'Model Name': '4036',
    'Tractors id': '815',
  },
  {
    'Brand Name': 'Kartar',
    'Model Name': '5936',
    'Tractors id': '816',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '45 Classic Supermaxx',
    'Tractors id': '817',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '60 Powermaxx 8+2',
    'Tractors id': '818',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '1026 E',
    'Tractors id': '819',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '3048 DI',
    'Tractors id': '820',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '3075 DI 2WD',
    'Tractors id': '821',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '8055 Magnatrak',
    'Tractors id': '822',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '557 Prima G3',
    'Tractors id': '823',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '380 4WD Prima G3',
    'Tractors id': '824',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '380 2WD Prima G3',
    'Tractors id': '825',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '557 4wd Prima G3',
    'Tractors id': '826',
  },
  {
    'Brand Name': 'Kartar',
    'Model Name': '5036',
    'Tractors id': '827',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '6028 Maxpro Wide Track',
    'Tractors id': '828',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '6028 MaxPro Narrow Track',
    'Tractors id': '829',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '6026 Maxpro Wide Track',
    'Tractors id': '830',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '6026 MaxPro Narrow Track',
    'Tractors id': '831',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '280 4WD',
    'Tractors id': '832',
  },
  {
    'Brand Name': 'Kartar',
    'Model Name': '4536 Plus',
    'Tractors id': '833',
  },
  {
    'Brand Name': 'Kartar',
    'Model Name': '5036 4wd',
    'Tractors id': '834',
  },
  {
    'Brand Name': 'Kartar',
    'Model Name': '5136 plus',
    'Tractors id': '835',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 55 Next 4wd',
    'Tractors id': '836',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '45 Powermaxx',
    'Tractors id': '837',
  },
  {
    'Brand Name': 'Solis',
    'Model Name': '4415 E 4wd',
    'Tractors id': '838',
  },
  {
    'Brand Name': 'Solis',
    'Model Name': '4415 E',
    'Tractors id': '839',
  },
  {
    'Brand Name': 'Solis',
    'Model Name': '2216 SN 4wd',
    'Tractors id': '840',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '330',
    'Tractors id': '841',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '1020 DI',
    'Tractors id': '842',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '4195 DI 2wd',
    'Tractors id': '843',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '4195 DI',
    'Tractors id': '844',
  },
  {
    'Brand Name': 'Captain',
    'Model Name': '263 4WD - 8G',
    'Tractors id': '845',
  },
  {
    'Brand Name': 'Indo Farm',
    'Model Name': '4110 DI',
    'Tractors id': '846',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '188 4WD',
    'Tractors id': '847',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '650 4WD',
    'Tractors id': '848',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': 'Simba 30',
    'Tractors id': '849',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '551 Hydromatic',
    'Tractors id': '852',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '485 Super Plus',
    'Tractors id': '853',
  },
  {
    'Brand Name': 'Solis',
    'Model Name': '5515 E',
    'Tractors id': '854',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'Sikander DI 55 DLX 4wd',
    'Tractors id': '855',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 734 Power Plus',
    'Tractors id': '856',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': '475 DI XP Plus MS',
    'Tractors id': '857',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '5118 4WD',
    'Tractors id': '858',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '245 Smart 4WD',
    'Tractors id': '859',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'MM-18',
    'Tractors id': '860',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3600-2 TX All Rounder plus 4WD',
    'Tractors id': '861',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '5500 Turbo Super 2WD',
    'Tractors id': '862',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '254 Dynatrack 4WD',
    'Tractors id': '863',
  },
  {
    'Brand Name': 'Massey Ferguson',
    'Model Name': '254 Dynatrack 2WD',
    'Tractors id': '864',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '6055 Classic',
    'Tractors id': '865',
  },
  {
    'Brand Name': 'Powertrac',
    'Model Name': 'Euro 47 Potato Special',
    'Tractors id': '866',
  },
  {
    'Brand Name': 'John Deere',
    'Model Name': '5310 Gearpro 4WD',
    'Tractors id': '867',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '380 4WD',
    'Tractors id': '868',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '380 Super Power',
    'Tractors id': '869',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '480 4WD',
    'Tractors id': '870',
  },
  {
    'Brand Name': 'Mahindra',
    'Model Name': 'Yuvo Tech Plus 575 4WD',
    'Tractors id': '871',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '551 4WD',
    'Tractors id': '872',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '551 Super Plus',
    'Tractors id': '873',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '557 4WD',
    'Tractors id': '874',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '5660',
    'Tractors id': '875',
  },
  {
    'Brand Name': 'Force',
    'Model Name': 'Balwan 400 Super',
    'Tractors id': '876',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3230 TX 2WD',
    'Tractors id': '877',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3230 TX',
    'Tractors id': '878',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': '4511 Pro 2WD',
    'Tractors id': '879',
  },
  {
    'Brand Name': 'Farmtrac',
    'Model Name': '50 EPI Supermaxx',
    'Tractors id': '880',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3037 TX Super',
    'Tractors id': '881',
  },
  {
    'Brand Name': 'Preet',
    'Model Name': '6049 Super',
    'Tractors id': '882',
  },
  {
    'Brand Name': 'Eicher',
    'Model Name': '551 Prima G3',
    'Tractors id': '883',
  },
  {
    'Brand Name': 'Vst Shakti',
    'Model Name': '929 DI EGT',
    'Tractors id': '884',
  },
  {
    'Brand Name': 'Kartar',
    'Model Name': '5136 CR',
    'Tractors id': '885',
  },
  {
    'Brand Name': 'Kartar',
    'Model Name': '5936 2 WD',
    'Tractors id': '886',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3630 TX Super Plus+ 4 WD',
    'Tractors id': '887',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '3037 TX Super 4 WD',
    'Tractors id': '888',
  },
  {
    'Brand Name': 'Valdo',
    'Model Name': '939 - SDI',
    'Tractors id': '889',
  },
  {
    'Brand Name': 'Valdo',
    'Model Name': '945 - SDI',
    'Tractors id': '890',
  },
  {
    'Brand Name': 'Valdo',
    'Model Name': '950 - SDI',
    'Tractors id': '891',
  },
  {
    'Brand Name': 'HMT',
    'Model Name': '2522 FX',
    'Tractors id': '892',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '6500 Turbo Super 2WD',
    'Tractors id': '893',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '5630 Tx Plus',
    'Tractors id': '894',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': '7500 Turbo Super 2WD',
    'Tractors id': '895',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': 'Excel 6010 2WD',
    'Tractors id': '896',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': 'Excel 9010 2WD',
    'Tractors id': '897',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': 'Excel 8010 2WD',
    'Tractors id': '898',
  },
  {
    'Brand Name': 'New Holland',
    'Model Name': 'Excel 5510 2WD',
    'Tractors id': '899',
  },
  {
    'Brand Name': 'Sonalika',
    'Model Name': 'DI 42 Power Plus',
    'Tractors id': '900',
  },
]
