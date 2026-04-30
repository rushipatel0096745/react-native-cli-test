import { View, Text, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HomeStackParamList } from '@/types/navigation';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';

const AssetEditScreen = () => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'AssetEdit'>>();
  const { assetId } = route.params;

  const [tagId, setTagId] = useState('');

  useEffect(() => {
    if (route.params?.scannedUID) {
      setTagId(route.params.scannedUID);
    }
  }, [route.params?.scannedUID]);

  const handleUidChange = (value: string) => {
    setTagId(value);
  };

  return (
    <View>
      <Text className="text-3xl">AssetEditScreen -{assetId}</Text>
      <Button
        title="Go to Asset Add"
        onPress={() => navigation.navigate('AssetAdd')}
      />

      <Button
        title="Open Sheet from Scan"
        onPress={() =>
          navigation.getParent()?.setParams({
            sheetOpen: 'scan',
            sheetAllowed: ['scan'],
            sheetMode: 'EDIT_ASSET',
          })
        }
      />

      <Button
        title="Open Sheet from NFC"
        onPress={() =>
          navigation.getParent()?.setParams({
            sheetOpen: 'nfc',
            sheetAllowed: ['nfc'],
            sheetMode: 'EDIT_ASSET',
          })
        }
      />

      {/* UID Input */}
      <View className="mb-4">
        <Text className="text-[16px] font-semibold mb-2">Enter UID</Text>

        <TextInput
          className="border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800"
          placeholder="Unique ID"
          value={tagId}
          onChangeText={handleUidChange}
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>
  );
};

export default AssetEditScreen;
