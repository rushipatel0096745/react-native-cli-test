import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/types/navigation';
import HomeScreen from '@/screens/Home/HomeScreen';
import AssetListScreen from '@/screens/Asset/AssetListScreen';
import AssetAddScreen from '@/screens/Asset/AssetAddScreen';
import AssetDetailsScreen from '@/screens/Asset/AssetDetailsScreen';
import AssetEditScreen from '@/screens/Asset/AssetEditScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AssetList" component={AssetListScreen} />
      <Stack.Screen name="AssetAdd" component={AssetAddScreen} />
      <Stack.Screen name="AssetDetails" component={AssetDetailsScreen} />
      <Stack.Screen name="AssetEdit" component={AssetEditScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;