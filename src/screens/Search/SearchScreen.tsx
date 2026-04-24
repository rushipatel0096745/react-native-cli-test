import NFCScanner from '@/components/NFCScanner';
import QRScanner from '@/components/QRScanner';
import { HomeStackParamList } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

type TabType = 'nfc' | 'scan' | 'manual';

type Props = {
  onClose?: () => void;
  initialTab?: TabType;
  allowedTabs?: TabType[];
  sheetMode?: 'ADD_ASSET' | 'EDIT_ASSET' | 'DEFAULT';
};

const SearchSheet = ({
  onClose,
  initialTab,
  allowedTabs,
  sheetMode,
}: Props) => {
  const [tab, setTab] = React.useState<TabType>(initialTab || 'manual');
  const [UID, setUID] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const navigation = useNavigation<any>();

  const tabs = [
    { key: 'nfc', label: 'NFC' },
    { key: 'scan', label: 'Scan' },
    { key: 'manual', label: 'Search' },
  ];

  function handleSheet(uid: string, resetScanner?: () => void) {
    if (sheetMode === 'ADD_ASSET' || sheetMode === 'EDIT_ASSET') {
      navigation.navigate('Home', {
        screen: 'AssetAdd',
        params: { scannedUID: uid },
      });
      resetScanner?.();
      onClose?.();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.handle} />

      <View style={styles.tabRow}>
        {tabs.map(item => {
          const isActive = tab === item.key;
          const isAllowed = allowedTabs?.includes(item.key as TabType);

          return (
            <TouchableOpacity
              key={item.key}
              disabled={!isAllowed}
              style={[
                styles.tabButton,
                isActive && styles.activeTab,
                !isAllowed && styles.disabledTab,
              ]}
              onPress={() => isAllowed && setTab(item.key as TabType)}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive && styles.activeText,
                  !isAllowed && styles.disabledText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {tab === 'nfc' && (
        <NFCScanner
          onScan={(uid, resetScanner) => {
            setUID(uid);
            handleSheet(uid, resetScanner);
          }}
        />
      )}

      {tab === 'scan' && (
        <QRScanner
          onScan={(uid, resetScanner) => {
            setUID(uid);
            handleSheet(uid, resetScanner);
          }}
        />
      )}

      {tab === 'manual' && (
        <View
          style={{ paddingHorizontal: 0, paddingBottom: 24, gap: 16, flex: 1 }}
        >
          <View>
            <Text className="text-lg font-semibold mb-1">Enter Tag UID:</Text>
            <TextInput
              className="border rounded-lg border-gray-400 text-black bg-white p-2 text-lg"
              placeholder="Enter UID"
              returnKeyType="done"
              onChangeText={val => setUID(val)}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                handleSheet(UID);
              }}
            />
          </View>

          <TouchableOpacity
            disabled={UID.trim() === '' || loading}
            className="bg-[#263f94] rounded-xl py-3 items-center"
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-white text-[16px] font-medium">Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },

  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },

  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db', // gray-300
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  activeTab: {
    borderBottomColor: '#263f94',
  },

  disabledTab: {
    opacity: 0.4,
  },

  tabText: {
    fontSize: 18, // close to text-xl
    color: '#6b7280', // gray-500
  },

  activeText: {
    color: '#263f94',
  },

  disabledText: {
    color: '#9ca3af',
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});

export default SearchSheet;
