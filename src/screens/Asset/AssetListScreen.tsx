import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '@/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const AssetListScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <View>
      <Text>AssetListScreen</Text>
      <Button
        title="Go to Asset Details"
        onPress={() => navigation.navigate('AssetDetails', { assetId: '1' })}
      />
    </View>
  );
};

export default AssetListScreen;
