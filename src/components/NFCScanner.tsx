import { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const NFCScanner = ({
  onScan,
}: {
  onScan: (uid: string, reset: () => void) => void;
}) => {
  const [scanning, setScanning] = useState(false);

  const resetScanner = () => {
    setScanning(false);
  };

  const handleScan = async () => {};

  return (
    <View className="flex-1 justify-center items-center">
      <View className="gap-2">
        <Text className="text-2xl font-bold text-center">NFC Reader</Text>
        <Text className="text-lg text-gray-800 text-center">
          Press Scan NFC to get started
        </Text>
        <View className="items-center">
          <TouchableOpacity
            className="bg-[#263f94] rounded-xl py-3 px-4 items-center"
            onPress={handleScan}
          >
            <Text className="text-white text-[14px] font-medium text-center">
              {scanning ? 'Scanning...' : 'Scan NFC'}
            </Text>
            {scanning && (
              <TouchableOpacity
                onPress={() => {
                  resetScanner();
                }}
              >
                <Text className="text-red-500 mt-3">Cancel Scan</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NFCScanner;
