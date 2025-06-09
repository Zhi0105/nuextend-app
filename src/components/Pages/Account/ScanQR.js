import React, { useState } from "react";
import useUserStore from '@_stores/auth';
import {  View, Text } from "react-native";
import { Camera, CameraType } from 'react-native-camera-kit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signAttendance } from "@_services/participant";
import { showMessage } from "react-native-flash-message";

export const ScanQR = () => {
  const [qrValue, setQrValue] = useState("");
  const queryClient = useQueryClient();
  const { token } = useUserStore((state) => ({ token: state.token }));

  const { mutate: handleAttendance } = useMutation({
    mutationFn: signAttendance,
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ['mark-attendance'] });
            showMessage({
              message: "attendance signed",
              type: 'success',
              duration: 1000,
              floating: true,
              position: 'top',
          })
        }, 
        onError: (err) => {  
        showMessage({
            message: err.response.data.message,
            type: 'warning',
            duration: 1000,
            floating: true,
            position: 'top',
        })
    },
  });


  const handleQRCodeRead = (event) => {
    const code = event.nativeEvent.codeStringValue;

    if (code !== qrValue) {
      setQrValue(code);
      console.log('QR Code Scanned:', code);
      const parsed = JSON.parse(code);
      handleAttendance({
        token,
        participant_id: parsed.participant_id
      })

        // const parsed = JSON.parse(code);
        // if (parsed?.participant_id) {
        //   handleAttendance({
        //     token,
        //     participant_id: parsed.participant_id
        //   });
        // } else {
        //   showMessage({
        //     message: 'Invalid QR Code',
        //     type: 'danger',
        //     duration: 1000,
        //     floating: true,
        //     position: 'top',
        //   });
        // }
      
    }
  };


  return (
    <View className="scanqr-main min-h-screen flex-1 items-center bg-white py-4">
      <View
        style={{
          width: 300, // Set your preferred width
          height: 300, // Set your preferred height
          overflow: 'hidden',
          borderRadius: 16, // optional: for rounded edges
        }}
      >       

        <Camera
          ref={(ref) => (this.camera = ref)}
          cameraType={CameraType.Back}
          flashMode="auto"
          scanBarcode={true}
          onReadCode={handleQRCodeRead}
          showFrame={true}
          laserColor="blue"
          frameColor="white"
          style={{ flex: 1 }} // Make camera fill the wrapper 
        />
      </View>
         {/* Display scanned QR code */}
      {qrValue ? (
        <Text className="mt-4 text-lg font-bold">Scanned: {qrValue}</Text>
      ) : null}

    </View>
  );
};