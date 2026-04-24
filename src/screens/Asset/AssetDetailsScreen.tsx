import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native'
import { HomeStackParamList } from '@/types/navigation';

const AssetDetailsScreen = () => {
    const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  return (
    <View>
      <Text>AssetDetailsScreen</Text>
      <Button
        title="Go to Asset Edit"
        onPress={() => navigation.navigate('AssetEdit', { assetId: '1' })}
      />
    </View>
  )
}

export default AssetDetailsScreen