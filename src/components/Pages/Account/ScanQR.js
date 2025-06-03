import React, { useState } from "react";
import {  View } from "react-native";
import { Camera, CameraType } from 'react-native-camera-kit';

export const ScanQR = () => {
  const [qrValue, setQrValue] = useState("");

  const handleQRCodeRead = (event) => {
    const code = event.nativeEvent.codeStringValue;

    if (code !== qrValue) {
      setQrValue(code);
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