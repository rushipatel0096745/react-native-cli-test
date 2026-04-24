import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '@/types/navigation';

const tagTypeOptions: { label: string; value: TagType; text: string }[] = [
  { label: 'RFID', value: 'RFID', text: 'Scan or enter RFID tag' },
  { label: 'QR', value: 'QR', text: 'Scan or enter QR code' },
  { label: 'Manual', value: 'Manual', text: 'Enter the unique ID' },
];

type TagType = 'RFID' | 'QR' | 'Manual';

const AssetAddScreen = () => {
  const [tagId, setTagId] = React.useState<string>('');
  const [tagType, setTagType] = React.useState<TagType>('Manual');
  const navigation = useNavigation();

  const handleUidChange = (value: string) => {
    setTagId(value);
  };

  const openQRScanner = () => {
    // Navigate to parent (Tab Navigator) and set params on current Home tab
    navigation.getParent()?.setParams({
      sheetOpen: 'scan',
      sheetAllowed: ['scan'],
      sheetMode: 'ADD_ASSET',
    });
  };

  const openRFIDScanner = () => {
    navigation.getParent()?.setParams({
      sheetOpen: 'nfc',
      sheetAllowed: ['nfc'],
      sheetMode: 'ADD_ASSET',
    });
  };

  type RouteProps = RouteProp<HomeStackParamList, 'AssetAdd'>;

  const route = useRoute<RouteProps>();

  React.useEffect(() => {
    if (route.params?.scannedUID) {
      setTagId(route.params.scannedUID);
    }
  }, [route.params?.scannedUID]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 16 }}>
        Select UID Type
      </Text>

      <View style={styles.row}>
        {tagTypeOptions.map(option => {
          const isSelected = tagType === option.value;

          return (
            <Pressable
              key={option.value}
              onPress={() => {
                setTagType(option.value);
                if (option.value === 'QR') openQRScanner();
                if (option.value === 'RFID') openRFIDScanner();
              }}
              style={[
                styles.button,
                isSelected ? styles.buttonActive : styles.buttonInactive,
              ]}
            >
              <Text
                style={[
                  styles.text,
                  isSelected ? styles.textActive : styles.textInactive,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
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

export default AssetAddScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },

  button: {
    height: 38,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginRight: 8,
  },

  buttonActive: {
    backgroundColor: '#263f94',
    borderColor: '#263f94',
  },

  buttonInactive: {
    backgroundColor: '#f5f6fa',
    borderColor: '#c9d5ff',
  },

  text: {
    fontSize: 14,
    fontWeight: '500',
  },

  textActive: {
    color: '#ffffff',
  },

  textInactive: {
    color: '#111c43',
  },
});
