import {useEffect} from 'react'
import {useUpdateVehicleImagesCdnMutation} from '../generated/hooks_and_more'
const response = {
  data: {
    queryVehicleImages: [
      {
        id: '0x2719',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide: null,
        frontBodySide: null,
        leftBodySide: null,
        rightBodySide: null,
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F26d2bd0c-b674-479a-97b7-b1c352743de9.jpg?alt=media&token=0fc08995-53f7-49b5-bfa5-245d2fde76e0',
      },
      {
        id: '0x2730',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide: null,
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Feeff4948-94f6-47f9-bc09-79bb72d80655.jpg?alt=media&token=f086c867-2c41-4678-a7be-4bfa44b72eaf',
        leftBodySide: null,
        rightBodySide: null,
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x2748',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide: null,
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fdacccd16-f440-45ed-913d-a024e5803740.jpg?alt=media&token=102455dd-1f58-49b3-a662-8fe098bbc830',
        leftBodySide: null,
        rightBodySide: null,
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x2757',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide: null,
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fae02823c-d64b-40ac-a4fa-c52f14b63fb9.jpg?alt=media&token=1fbb3cfa-6112-4276-900b-7063f5f150de',
        leftBodySide: null,
        rightBodySide: null,
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x27d5',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide: null,
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2de5bc52-5855-4175-98ad-9efda2fe6b54.jpg?alt=media&token=31495991-0880-47dc-8302-5e6b1eb69e4f',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F82fed585-e9e3-4615-8e05-4a6bff84d1f4.jpg?alt=media&token=80ac4421-4cf3-4b69-8899-349022d1d16f',
        rightBodySide: null,
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x27e4',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide: null,
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fbc5116ea-585f-4967-91a3-7874c40678fb.jpg?alt=media&token=5f380267-e373-488c-b80b-39bdfcc36871',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb1531c5d-e496-4acc-9781-fa730e20acde.jpg?alt=media&token=539508d8-25d3-4788-99d1-97500bf0483c',
        rightBodySide: null,
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x2813',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide: null,
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F09fcc661-babd-45e9-ad65-a3fc4d5dc94a.jpg?alt=media&token=ddcbc526-138c-41cf-82e3-6dab9c89c36b',
        leftBodySide: null,
        rightBodySide: null,
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x2817',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide: null,
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb59c9571-3da3-4959-a8b3-5f7484352dce.jpg?alt=media&token=d2f65dea-f487-415b-a270-43253c866830',
        leftBodySide: null,
        rightBodySide: null,
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x38fd',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F629e4d20-f814-4a9b-b32b-fa2f5d8490fc.jpg?alt=media&token=a64f8853-a003-42e4-9663-00620571171a',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff2537608-105f-4d78-b4f4-1f07a9046a16.jpg?alt=media&token=78b3fa1d-5a7e-449e-b8e2-eeea90f68f2a',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fc45cbacd-94a8-4275-9146-06f92f4274cc.jpg?alt=media&token=3a63c2c0-e03b-4c9d-ab86-4b7e991858d9',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F3a3881f8-4acc-4707-9f8c-eccbc7b1fc35.jpg?alt=media&token=fee4d5b3-ba12-4b57-b225-07fd481c1a52',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F462dfb0b-8533-4b9b-b2d5-5d45c5a609e1.jpg?alt=media&token=3d11085e-c98b-4b77-a91e-219deae70801',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F31dcbd42-eac9-41e6-bd10-54bc6cf51a4e.jpg?alt=media&token=cdb43145-4286-49a0-958a-db809b81ae18',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa9e1ce05-b835-41b1-8ba6-0b4154e7db8f.jpg?alt=media&token=786e16b3-f7e7-4d51-8660-b852162ea09e',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe4564003-215b-470e-bd9c-b4388ce2c463.jpg?alt=media&token=db976b63-d2bb-4a2b-81df-ec1a2597fcc7',
        inspectionVideoUrl: null,
      },
      {
        id: '0x3903',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F3c087bee-8b9c-4293-87f2-2e60d9041b16.jpg?alt=media&token=759f3904-355c-4f2e-95dd-59b5d8995329',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fba2afcf2-990c-4728-a649-e89053baa0e2.jpg?alt=media&token=1a189a14-4679-4b96-8fb1-90ef7b971ea7',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F5fa9ff67-efd6-4944-8b5d-2fc7db96d45c.jpg?alt=media&token=ad92bbc7-b38a-413d-8e1b-2771e3c7791a',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F45e3d8bf-2530-4338-8025-5b2857b7a542.jpg?alt=media&token=8a677710-b2dc-452c-b01e-8616ef76fec1',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x3924',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F17c9713a-1398-4f79-816e-756009dfb438.jpg?alt=media&token=18555832-b4ba-4ec6-921c-1fc978b32e1c',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F64ec6cde-d95b-47c2-862c-f0ac761d3404.jpg?alt=media&token=3bad1446-f73f-4ecf-b8d4-12d13c28ed25',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F467158b7-1150-4d23-86a9-12a367e9ea87.jpg?alt=media&token=d964e7bb-26f5-441e-9702-ea7fb66b1a48',
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F3b3acbff-1fb6-43b9-949f-7e86169085ca.jpg?alt=media&token=eb4b8f30-b6be-4fc4-a301-1cd9092f8510',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F3a3a8edf-15a7-420d-b215-6e8081ba1641.jpg?alt=media&token=15adb3b6-6b1c-4fa7-a87c-ca217ee6bbf6',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe67d668a-2e4b-49e9-9dc0-a6b837630c94.jpg?alt=media&token=46ad053c-d20c-4695-a079-c33eda48f157',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F840856c2-3923-423f-a422-57718d3ab64c.jpg?alt=media&token=fd4a9c24-2fdd-4caf-b73c-b998d9afae5f',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F26ddb8d7-47fc-41c9-b501-f89284862683.jpg?alt=media&token=e1dc65b1-8e3a-4b16-9840-ffee3c5236f0',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd8525ab9-2a9f-412f-816a-54f509625fda.jpg?alt=media&token=ce44bbf4-d378-4b36-b455-306855f1d686',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F385edbb0-aec0-4b16-b507-c252f843cac6.jpg?alt=media&token=a62f0733-6650-4333-9eff-ae79f04d4072',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F5e6a071e-678b-4fbf-9fde-0815fbf26381.jpg?alt=media&token=121dc510-337e-42a4-8539-a4b30ab591fb',
        inspectionVideoUrl: null,
      },
      {
        id: '0x3928',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fdc67bef6-c48f-4fdb-beeb-1d8a8e4e651b.jpg?alt=media&token=d8ef9c4a-1ad4-46bd-a3de-f5b9743063e3',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F0fe54ba5-76a7-4317-bd11-33609a00c0cd.jpg?alt=media&token=24eb7417-7d4c-4fa3-8115-3173043d9f0f',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F5f31a4ab-f02e-4f4b-9f4d-71504fb32313.jpg?alt=media&token=8a4d93d6-2c13-49f6-96b8-fbf630a26fb8',
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fbb8c17e6-4998-4e4d-9710-62fc66db3161.jpg?alt=media&token=9da6ab7b-e26d-4e83-98b7-7340f5217b11',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F82ea7555-e366-4533-ba9c-be36f3f0888d.jpg?alt=media&token=840038ca-19ed-409f-b329-86b7eb60703b',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd4ac473e-e38b-4877-a282-15d2df91708d.jpg?alt=media&token=18d3726c-d224-4897-b5d8-869505873517',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F50ce6684-37c9-4ffc-9f3f-619218dd897b.jpg?alt=media&token=388ce7ba-9178-4f26-836b-09a7e8527ba2',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fba59c289-8e05-4ad7-80db-15b27f9e2b3d.jpg?alt=media&token=17caff16-3873-4d8c-838a-b540f96f94b8',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4a3aa05a-2d23-4ece-8835-46eace1ff1ea.jpg?alt=media&token=38f99b60-5143-401f-984a-ce91980f6dc1',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F8fc880ed-3024-401d-b2a4-51d36c642ea6.jpg?alt=media&token=3bc26e66-d668-4968-ad34-6acb871ed14c',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb0147fd1-ccfb-483e-8ef9-d3cf4350600e.jpg?alt=media&token=6a967e96-4cb4-4bf6-b9e3-75f8337800a3',
        inspectionVideoUrl: null,
      },
      {
        id: '0x392c',
        odometer: null,
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F7aaec7fe-8705-44d7-9fcf-204db5b3affe.jpg?alt=media&token=7939b878-3b1c-4899-9d7b-a13246652030',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F3d5511fb-aae0-4c86-b9a5-faca9d6e0bd2.jpg?alt=media&token=e0e53acc-0f05-481d-9f20-2c673d11f634',
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe02cb160-1ff1-4997-92c3-1c186747e742.jpg?alt=media&token=90d7d93b-2183-41a1-a9ef-da0ef0e8910d',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4f0031eb-f729-49ad-b084-a2e6b919c857.jpg?alt=media&token=a50954cc-1f1a-4526-9b29-1e9cd08a6509',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F042e0be0-56e9-433d-bf16-b5d321a8c321.jpg?alt=media&token=0e744233-e0ae-4165-90f8-f8ad6c025727',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F6e952e97-0456-4774-879d-a82ba7153664.jpg?alt=media&token=a8fe2cf6-10fa-4680-8b97-c9233cadeaca',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F61ab50b0-4832-419f-af9b-f8d92aaf28ac.jpg?alt=media&token=2721362e-df08-4559-9818-67ec5b630268',
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x3930',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2f1f088a-5e8e-43ba-a14b-f6dcd3c05868.jpg?alt=media&token=772b3357-dcf3-4461-bb54-d82232649f06',
        chassisNumber: null,
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F37f34ac0-bf21-4cae-8764-b0db434ccb4e.jpg?alt=media&token=f63988a7-f68e-4e17-b929-4ea3ddc95d81',
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F63c16f76-bd61-42ef-95e1-c13d4a7c445b.jpg?alt=media&token=1267fe06-b51e-4b47-bb65-822571f00c1c',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F9e3df5da-e37e-4f0a-af2b-9b58b4f0388b.jpg?alt=media&token=e7f69a83-e536-413f-8eb7-74b9a0f7effe',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F1ae23f92-2f37-40f9-8cf7-c6c244a5fc3e.jpg?alt=media&token=933e93f8-317b-402f-91a6-727726a57475',
        rightBodySide: null,
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F69c9e2fe-bfdd-4ba4-afbf-955ab00423b5.jpg?alt=media&token=7e4487ed-f7a9-4a92-986e-d22375212106',
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fcd35c817-e010-44a3-b162-0449a61c373f.jpg?alt=media&token=0f61fb60-d6c9-4854-8ae5-aa7c04f09124',
        inspectionVideoUrl: null,
      },
      {
        id: '0x3934',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F30c03456-422b-46e6-b041-37f65a337255.jpg?alt=media&token=555fdb55-5295-4e3c-976e-6cf732efa468',
        frontBodySide: null,
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4a519978-ac6e-495c-b39e-f60bc88cb56b.jpg?alt=media&token=e78173ec-8f7d-429c-b937-1439dfc9851e',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fea2ae317-d6bc-4e1b-a931-6bd70a6368af.jpg?alt=media&token=60c78366-d503-4fbb-ac24-035881caeb66',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x3938',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4fc611ed-4957-4e19-8c9b-54aa67bb8a7c.jpg?alt=media&token=21750f71-6e09-431e-b0f2-6dff68ecba1c',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F621bf3cc-5b1a-490c-8edb-672bcc205bfc.jpg?alt=media&token=bf1a6a7c-fef5-4101-871f-635efd084671',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fc162d6c2-9923-4754-87a4-c1bcb03820aa.jpg?alt=media&token=c9ea14db-de78-4096-9a67-0f816e0e41db',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F59dbd1d2-0739-437b-af39-7f211a5718af.jpg?alt=media&token=30bc8428-3a3d-4cfb-8d53-b7610ae390ba',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x3edf',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fca832a82-9e82-4cd3-9bdf-07abb7e957cd.jpg?alt=media&token=dab80734-5664-4522-b2ea-6978a6c291fa',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fea624127-c940-4ad4-9610-2b14608974ff.jpg?alt=media&token=1fdc0237-dfb3-453a-abbd-a18a8a8c5c06',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F05edbcba-bd93-4a56-8507-010cac471742.jpg?alt=media&token=b3ca2fe9-d9e6-465a-a488-1f32f35c7cf5',
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F38d431a5-512a-4d55-af07-11f9ce800d70.jpg?alt=media&token=1918f18d-777f-4275-8d9b-b3e3becb1608',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F0e389a5a-7617-479e-a7e0-0cdc8fb5cf46.jpg?alt=media&token=9909ee31-64d8-407a-b7d4-52450b3a9769',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F27db9893-54c8-42b8-8cb9-4200b65165c3.jpg?alt=media&token=a497d9a4-bb54-4312-827a-ecefeb3cc605',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa66d396e-1922-4599-a016-f51e20c3f611.jpg?alt=media&token=8bc5b15f-6f3c-415a-95b2-b61701387ef7',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa9f14f50-3d26-473d-a6b0-992c00810c7f.jpg?alt=media&token=ee7f3234-ec07-4401-881c-c3f4e29ec2bc',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F1be326ae-e7d0-41cd-83fc-032c845ddb80.jpg?alt=media&token=13595e80-82a1-4b8d-aeb5-ce9bda9a5523',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F05ba81d5-2953-49af-ac16-6b4edcc545ec.jpg?alt=media&token=71f5ea47-905d-49da-8255-614502d7a39d',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F696b5e52-bf62-4f65-ab44-be15c3224a0d.jpg?alt=media&token=4c1f12e6-86bb-4cf1-a0a9-26fed178d566',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fc6fe7fd1-371b-4dc3-bd4b-66497a3f1119.jpg?alt=media&token=6dc35587-801e-420e-9637-8a0f3e3abf20',
        inspectionVideoUrl:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fvideo-1240c253-bc64-47aa-af56-27a4ff4a135b3725718232246971523.mp4?alt=media&token=b1ee6041-0b65-4695-a3e7-31b79e6d78db',
      },
      {
        id: '0x3ee7',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F5c00389c-eb0b-4565-9e03-a0ba2cbf8c07.jpg?alt=media&token=dea190a5-3839-445c-8ba6-413247b304f8',
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff001b708-a750-4e9a-a67a-4e9a88fd7964.jpg?alt=media&token=4f685939-fb73-4a31-8314-c674838bc63a',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F09b24f10-eef8-4023-af04-4fa016646e64.jpg?alt=media&token=6862d46b-2cf0-4922-9627-e1b1a68e5ddd',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa066277f-b754-4291-a100-a0a71ee04cb0.jpg?alt=media&token=d9c84ea4-4732-4535-978b-c11277a282ce',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F720f872a-5f39-4e30-b44c-f7a7c19dbc16.jpg?alt=media&token=bb7ec0f1-6d4b-4e00-b988-2520ffc11f93',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F9b9ccb7e-a832-47e8-9042-2abaaa69ac3c.jpg?alt=media&token=9465c91c-8d62-4fd2-824e-0e759f08b752',
        inspectionVideoUrl: null,
      },
      {
        id: '0x4760',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa7b6474a-e9da-4892-81bc-97c928eec7b0.jpg?alt=media&token=9514cac5-ba39-47e1-aeb7-60a7c7877799',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2b19d227-54d1-413c-ac03-f971d649b993.jpg?alt=media&token=8d84c6ee-0a7f-4684-9d5e-8f88668554f3',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe6aba06e-097b-4fc0-a2d2-c8c5402dcf88.jpg?alt=media&token=cf7f2bfe-278a-4850-a1ac-9df198c11715',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe25e624b-58f5-4701-baed-725c0329fb90.jpg?alt=media&token=53c13017-00a3-4876-a938-623b754abd73',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb8b30556-a466-4046-9b5c-775a5265742f.jpg?alt=media&token=be56475c-c8be-4d76-8886-3594b4aca714',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe916b2ec-afb9-4f93-bb20-b1900b7dd155.jpg?alt=media&token=24eba6d8-1b02-4ca0-8852-4e6159779eb6',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe93a6eb8-fb3c-4e30-a51c-fb235080c54d.jpg?alt=media&token=00d43993-eb75-4d06-b89d-aa5b21aea962',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F32067c4b-d8ef-4668-bb8f-f45229a39bf1.jpg?alt=media&token=d1d20bbb-e125-4515-91d1-43237cbfc4b3',
        inspectionVideoUrl: null,
      },
      {
        id: '0x476b',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F897f32a6-9e88-440e-a372-115514266e37.jpg?alt=media&token=304378e7-1125-4781-a433-813efa27d51d',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff91d7531-711b-4f53-83d1-64d48a98bb22.jpg?alt=media&token=edbbef34-192a-4c52-99e1-3eb7eb3b903e',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F93978f48-bf59-4b45-b76c-2be92f31cec2.jpg?alt=media&token=fb2c4e2f-5078-40fb-a536-351965e6a0c4',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fdc3d64c1-4354-49a7-a86e-7036eec2fa63.jpg?alt=media&token=8073830b-4eed-496c-bf98-1c3ffcae8703',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F1ae171b1-73a7-4a57-b745-378a29591281.jpg?alt=media&token=6dc41145-c386-44b4-805a-83be94dd127c',
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x476d',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2212048c-099d-4ed4-918f-d2a2e1d89a50.jpg?alt=media&token=6c22547a-a61c-4145-9df2-0d5e97c34eb7',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F5dc97d19-5824-4938-9068-cd47eb63407c.jpg?alt=media&token=fd1c8f7f-1c5a-4118-8743-7102859b1657',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F47dda74e-9411-4f15-9db9-0d343f37a97a.jpg?alt=media&token=ef6adfa1-c623-41e8-8351-51c72b510ef6',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd32d42dd-ae94-4f4d-a630-0161a989065c.jpg?alt=media&token=83fe3112-560c-4657-a0e7-555041a459e5',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x476e',
        odometer: null,
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F06ddae50-b8e8-4b5f-9d8f-a9721bef25a9.jpg?alt=media&token=ce8dd952-a86d-4ccf-9f87-08bce433aa7f',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Feeea8178-d9a7-4264-8003-682ce2256115.jpg?alt=media&token=c26f2518-3d62-4942-835d-b046c415487d',
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F3b786c16-802f-453b-b3c8-dc0d4ba3774d.jpg?alt=media&token=4bc089d1-1659-42cf-8e01-fecea0c45348',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fed32aae9-75a9-46ee-9e26-f49cdea08364.jpg?alt=media&token=bc17014d-9d03-48b1-8472-8212381af800',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2b3a439d-072d-4f2d-8eea-fd7f6762d3d8.jpg?alt=media&token=80c1dfda-1a84-492f-b1fb-dd59e803ca6a',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F3e583bf4-dc39-4817-b15c-8d611bb2ce6c.jpg?alt=media&token=61fb5bd3-48cc-43a8-877f-ec04f87cd470',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F15e27490-e6dc-440a-b89c-8a6e8b14f6a3.jpg?alt=media&token=c3d4237b-fa46-42bc-8acd-47dff538f68c',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F5ac7a604-7cc6-46e7-aaef-86cd9e2e0449.jpg?alt=media&token=f37861a8-252f-4730-901f-95277f02c7cd',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa5aff34f-5a62-4713-9491-0f3b94082bd7.jpg?alt=media&token=6a21000d-78ee-4319-abc5-65989c79f954',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F286b70e3-ba19-4a6e-8cc5-b75c2fe787ab.jpg?alt=media&token=209cf438-a8f7-4156-a0c9-85c6a1319394',
        inspectionVideoUrl: null,
      },
      {
        id: '0x4776',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2c40b79f-8dfa-49b3-9304-ab91eed57ad2.jpg?alt=media&token=062a4503-a12a-4c54-8431-faf88820b4b7',
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: '',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fda931c57-8072-4bda-bf99-802a4d4d15b7.jpg?alt=media&token=5b9df004-9d0e-41af-84b3-07cbaf7d6682',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fdc7b718b-dca5-4440-9f50-43fc335d50b1.jpg?alt=media&token=88cd371f-e72f-488f-8bff-35fda013e171',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4221a9db-1d08-4bb6-91d8-8dc29a0eade0.jpg?alt=media&token=8260a050-4801-49de-a770-bc32679498dd',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F3beec07d-2514-41bf-bdae-6a0187edf2a6.jpg?alt=media&token=e33dca8e-ddec-456c-93ae-a8a8ba582093',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x477b',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd5dc9e5b-c2a9-479c-ad5e-bbe605e661d9.jpg?alt=media&token=20a9270d-2ed2-437e-a7b0-fd0b5382fda2',
        chassisNumber: null,
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fc4d0f9fc-8fe0-45f5-89b4-318312585c7f.jpg?alt=media&token=dfe3ddc7-68a0-4e07-a0d7-47ad0383ebee',
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa54f9b99-a48d-4d69-bcea-1af3fbe5d5ad.jpg?alt=media&token=4a28f707-9fbc-4c56-9386-f9fccbdfe612',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Feb076111-5349-4b52-ac28-07fb82c217f5.jpg?alt=media&token=8249e22c-5ecd-48e8-a6ae-b6dcaf92beb8',
        leftBodySide: null,
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2d3b1f72-f263-4c43-9965-fd0f4b795996.jpg?alt=media&token=28dbe599-7714-4433-bc7a-d73cd667b569',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x477c',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F0d0b7a7d-505a-4de3-bb96-34c5df30ed99.jpg?alt=media&token=74d7d2fa-d5a2-40dd-83cc-6910ca29015b',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fee0350ff-9ab9-4135-925b-2d1fdb7f2fdd.jpg?alt=media&token=809c46b8-5861-4bec-bce0-0737ed209637',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fdaba037f-4ffe-41a0-8733-3edc411b5071.jpg?alt=media&token=f40d52a0-fa9f-4d66-abcb-80b72dcdf387',
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F23926cda-1d0f-40aa-8898-af2e132d4404.jpg?alt=media&token=8752aa89-b4c8-45b5-b7c3-cedf2dcafe90',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4d293053-b688-499b-94da-dec9d4924b2c.jpg?alt=media&token=11bc6369-cc83-4765-847b-66ec1aba12cb',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe370b9ab-3462-43bc-9a56-e1a67e3e3634.jpg?alt=media&token=2408a756-3e4b-46e7-a2e4-23312bfe8545',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F858e6791-4817-47b6-bbb0-71eb0503def4.jpg?alt=media&token=e9660f78-1004-40f5-a013-d1da310fc3c1',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe90490e8-8339-4e94-ae3b-0755dd18c6d2.jpg?alt=media&token=6a31af00-1a70-451c-afef-4660a967b535',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fdf88fa9b-83ef-4909-98c9-5c19f6ff685d.jpg?alt=media&token=4326dcd8-f533-464f-8692-604af90714fd',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fee33feb6-1005-4553-b0d8-4c9e1b7607c1.jpg?alt=media&token=f7cb3200-d06b-4bfc-a353-5a1c477e058b',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Febd14071-1829-484a-8ee9-04f4b8fca722.jpg?alt=media&token=cbc3ea6e-d7b4-4aef-bb40-3ae41f7ff401',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F9673701d-26e2-432c-80ff-0d5549f3f6b7.jpg?alt=media&token=3a885a62-8843-441d-bffe-83684888cbeb',
        inspectionVideoUrl: null,
      },
      {
        id: '0x4780',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff08fc3cc-72ab-4554-b98a-0cc3258a3d80.jpg?alt=media&token=f483a91d-e4ba-4113-9657-4e3001139fea',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa8d94c4f-383c-4520-9742-87e06cea59e9.jpg?alt=media&token=bca0a916-83d3-4a56-8dd2-58ffc13e01f8',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F65a9444f-814e-41a8-a463-81b9882b74b6.jpg?alt=media&token=bf932f2c-e380-4342-9204-ac2870fab022',
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fdac83ac5-f92b-424d-bb87-e0f629bc253d.jpg?alt=media&token=947e044b-422c-48d6-87fb-a873037c339d',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd032be11-d591-4748-a529-c7d27ff506ee.jpg?alt=media&token=756244ee-586f-4f38-9749-ccd048094257',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F0e846a9a-ad9b-43e8-afd3-7dd0bfcf32a8.jpg?alt=media&token=9d36c4ab-4f5e-4f1f-9436-fdf64de1c776',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F22a659c3-d1a7-444a-ad30-65a5ad6820d6.jpg?alt=media&token=dee5476e-8e94-4620-b3ef-ca3592b15288',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4da88b61-b4ab-489d-a440-3f1ddb770309.jpg?alt=media&token=90f1d297-c5e2-4c92-b78c-bb46dc0be0f4',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F25f87961-07e1-4421-bcee-319ee4674687.jpg?alt=media&token=8edf592e-a4a5-4b2a-bd29-a114ca21bbb4',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fec30851e-be25-49cc-88e7-360cb9d1e2c5.jpg?alt=media&token=79567bf4-b3cc-4cbd-80b7-0964eef66a00',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fdf598f05-2ea2-40e0-ba9d-5265bae8351c.jpg?alt=media&token=01fd4a48-6ff6-487c-a16b-09439703a73c',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd24906e5-cb63-4a81-833b-45714d9d80a7.jpg?alt=media&token=47aa3d03-6608-4f5a-aced-d4178c53d71e',
        inspectionVideoUrl: null,
      },
      {
        id: '0x4784',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F539a6446-7d7f-4200-a93e-1d290a579a03.jpg?alt=media&token=78bb25cf-c780-46af-8c34-04bfb2fb0a8b',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ffc900ef4-c5ea-4d5b-8378-7ed9fec700aa.jpg?alt=media&token=6bb1f2de-794e-46aa-95cf-99500d211864',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa2365471-6ad3-49d0-b3b6-f1c102fc31c3.jpg?alt=media&token=5dd48bbb-5f92-4cf4-bde1-0ef4514c408b',
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F9eee39cc-28f2-418b-a008-0dee06dc7401.jpg?alt=media&token=9ce458d6-9956-48d9-99b8-0ce30aae7eb2',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F9379ea17-0998-47af-b80e-b2e2750b6c6e.jpg?alt=media&token=8e636905-cc78-41e9-8bfc-7b391220ccae',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F8c4a166f-02b2-47c4-96a7-5a393ad96e1c.jpg?alt=media&token=d6640bd3-4f39-4c9b-9b13-7aa57d131049',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff1711d0e-0c86-406b-ad55-ef53d6e9f0b5.jpg?alt=media&token=bb0417e8-e5d8-4b5e-accd-76b6afa62d50',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F13eb29c8-e1c0-4e4d-9690-d499cc0bb8b9.jpg?alt=media&token=b446572a-fa6b-4ca9-a55a-0ddac2564ab6',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fcee1d921-8ed3-410e-a56a-104f0b60316f.jpg?alt=media&token=9926ccaf-2a65-4b7a-86eb-11e1b2d6fbb9',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F3598bf76-0732-483f-ae78-d88c212df53d.jpg?alt=media&token=0b1ea797-d5cb-4110-8903-557eb2a00d3b',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F839d64a2-5db7-42dc-8ce5-7ccdb6245da9.jpg?alt=media&token=612503aa-e2cd-42e6-9995-bf7d65c34bdf',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fba686a33-999d-4a5f-a2a4-903454ffa1ea.jpg?alt=media&token=108045da-9a68-41b6-96fb-23a378727c02',
        inspectionVideoUrl: null,
      },
      {
        id: '0x478a',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff33a180d-3aca-4a69-be7c-be49f77fcbf9.jpg?alt=media&token=5add9603-817f-4f34-af42-2b846bbb3848',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb1fe125d-ae0d-4612-b12a-c4ad1570344f.jpg?alt=media&token=b2c1f96b-c7ee-47dd-b46a-583131bf3f0e',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F899f4265-73aa-468e-805e-a02a5211e007.jpg?alt=media&token=a8344ae4-ecda-4028-a872-35b9e08550b2',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F212847c2-2e72-4664-841b-7fa252675206.jpg?alt=media&token=3a832705-63db-4e42-918d-0de8ae0707ba',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F0b89389d-72a4-4d27-a08e-641c554504e8.jpg?alt=media&token=aa055cfb-3fbc-41a5-ba6b-09ddd608048d',
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x478f',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff1c32212-e6c6-488e-b238-ee964e4c3f14.jpg?alt=media&token=f57d1597-31bf-46cb-a751-163d52b29872',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F54743aa6-d9b0-4a32-baca-161ce412d23e.jpg?alt=media&token=69cd827e-ee3b-4b94-8aa9-18706c8221cd',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fef52c717-f29c-4da7-a1f3-240d98cdb2b4.jpg?alt=media&token=fcbb2089-10fb-4732-9db8-b9c655111f8c',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa597aec4-1bb9-48d2-942c-6f127984cc42.jpg?alt=media&token=e99b1a3a-7310-4fa3-8b51-e0cec970fb97',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F5ff0b798-7c1f-4a92-a9ae-78e0455e78a2.jpg?alt=media&token=33d2420d-183d-4473-afb0-91fba81be166',
        backRightTyre: null,
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe7bc0f03-dab8-42fa-9a68-6d5e16efaa66.jpg?alt=media&token=91d82791-b14d-40f3-8329-2ff1ee54ab5b',
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x4793',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide: null,
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F5659645d-3428-4470-af06-d74be3f0ed65.jpg?alt=media&token=7f4b715b-eb44-41b3-a886-030e0fc9a1a4',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe203d46a-2ac1-4798-87ef-c244e4a749cc.jpg?alt=media&token=62dffa80-a3a4-43a4-acf2-a793c1a7af36',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fdfa9617b-cc35-4b82-b39f-3fa788678d15.jpg?alt=media&token=408d8614-f8c2-4afa-a694-156e37775646',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x479e',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fde049e53-13b7-4a90-b79a-8bc39c97c994.jpg?alt=media&token=f2dfd611-2e28-46cd-84ee-1f16e28c1d2e',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Feb241514-daca-412d-98a9-f0c85baf0497.jpg?alt=media&token=dd25c40d-0710-4c91-8f99-0aad43155c36',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fda37ebb8-8478-4302-a251-e5660b9e6e4f.jpg?alt=media&token=2d6578e5-7052-4820-90ef-74de75d33629',
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F52a2682a-5c7a-4834-b38a-e40c3ffb04e7.jpg?alt=media&token=dd494f6b-300f-4f38-8dac-abcd3791f2c0',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F5c6c3d86-a3df-4650-b821-0355a44f0b4b.jpg?alt=media&token=613c889b-5482-4986-98cd-6c123a456c94',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F56d9bdcb-af2f-4b50-b531-67b3f7427f6e.jpg?alt=media&token=c2b84699-b73b-40b9-bf37-847ddd190196',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F8898ffd1-f4d0-45aa-8869-42fbd8a33dc5.jpg?alt=media&token=f864baff-2267-4730-8b2b-06c1c3924645',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F9efc5825-6250-4eea-a666-06915b993f6d.jpg?alt=media&token=64c3c9f2-617f-42df-8f2d-84b6e96ca907',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F14fee350-fbe1-400e-92db-fee78e7f6c5e.jpg?alt=media&token=494c1a8e-5af8-4c16-bbb2-1d530fbd8104',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe9036968-9ef2-4b1b-b5d5-d02f2cd31e36.jpg?alt=media&token=fd4fba65-08d8-4a32-bb56-3c822128cf97',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F835b0d11-0f84-44ca-a9df-e76a1d86ac12.jpg?alt=media&token=e410a3a8-e41d-4cc0-af5f-75cf01d5a01a',
        inspectionVideoUrl: null,
      },
      {
        id: '0x47a5',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F8bd95626-60f9-4da8-9a39-1509dc0c9861.jpg?alt=media&token=63fc1401-3b65-4954-ba7a-1aa616918eb9',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb8653404-5e54-425b-96c0-749289e36f67.jpg?alt=media&token=d6b3ad4b-2b04-46ac-987b-8ad1ca419110',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fdc8db6b5-1e7d-4798-8015-24fd7a1b31b9.jpg?alt=media&token=5c1ba7e7-af8a-4a8a-81f3-e5b5567e39cc',
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa117d166-3d95-4287-a59f-d795ab55925a.jpg?alt=media&token=50382385-683f-4345-8a37-921c0bc63716',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2a9cf627-4f1f-4d32-8ae4-a6bec652fce6.jpg?alt=media&token=9e22baa2-357b-4483-b2ec-f29a8b36e69e',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F207e2549-1f07-4be0-8dcc-c94f79bd856c.jpg?alt=media&token=e1d6422c-9a9f-44c9-968e-ad4649ba20a8',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe454feef-f995-47af-8324-9c2d0ccaf6f7.jpg?alt=media&token=2eb04624-adca-4ea7-9b28-c4c79c6e7f35',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fc2484823-7909-4600-a64d-0b5a7a31406c.jpg?alt=media&token=214289c8-c52e-40f6-84b2-ed1a2d6ffa30',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F766ef132-9380-442b-b7f0-03d7150962a0.jpg?alt=media&token=b93ce720-df72-4d5e-9f8f-22df8a2d3687',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fbe00dc80-e43e-4264-a45f-085418afd2ae.jpg?alt=media&token=41d1722b-7e8a-43fd-8c2f-4c869d650b50',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fc377b6d0-860f-43ae-85ed-ea6cd309206e.jpg?alt=media&token=938276c6-42b4-4821-acc0-1494ad079bf7',
        inspectionVideoUrl: null,
      },
      {
        id: '0x47b7',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F1a12b994-af76-4507-92fc-b64e69fffd63.jpg?alt=media&token=ce12e200-7600-4c2f-bda8-39b921218262',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F61f99c8c-41ea-4bdb-979a-3b31893815ca.jpg?alt=media&token=98315364-3acb-44d1-8cb3-d9ffdf54dda6',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F5ea5b88f-f5e0-4347-ba05-031ccd6126da.jpg?alt=media&token=2102fc61-46d5-423f-9216-43698d2a85ea',
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F8cf5efab-f532-476d-abb3-2ec50ae3ebf3.jpg?alt=media&token=bb8bbca3-f1f9-47c7-ad45-caf51fb8cc11',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4551ea10-9fd5-4684-b048-5e9131405ee2.jpg?alt=media&token=cfcf5f2d-f6e9-4700-a9ba-1d7f194cd60d',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff0cfc709-a986-41e0-a78f-fcf2f0262c85.jpg?alt=media&token=5aaf5901-ff0a-480d-b29f-0a84df06af43',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F269c499b-f352-4737-92df-28988ef21d11.jpg?alt=media&token=383bc021-4e1a-4b15-9edc-92e3cfc447a5',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F31146886-624c-48c5-bfb0-9be77349bb5e.jpg?alt=media&token=143848cf-12c6-4786-94e4-54451aad45f4',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F94f5cb8f-7424-487e-a6a4-fa82aac5a4cb.jpg?alt=media&token=269eac1d-fcb7-4e3e-bcc8-2b14703e17e9',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F7ccbd73c-3db9-447a-a475-0125218fa4c8.jpg?alt=media&token=c76bbdbd-66fd-4149-a623-499a6435bc1d',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb87db61d-ccc0-413e-8fbd-01ccd1844b1d.jpg?alt=media&token=ca9ecc32-cca6-4c24-8604-d422274281d3',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fc0fcdc29-1d76-41bb-870c-9eed39395a09.jpg?alt=media&token=a94a8837-d6be-4883-ac92-ff759cfc2951',
        inspectionVideoUrl: null,
      },
      {
        id: '0x47b9',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Faee62e55-547c-4e70-b25b-5feb84efbb45.jpg?alt=media&token=89d3372e-50fd-4133-ad17-6296edb1439c',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe0458baf-eddb-46f1-b0e8-701a812c2e6f.jpg?alt=media&token=d4b63da3-5675-41b5-a2d1-1e02ea268532',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F86c5c5ba-b242-4ae8-83b9-7ec577c8665b.jpg?alt=media&token=06ee4e49-a909-4334-b541-f18d934a69f9',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F422f0ffc-35ae-47d5-9571-fc5c88fcda18.jpg?alt=media&token=34ee9091-54d8-44ae-8388-51b44783593d',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x47be',
        odometer: null,
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4250d4b9-e041-4922-97bc-95427f877093.jpg?alt=media&token=6a1b0a38-7ef0-4862-953f-2e831b934739',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F950e6e8f-233b-48fb-b44b-85ce14819389.jpg?alt=media&token=75e022d6-2de7-4082-b483-37915eb6f748',
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F45eb751b-1a4c-4fd9-801b-a68165b19b91.jpg?alt=media&token=44f4f9d0-8bef-4f8d-bd5d-581829c3babf',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F64beaae2-7642-4cef-ad47-179d65028603.jpg?alt=media&token=74cb1317-47b5-415d-8fd0-43562f2d17ba',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fbcd0bb99-fd3b-4ae4-93ed-c48f4deefe33.jpg?alt=media&token=08527cc5-693d-44ac-9fcb-b3b01398280d',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff6d893f2-5e60-414e-b7f3-bbb39285b582.jpg?alt=media&token=d7011f0e-c317-4810-9a0d-81e6208ca809',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F07ce238b-b5ff-4e06-bb71-9ba37b1f8102.jpg?alt=media&token=fcb4e27b-b39a-4ac9-9c8f-96d622c2dac9',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x47c7',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F6dcaa4dc-2097-4c1f-816b-6e4f7a79875a.jpg?alt=media&token=5a8bb848-de52-465f-a060-9713fcefe8fd',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F76017904-ec48-46da-8d75-c7e84a349eae.jpg?alt=media&token=69494105-8a04-4136-aa0a-a6e276acbe3d',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fee9fde36-6e50-46ef-97ec-613b464914da.jpg?alt=media&token=2b38d5c0-38b9-4da3-99c5-c980b4966fad',
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F3b09bea3-7a3a-4156-884c-f88fa6a358f2.jpg?alt=media&token=e4919e89-924a-420c-a7f3-8e67c1b09776',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb8ba32db-4967-451a-aa96-8d1847af7ec7.jpg?alt=media&token=7eefae77-b0bc-43ec-9249-51365700be3e',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff3886825-7cf6-4a57-8f34-47818fa2b666.jpg?alt=media&token=37f15bfd-e743-41d7-a710-6c0c3fb33b4b',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F43346113-d975-4118-a2a6-3b9248029062.jpg?alt=media&token=d038b763-dc87-4533-a3e9-8f11a85c3bcd',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F9a2f416f-619b-41f1-9bb4-9fe43da71ede.jpg?alt=media&token=e8eb9f58-b9a9-4703-96e8-6d8845747253',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fded39eec-3e05-4e04-a083-88ac6bca977c.jpg?alt=media&token=3d89a4d2-09aa-46c6-a8fb-9005b1c5e4fa',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F7f56af52-05c9-4073-b852-2cafd6f129a8.jpg?alt=media&token=62734f06-6cf6-4342-a200-53e32f9b793f',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa390a31a-2c19-4423-be04-688f335c130d.jpg?alt=media&token=6cce78f4-6cca-4c41-a5d0-48650eaebeda',
        inspectionVideoUrl: null,
      },
      {
        id: '0x47cc',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2103211e-be19-46d4-a8b2-9fe5823054a6.jpg?alt=media&token=00a0c245-9d6a-4243-bb2e-d49cb1606810',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F089078c4-e9a6-4a6d-adfb-a75458312f22.jpg?alt=media&token=1a1ee8c6-cb4f-4ac2-8619-31a08a9b3072',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F23ed3453-3159-423c-ad38-38c2a7bf9191.jpg?alt=media&token=2415c4a4-45c1-4d5f-847a-d4aefa69bd68',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F80b666b4-8ce4-4ea4-88c5-1c9e8d16eb46.jpg?alt=media&token=622dbc10-105b-4ae5-aa61-c7f630bd5e11',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F16074a08-4d7b-4b89-87a6-73122c794817.jpg?alt=media&token=b1f467da-1544-4f1b-810f-9e77828a7c90',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff1859272-60cf-410a-817a-d40e20d9bc7d.jpg?alt=media&token=650d2cee-359d-4b0c-a83d-3018a16da47c',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd783392b-29b9-4cab-8ff3-ff7439c8c2c2.jpg?alt=media&token=51502a52-8f57-4b40-bd8a-48401968a6be',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F8c8fca27-be35-4d68-8b34-7b18ed117220.jpg?alt=media&token=c3de6ad3-79eb-47b1-b1e0-e0df7d395be2',
        inspectionVideoUrl: null,
      },
      {
        id: '0x47d9',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F83e40b27-9eca-4d70-93bb-3c66941de2cc.jpg?alt=media&token=72e29297-4dd5-4c6e-b0f5-c4a7c78166be',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F8436c082-6175-43e8-981b-38e6500e833c.jpg?alt=media&token=e27398ca-3253-40a6-af13-5c0f4c794541',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd16b32ca-4154-4dbd-8892-687d402f0e8c.jpg?alt=media&token=c8e07822-f156-436f-b304-24a01d0d5ebc',
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe06ee1a6-e992-44fd-8c23-d752f7d8fb42.jpg?alt=media&token=3578e54f-de2e-48ce-8265-2b39540a4c45',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F46eab9c4-da96-4769-8d3e-d6e70583ac6c.jpg?alt=media&token=15d97409-b656-4e1a-be2d-54f24f3e3d16',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fc92b3686-8bf7-4e50-acc2-b4e79fed04c5.jpg?alt=media&token=b4a8b6ca-de83-4325-beb2-79d5fdcd1b38',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fcbe2cf8b-aa39-4331-bd50-ba507364e846.jpg?alt=media&token=9c70b1cf-21c7-4005-afc8-cfec0ecf23e6',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4ab83979-9784-428f-8ffe-3d3614ba65a8.jpg?alt=media&token=25942907-b005-48fc-8305-b91ce734ff6f',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F087d0daa-fa50-4e5e-ace9-cf2b4ba75cfd.jpg?alt=media&token=fcb82145-7e1b-48f4-8963-11d9416f07a4',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Facace711-f949-481b-96df-aafd484282da.jpg?alt=media&token=437b965c-b668-4d8b-b5f4-f7a4247ecc4b',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F76e2c121-a4bd-480b-882e-f13ee5238730.jpg?alt=media&token=a327d81e-23ac-49f9-9b83-747a847ec2e9',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff2781a96-8094-4f0c-ab14-f6fd12d1d662.jpg?alt=media&token=3134a6a9-57d0-4325-bd6e-6d68d85f04af',
        inspectionVideoUrl: null,
      },
      {
        id: '0x47e0',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F06c0d94d-bf2a-4b3f-8b06-ae3eb1bf5b93.jpg?alt=media&token=6063bfe2-5b29-4906-b33f-cbe1f9f2f74d',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F5008ad14-a026-47e2-9a9f-c72c9fe5c6af.jpg?alt=media&token=eaddb25e-4b4a-4eb2-a27e-7e7c073adf90',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff25f018f-3305-47d5-bffc-47157bce8d2f.jpg?alt=media&token=37b51f3c-e2d5-4386-a77b-f71616c231f4',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F72bebba1-8688-413f-8e2b-13613b62e27f.jpg?alt=media&token=f77f7864-e9b9-40be-8ce9-63c335caae8f',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x47e4',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F5c6c488e-34ad-4ff3-95eb-5d37f044e3e9.jpg?alt=media&token=b2633304-ae8d-4cbb-8c41-2bf7d819728d',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F09e21b5b-f5ba-4224-8b31-34cbedf6075e.jpg?alt=media&token=709d9b17-05e4-44e2-bdc5-32f27f947354',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa3679622-bbe4-43d9-a97f-0ae6154f6cbb.jpg?alt=media&token=588f328a-9f04-4f4a-9902-40df3c2cfdce',
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ffc604930-7851-41f9-98cf-c0f8ee2c197e.jpg?alt=media&token=fd88ad42-8f97-4957-b6a7-e01d29683fe0',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F0597dca3-ebcc-4f1d-ba59-2808710fd169.jpg?alt=media&token=1f1b2c29-8724-44f8-9c90-76a962562eec',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2250fc16-3427-43da-9e35-00cff7e505b6.jpg?alt=media&token=35552350-30ab-4e6e-95d1-e5897334fcd1',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F397f2a33-cb42-4d6d-bef9-a447fe5478c2.jpg?alt=media&token=7bc4c025-fa94-464a-8e76-8e307271fc9d',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fec44bab8-885a-4b0d-9c20-1ef39ba3fe02.jpg?alt=media&token=d17b3f3d-e420-42b3-85cd-9fcb029206f1',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F3d84e25c-d2e0-4b39-87ef-15123f241a7a.jpg?alt=media&token=758be182-3c36-4294-890b-04e6721bf93e',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff0541e79-aa5f-42d7-9c28-daf278d45de1.jpg?alt=media&token=def4fa9f-b1b9-4aa3-a569-7a9e126778b6',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4340a800-3cdb-4b85-a6e0-7204ea289629.jpg?alt=media&token=a9e441e9-0267-4af4-8487-4fc20d17b5ce',
        inspectionVideoUrl: null,
      },
      {
        id: '0x47eb',
        odometer: null,
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F689394ed-19ed-40d3-89db-d11ba4f747a0.jpg?alt=media&token=be374fb9-f2ad-4289-8f84-1b0b6b9304ae',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd007b925-733e-4aa5-8b3a-ea27bd5e809c.jpg?alt=media&token=02f67ab1-1c01-4707-9450-0309fbf7c439',
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F7a50c142-e5be-47ff-9f98-6d6e986626ad.jpg?alt=media&token=81c1a71e-283d-4b92-9968-6381afbbae0e',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fdcd7f7f8-fc9a-4c17-b147-3df7bf25707e.jpg?alt=media&token=6127925c-ed6e-4d69-940d-afec95bbe901',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4e6b024a-95ff-42aa-aed4-33ed6ea24fef.jpg?alt=media&token=69247ff8-15a4-4c19-8044-8ea2fde702f2',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F90bdfd91-71a4-43f9-947a-7de0dd9e58fe.jpg?alt=media&token=ffe37a4c-f9fd-479d-9683-8d41ff1d672a',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4b66a468-90fa-4e8f-9e75-3084182841ce.jpg?alt=media&token=478c652d-00e2-4865-8fa5-3e4002080acd',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F45e7ebdd-53c5-4d25-831a-0d75e799bc91.jpg?alt=media&token=02b7200e-22ef-4da3-878e-1e1444e3c79f',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F30056f31-3f9f-4bae-96dc-e75e71de4d71.jpg?alt=media&token=0bef0dbf-bc9f-4eff-8da5-ba5899c86e4d',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa22ead88-872e-44b4-a7ab-22611722af95.jpg?alt=media&token=6d44643b-4ac9-4932-bb1a-25d2574c31a8',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F10793202-3ad3-48bd-a401-662a6638f450.jpg?alt=media&token=a5ae22bb-891b-477f-a41b-367cc2e1aa85',
        inspectionVideoUrl: null,
      },
      {
        id: '0x47f0',
        odometer: null,
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2db358ae-5451-4687-93e3-a4516b156d00.jpg?alt=media&token=c2db2d29-6b56-428a-abf3-ad796bc683a4',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Faa3df259-4a2b-4862-bb39-3abf6e7040cc.jpg?alt=media&token=6ec1441b-9e50-4db8-8809-c6d6cbb47bde',
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F0d764cba-618a-4f90-b1eb-9ab2057df760.jpg?alt=media&token=a277ecd3-c73b-4776-98ef-cc6c8247f51d',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb6f8a065-dd95-4345-a6af-a828f1f1234a.jpg?alt=media&token=3b1a3a5c-c739-4a27-9b5a-a04e67036654',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fbec8e74f-00d4-4ceb-bbe8-b6cd81f5da03.jpg?alt=media&token=532c881c-075b-4a57-b312-08923adf1331',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F0fb27cd3-99f5-411c-b7b5-9b029daffba5.jpg?alt=media&token=203105d9-84ae-4bbf-a060-118e9011ce09',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F72580857-0c88-456c-a7a1-3f4068d1f2cd.jpg?alt=media&token=fd5f02b4-710d-491a-b29a-b27443656a96',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F7219bdf8-ae9d-4872-b376-670efa7d0a5e.jpg?alt=media&token=f5a822b6-b9b4-441d-ac29-8eea33483021',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F518c8268-be9a-4aba-bf74-dc364559ac71.jpg?alt=media&token=6be8dc53-fd51-459f-8b69-56cf4e49f434',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F9b16aee2-f13b-4ab4-a662-7872e5d027f6.jpg?alt=media&token=e5fb0be6-ae9c-4e77-8c13-c266d4f1ee8e',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F96199234-d2c5-4903-8e05-beb4af34938a.jpg?alt=media&token=5ea6ec78-8893-4574-96ec-c5d61ac60f00',
        inspectionVideoUrl: null,
      },
      {
        id: '0x47f5',
        odometer: null,
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe6eefb96-a5f3-49e8-9ad5-ffb0fc606858.jpg?alt=media&token=cff23fd9-a21d-4821-9eb2-9b21ee41f77e',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fba79e16b-4894-49bd-a9c9-7fc637c761bb.jpg?alt=media&token=6ff6b348-582a-472d-a7be-49b07fa80816',
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F0936c349-01cd-44de-87cf-49705b36a5bf.jpg?alt=media&token=6d010b2b-b237-4c92-bfa1-8055e145ce79',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F50a8201c-1746-44b0-af73-e3c2c8a10e7c.jpg?alt=media&token=b3b01633-46f1-4583-8138-a08809df7116',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa25a66c8-3c0b-4a3a-8973-4e4082096616.jpg?alt=media&token=a0102b46-48b3-40ff-b7c7-91cffb9b826c',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fbb8fb927-ccea-4b66-adf4-3b57dc8dfa17.jpg?alt=media&token=d80bbd28-5bdd-4e8d-8e58-905175bd5254',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd5a0763c-48ea-4b2b-b3d7-d284841af527.jpg?alt=media&token=3d560bb9-16cf-47df-a741-18d1e58788f9',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd668e81a-bbc8-42a1-9680-2d0feb828ab2.jpg?alt=media&token=72925826-7216-49cc-a3de-2410517efac4',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb1f9a2b7-2218-48ec-bdd4-5fe2dbb33cdd.jpg?alt=media&token=4e954c40-964a-41e0-9bd1-6dcc12da0889',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F8c42a31a-80a7-4f7b-acd1-6da831f5c569.jpg?alt=media&token=7a4bc2bf-80f0-48f0-8e50-a516ed83a758',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fdecf306f-0929-4c34-bc14-0898b8c90f34.jpg?alt=media&token=791a11e8-8bd2-41b5-81ac-2e67a7160adb',
        inspectionVideoUrl: null,
      },
      {
        id: '0x47fa',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F86452915-98ab-4c22-84f6-c29fabd675c9.jpg?alt=media&token=b5ee083c-b154-43f1-aa96-174aad9699dc',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd7f8d90c-f4b2-4e71-9c56-33aa9fee022c.jpg?alt=media&token=8198c9dd-4192-4b3d-9537-5bafccb0a21a',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F21f1d741-bed2-4c33-8f34-b003e56de915.jpg?alt=media&token=f82dc0f9-3c2a-4204-99a4-558e116b5b09',
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F52dea9cd-d1ad-4a68-a19a-b907d44c8e42.jpg?alt=media&token=d2875672-b30a-4530-afa2-4961945a9d5f',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd92567cc-0e9d-48e9-9dad-989a093e208e.jpg?alt=media&token=bce9214f-e816-4153-88c7-5cd6ebb5fe4a',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F1294c1e1-6419-4a66-9d9a-d709aa2b58bd.jpg?alt=media&token=067a733e-cbe6-4b53-ae4b-01f27cb4b96c',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F517b39eb-0cba-448e-8199-480859dad797.jpg?alt=media&token=7051bf8d-a6e2-4fd7-ab03-d91f77b45c80',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe8eaf664-e756-48a0-a98e-26a2db2b06c5.jpg?alt=media&token=349e3bfc-fe33-45a0-8eab-6bf49ab0e7f9',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F9e1e1693-c89e-47e1-a708-e24ab172deb5.jpg?alt=media&token=8aaff4dd-f70a-46c7-bbb2-db83cab5b550',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa7e5a9f4-c611-418e-b29b-20ccab92e776.jpg?alt=media&token=c360e461-5535-405b-a302-a062465ff44b',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fba9f0d1f-9495-43b7-864d-036aba7b0eb3.jpg?alt=media&token=b9d2a24c-f87e-48e9-b934-1248d332754f',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4b7765b6-1654-48cd-867f-1818b5c9bf4c.jpg?alt=media&token=2464eed9-eccb-49bc-95eb-948a7336bf54',
        inspectionVideoUrl: null,
      },
      {
        id: '0x47ff',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb68c2b1f-c707-41aa-abc9-cf4ff0dd23be.jpg?alt=media&token=d10bcd27-9f80-4ea2-921b-16247c5d4de2',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F9ae32c61-14ec-46a5-8e7c-480a958fd467.jpg?alt=media&token=c59c4b88-632e-46b1-b116-81f45b96bc0f',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F7ed8a82a-1970-474b-85f5-5f4ebd807bef.jpg?alt=media&token=8c6f6317-57c3-4a8a-a2d4-284820e05c40',
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fbb12c29d-0b94-41a2-9e12-cd175951d90a.jpg?alt=media&token=1d5b53d7-5f52-4e96-b10b-7ac8dcc96f0e',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F46cd7b40-ff60-4907-8f9a-f758887dbc39.jpg?alt=media&token=3cf6950d-064d-4a2a-b65c-0ac101703ef1',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4f75ba25-1b72-4991-aab7-09774b5af0dd.jpg?alt=media&token=ca6ce991-4dd9-4f7d-aa13-4d6909bec40c',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fc07434ac-211d-46b4-80d4-3f77fee1318d.jpg?alt=media&token=14a24fde-9cfc-4982-9117-7f51afc9f493',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fead4e05b-1c97-4a8f-8974-2eef8022ccf7.jpg?alt=media&token=b9877a67-a8c0-4001-859d-6f12ee193406',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2f61d456-5053-4076-bf08-d5832ec0052b.jpg?alt=media&token=8db1fbac-e03d-4932-bb20-8b0bb1b9cdbb',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4b844ad8-d1cc-4f08-b958-f97f844bd9a3.jpg?alt=media&token=1ad7d0d7-b06a-4ba1-8abf-541bf0632cc8',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F062689a1-3cc8-4099-8721-82d98c31a942.jpg?alt=media&token=51dc5905-484d-433f-84f5-66cbcbe35dbc',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F040bf52a-b8d5-48d4-8cb2-0f887f455c23.jpg?alt=media&token=f89db8e9-b26e-45fe-96a5-4f4d25dbc2fe',
        inspectionVideoUrl: null,
      },
      {
        id: '0x4804',
        odometer: null,
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F0d7f9c08-7e0f-463e-b0f1-a7bae8a18455.jpg?alt=media&token=e3cfab28-fb0d-4676-ba95-7d729ad74071',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F76084480-a0a4-447f-821b-462264aa7f4b.jpg?alt=media&token=3c45f00b-0ae2-441d-a837-49e95bfc31ca',
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F22404612-5f9e-4e29-98be-925460210972.jpg?alt=media&token=5294be81-f65f-4d53-a342-9719cf69d7c6',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F01900623-f3ce-4c70-9a2b-545af1591e27.jpg?alt=media&token=cdb0189e-d693-4b39-bc1f-bffab94c7b33',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ffeaabbce-3d7e-464e-bdf2-81b364a13c48.jpg?alt=media&token=972910de-3df9-46ad-93d1-90ab7b100d58',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F6249579d-04bc-4dd6-8ef4-a1e87c55e598.jpg?alt=media&token=f7d34776-814f-46c7-9ff4-f82e88dfd9aa',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Feed64d98-8ced-496e-8715-11425bf72a19.jpg?alt=media&token=3241468e-acd6-4252-8624-75f305b69bf7',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F93630b57-e2dc-4ddf-85b6-13f2ebd4b52f.jpg?alt=media&token=5d861014-edf8-4b14-a983-7989d8f36b66',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F30986dbf-0fb7-4c9d-95f9-b22cf12dc1df.jpg?alt=media&token=8daf5097-bb9f-4b35-843a-282687aeed63',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F1b12f4b5-fd35-4031-903c-f07f377912a2.jpg?alt=media&token=7480e4ef-79bc-4b5e-b1fc-70618e48267e',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F0b0dbff5-6b01-4718-aff8-4b5522633814.jpg?alt=media&token=00725961-09fa-4341-8992-317d55dcbca6',
        inspectionVideoUrl: null,
      },
      {
        id: '0x4808',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ffef24a62-4fea-4a0c-b067-984c6aac273e.jpg?alt=media&token=26c0150c-38d1-4aab-8f74-aa59473c1560',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F4c20afee-82b0-4dc1-b891-b2c34955e058.jpg?alt=media&token=830ff5e6-8859-4a18-8487-a4a803eb8984',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2e3336b1-ab4a-455a-bff1-446652cfa42c.jpg?alt=media&token=8a84636f-d6ba-4789-9bb4-d77dd617605c',
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd45bb93d-9555-4b7f-b210-f7bf0b2c27ac.jpg?alt=media&token=f8c59b10-be13-4966-b4a9-0617c42f0b1c',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb6f9b464-4fa3-47a0-a2d1-eaba58520bb1.jpg?alt=media&token=53c07843-11e1-4287-926d-d659285fc3a0',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2475024c-3449-43cd-91a9-a0cdee095f94.jpg?alt=media&token=8e7c4451-dd10-4fd5-8d0a-a5142da20b6c',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd2cf0f7b-b676-42d8-a58d-dc8d6da27cc6.jpg?alt=media&token=62dfe7fd-0c48-4589-84d4-b79d60931539',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F3d69cbe7-2203-45c4-8308-9a58ccbb2a67.jpg?alt=media&token=d0ec6a4a-fc9a-4032-ad09-54605b07be61',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa147ae6a-c934-4f29-a0df-e229cc75145a.jpg?alt=media&token=b8b74e09-5b89-4394-a1fe-0467928f3b07',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe7d5ac05-e347-4a12-94f7-6676f212e54e.jpg?alt=media&token=a78e1ab9-31eb-498d-af3e-7a26196fbdbf',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2df7266d-dc1b-4c87-8bc1-2462c7dfb5b2.jpg?alt=media&token=69d418e7-d57f-47aa-ac3a-300c137daf9f',
        inspectionVideoUrl: null,
      },
      {
        id: '0x4821',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F857244c6-9ac5-4bd1-a14b-c067cb6aeeba.jpg?alt=media&token=3efc39a6-96a5-45b9-a01e-f358ba272f23',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb9d8fcaf-c5d2-42fc-a3ca-7c14029f8dcf.jpg?alt=media&token=1b01913e-d46c-48b8-85f3-ea454dde1ce4',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F9865a13b-1e66-45ef-aa6f-3350b09a8746.jpg?alt=media&token=6edf1dd0-1e19-4a54-8087-f24cfe3e019e',
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fcb839b70-49fb-4b90-9110-703a90048296.jpg?alt=media&token=c2f081a2-bf69-49dc-8adf-d9c3435e30df',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F18e933aa-4f0d-4691-aa8c-29aa2fe73491.jpg?alt=media&token=0d305216-79fc-4814-b9f0-4cd638ba706d',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe47e3ded-a2b4-4bba-8217-1c4c650cd184.jpg?alt=media&token=b60d8d02-9d6f-4b5b-84ed-abf3e84c3856',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F632482dc-2f0c-4f16-848e-7d908e290952.jpg?alt=media&token=237d2b43-5810-42c2-8c6c-5fd1b82342f8',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F857e60cd-5968-46d2-98aa-3d52f22fdca1.jpg?alt=media&token=3a40717b-7969-4118-8355-aaac7c6398b6',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb662a1b9-26a6-4cc3-b869-a319b3285b55.jpg?alt=media&token=1f3a491d-2463-468c-a744-ca9a4e6c0dde',
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x482c',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ffd15f3e7-996a-454d-83a5-3c37f51abbae.jpg?alt=media&token=9b5773a5-6e5a-405c-a90b-88c5d76129a6',
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2090565d-38f4-467d-aebc-7a9b3fdfedd8.jpg?alt=media&token=6d02904c-ab26-4181-b7f0-785fdf5ecf69',
        engineNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F2a86ea1e-15ca-460d-bb6d-151cee86777a.jpg?alt=media&token=3ed616a2-9010-4e26-be91-b056382fca24',
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff095eb46-8a02-4bd6-b8bc-b727347cd848.jpg?alt=media&token=f2bfde47-518e-4c5e-84de-50cb3e26d685',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff8a0567c-139c-4442-a13f-cf75a5e048f8.jpg?alt=media&token=6b08ccb3-0003-461a-b9e7-e326eb97d1ff',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fe7b4833a-1a5f-49c7-ab66-7763d3a6cfa1.jpg?alt=media&token=e52da3e5-03f1-49ec-8e2e-54af41302489',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F97407ef9-4572-4ec5-873b-71b444dff396.jpg?alt=media&token=666fdb40-adea-439d-80a7-ea18a831fa2f',
        backLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fbaeae83b-3f6d-40a4-bfbd-2a4a74806711.jpg?alt=media&token=771a3d4a-9e52-4eca-81ce-b6ef3e5ff017',
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff4c41b9b-4e31-4080-8f78-42cb2ed42cba.jpg?alt=media&token=3c19164d-db2a-4baf-a450-599de2518604',
        frontLeftTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd5f00745-8eb6-48a9-ab13-dedb48022125.jpg?alt=media&token=11210611-adf6-4412-b479-088e5299fdd2',
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F1921f348-92ed-4217-a93a-310c20c007ef.jpg?alt=media&token=7fae8936-de30-47b4-af7c-ac12df1a8bbf',
        inspectionVideoUrl: null,
      },
      {
        id: '0x483d',
        odometer:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F133067fe-62fd-4128-99d5-8afc4aafa846.jpg?alt=media&token=3c7846a8-10ce-44d4-a45e-574ab43975ca',
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F3578146d-8aad-47ea-95d8-d372920558e2.jpg?alt=media&token=506b1830-ce71-4e03-b891-0e94e2d203bc',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F1a6ecf6e-a35c-45c3-9e69-b259864911e4.jpg?alt=media&token=93312064-e447-4efc-8703-323ac67b43ec',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F76e42595-cbde-4a35-947c-c435e3cab0f4.jpg?alt=media&token=49a40805-4acf-40b1-a33a-b1791e374fc3',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fb1571f1d-6721-4347-b334-51ff1bb321e6.jpg?alt=media&token=299e5053-1212-4cc0-a1cd-f6dea1abff07',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x4cc6',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate: null,
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F1cf53717-a621-4c3c-8214-785c4200372f.jpg?alt=media&token=3230065d-c335-4778-85fb-62c9fa546f60',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa5e1755e-3a09-4a32-bdf8-1e07bc4b0935.jpg?alt=media&token=fb058c55-3f23-4365-9f73-bae1c93486a2',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F25e5abcf-e1a5-40d1-a96c-b3c4c5c93309.jpg?alt=media&token=10d652b0-b968-46fe-8b29-80a98b97ebad',
        rightBodySide: null,
        backLeftTyre: null,
        backRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F89249086-cea2-4690-b0e1-cf0d3cdfad0e.jpg?alt=media&token=6b143217-0277-43b9-9a8f-78b6cb514adf',
        frontLeftTyre: null,
        frontRightTyre:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fdfa82069-eaaa-47c8-a026-3fa5a2576176.jpg?alt=media&token=3e94dd52-44eb-4d61-b60e-3a913f1a3520',
        inspectionVideoUrl: null,
      },
      {
        id: '0x502a',
        odometer: null,
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Ff53aa766-e33f-4265-9642-51a0739aa857.jpg?alt=media&token=6ca2652d-4e9b-4b64-a750-bcde6bee6a6e',
        engineNumber: null,
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa4886376-5f45-47cd-92c2-f7ce35477c98.jpg?alt=media&token=7a861375-c9e3-40cb-842d-38f2f0bd8e0e',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fd86bc5fc-b34a-4dd7-b114-e787c31e23bc.jpg?alt=media&token=ee3e2d66-38a7-4e22-a1c4-5b6a8a4ebd9a',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F40326091-a861-459a-a38c-18ffdadc3a1e.jpg?alt=media&token=8cbf7cdd-843e-47ba-a909-76aa38bbb6f7',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F76f38875-1759-4cbd-af1d-0b3ae293b119.jpg?alt=media&token=c0a329e5-8276-459b-bdc5-a0b8ae5a6303',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F18b2a1b3-c7d4-4a39-89d0-36bb926d129c.jpg?alt=media&token=38007419-dc60-4ed3-aa74-86fbcc915deb',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x5030',
        odometer: null,
        chassisNumber:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F74b23f2b-32e5-47aa-9c6d-adaa4a47f731.jpg?alt=media&token=223a5ed2-e948-450d-a61f-240a25ebe0a6',
        engineNumber: null,
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F69fb4c5b-326a-4742-a637-e74b01002875.jpg?alt=media&token=8615adb1-4b23-41b4-b2ba-87b8e187b983',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F171241b1-0027-4608-a2b3-6368deea9670.jpg?alt=media&token=8b3f5cda-3f23-4341-a022-d407682330b8',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F6fa76b18-02d9-46ea-a1b7-5926c08a3714.jpg?alt=media&token=86b57441-0a78-4ff3-b127-78400be80608',
        leftBodySide: null,
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F71df6485-7361-4b6c-bbec-c0022193d8bb.jpg?alt=media&token=b0e53586-9078-4d56-9986-9bdd9a760d23',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
      {
        id: '0x5037',
        odometer: null,
        chassisNumber: null,
        engineNumber: null,
        fuelInjectionPumpPlate:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F8c3ca27a-30c6-4736-b01d-a75a6f54136a.jpg?alt=media&token=263da23d-4269-4007-a500-2da78b221e96',
        backBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fa75ca6d9-4516-42ec-ab76-333081a06f33.jpg?alt=media&token=cd288cb7-a0c8-450c-b8c1-36e07ba22457',
        frontBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2Fdc924a83-dfe9-4885-b6ba-68a5e2663e4c.jpg?alt=media&token=0a1eb3c3-4ddd-40ec-a5a3-d094a1a1bd4d',
        leftBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F92a26057-2167-4ece-8441-8091b71e08f0.jpg?alt=media&token=d7c1eea0-1941-48df-9198-a9f9a629cb7e',
        rightBodySide:
          'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F956ca742-448a-49e7-97ba-b5a163ce5f93.jpg?alt=media&token=4d6b0f61-9b13-42a3-b8c0-48b33e8331f7',
        backLeftTyre: null,
        backRightTyre: null,
        frontLeftTyre: null,
        frontRightTyre: null,
        inspectionVideoUrl: null,
      },
    ],
  },
  extensions: {
    touched_uids: 756,
    tracing: {
      version: 1,
      startTime: '2023-05-29T12:41:58.459724041Z',
      endTime: '2023-05-29T12:41:58.468607068Z',
      duration: 8883241,
      execution: {
        resolvers: [
          {
            path: ['queryVehicleImages'],
            parentType: 'Query',
            fieldName: 'queryVehicleImages',
            returnType: '[VehicleImages]',
            startOffset: 140245,
            duration: 8709670,
            dgraph: [
              {
                label: 'query',
                startOffset: 248944,
                duration: 8598260,
              },
            ],
          },
        ],
      },
    },
  },
}

export default function useMoveImages() {
  const [updateVehicleImages] = useUpdateVehicleImagesCdnMutation({
    onCompleted: data => {
      console.log(
        `re-write urls for ${data.updateVehicleImages?.vehicleImages?.[0]?.id}`,
        data,
      )
    },
  })
  function removeQueryParameter(url) {
    if (!url) return null
    return url
      .split('?')[0]
      .trim()
      .replace(
        'https://firebasestorage.googleapis.com/v0/b/vehicle-management-syste-e1fe0.appspot.com/o/images%2F',
        'https://vms-assets.tractorjunction.in/production/',
      )
  }
  function migrate() {
    for (const vehicle of response.data.queryVehicleImages) {
      updateVehicleImages({
        variables: {
          id: vehicle.id,
          updatedValues: {
            odometer: removeQueryParameter(vehicle.odometer),
            chassisNumber: removeQueryParameter(vehicle.chassisNumber),
            engineNumber: removeQueryParameter(vehicle.engineNumber),
            fuelInjectionPumpPlate: removeQueryParameter(
              vehicle.fuelInjectionPumpPlate,
            ),
            backBodySide: removeQueryParameter(vehicle.backBodySide),
            frontBodySide: removeQueryParameter(vehicle.frontBodySide),
            leftBodySide: removeQueryParameter(vehicle.leftBodySide),
            rightBodySide: removeQueryParameter(vehicle.rightBodySide),
            backLeftTyre: removeQueryParameter(vehicle.backLeftTyre),
            backRightTyre: removeQueryParameter(vehicle.backRightTyre),
            frontLeftTyre: removeQueryParameter(vehicle.frontLeftTyre),
            frontRightTyre: removeQueryParameter(vehicle.frontRightTyre),
            inspectionVideoUrl: removeQueryParameter(
              vehicle.inspectionVideoUrl,
            ),
          },
        },
      })
    }
  }
  useEffect(() => {
    migrate()
  }, [])
}
