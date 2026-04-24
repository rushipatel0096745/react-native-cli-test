import { View, Text, Button } from 'react-native';
import React from 'react';
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

  return (
    <View>
      <Text className='text-3xl'>AssetEditScreen -{assetId}</Text>
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
    </View>
  );
};

export default AssetEditScreen;
