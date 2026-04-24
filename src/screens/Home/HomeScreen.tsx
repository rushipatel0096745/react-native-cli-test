import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList, RootStackParamList } from '@/types/navigation';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <View>
      <Text style={styles.title}>HomeScreen- Dashboard</Text>

      <Button
        title="Go to Asset List"
        onPress={() => navigation.navigate('AssetList')}
      />
      <Button
        title="Go to Asset Add"
        onPress={() => navigation.navigate('AssetAdd')}
      />
      <Button
        title="Go to Asset Edit"
        onPress={() => navigation.navigate('AssetEdit', { assetId: '1' })}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
