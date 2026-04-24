import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { useBarcodeScannerOutput } from 'react-native-vision-camera-barcode-scanner';
import type { Barcode } from 'react-native-vision-camera-barcode-scanner';

type Props = { onScan: (uid: string, resetScanner: () => void) => void };

const BOX_SIZE = 260;

export default function QRScanner({ onScan }: Props) {
  const device = useCameraDevice('back');

  const [scanned, setScanned] = useState(false);
  const [flashOn, setFlashOn] = useState(false);

  const hasFlash = device?.hasFlash ?? false;
  const { hasPermission, requestPermission } = useCameraPermission();

  const resetScanner = () => setScanned(false);

  const toggleFlash = () => {
    if (!hasFlash) return;
    setFlashOn(prev => !prev);
  };

  const handleBarcodeScanned = React.useCallback(
    (barcodes: Barcode[]) => {
      if (scanned || barcodes.length === 0) return;

      const value = barcodes[0]?.rawValue;
      if (!value) return;

      setScanned(true);

      setTimeout(() => {
        onScan(value, resetScanner);
      }, 300);
    },
    [scanned, onScan],
  );

  const scannerOutput = useBarcodeScannerOutput({
    barcodeFormats: ['qr-code'],
    onBarcodeScanned: handleBarcodeScanned,
    onError: error => console.error('Barcode scanner error:', error),
  });

  if (!hasPermission) {
    return (
      <View className="flex-1 justify-center items-center gap-3">
        <Text className="text-base">Camera permission required</Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-medium">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="flex-1 overflow-hidden">
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={!scanned}
          torchMode={flashOn && hasFlash ? 'on' : 'off'}
          outputs={[scannerOutput]}
        />
      </View>

      {/* OVERLAY */}
      <View className="absolute inset-0">
        <View className="bg-black/60 flex-1" />
        <View className="flex-row w-full" style={{ height: BOX_SIZE }}>
          <View className="bg-black/60 flex-1" />
          <View style={{ width: BOX_SIZE, height: BOX_SIZE }}>
            <View className="absolute top-0 left-0 w-10 h-10 border-l-4 border-t-4 border-white rounded-tl-xl" />
            <View className="absolute top-0 right-0 w-10 h-10 border-r-4 border-t-4 border-white rounded-tr-xl" />
            <View className="absolute bottom-0 left-0 w-10 h-10 border-l-4 border-b-4 border-white rounded-bl-xl" />
            <View className="absolute bottom-0 right-0 w-10 h-10 border-r-4 border-b-4 border-white rounded-br-xl" />
          </View>
          <View className="bg-black/60 flex-1" />
        </View>
        <View className="bg-black/60 flex-1 items-center pt-8">
          <Text className="text-white text-base">
            {scanned ? 'Redirecting...' : 'Scan QR code'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        disabled={!hasFlash}
        onPress={toggleFlash}
        className={`absolute top-20 right-6 p-3 rounded-full ${
          hasFlash ? 'bg-black/40' : 'bg-gray-400'
        }`}
      >
        <Text className="text-white text-lg">
          {hasFlash ? (flashOn ? '🔦' : '💡') : '🚫'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
