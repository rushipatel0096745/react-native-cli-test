import React, { useRef, useState, useEffect } from 'react';
import { Animated, Dimensions, TouchableOpacity, View } from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TabParamList } from '@/types/navigation';
import HomeStackNavigator from './HomeStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import SearchSheet from '@/screens/Search/SearchScreen';
import AuthNavigator from '@/navigation/AuthNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator<TabParamList>();
const SCREEN_HEIGHT = Dimensions.get('window').height;

type TabType = 'nfc' | 'scan' | 'manual';

// Create a wrapper component to listen to navigation params
const SearchTabListener = ({
  openSheet,
}: {
  openSheet: (config?: any) => void;
}) => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    // Listen for params changes using route.params
    const params = route.params as any;

    if (params?.sheetOpen || params?.sheetAllowed || params?.sheetMode) {
      openSheet({
        initialTab: params.sheetOpen as TabType,
        allowedTabs: params.sheetAllowed as TabType[],
        sheetMode: params.sheetMode as 'ADD_ASSET' | 'EDIT_ASSET' | 'DEFAULT',
      });

      // Clear params after opening
      navigation.setParams({
        sheetOpen: undefined,
        sheetAllowed: undefined,
        sheetMode: undefined,
      } as any);
    }
  }, [route.params]);

  return null;
};

const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  const TAB_BAR_HEIGHT = 60 + insets.bottom;
  const SHEET_HEIGHT = SCREEN_HEIGHT * 0.6;

  const slideAnim = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [sheetConfig, setSheetConfig] = useState({
    initialTab: 'manual' as TabType,
    allowedTabs: ['nfc', 'scan', 'manual'] as TabType[],
    sheetMode: 'DEFAULT' as 'ADD_ASSET' | 'EDIT_ASSET' | 'DEFAULT',
  });

  const openSheet = (config?: {
    initialTab?: TabType;
    allowedTabs?: TabType[];
    sheetMode?: 'ADD_ASSET' | 'EDIT_ASSET' | 'DEFAULT';
  }) => {
    if (isOpen) {
      closeSheet();
      return;
    }

    const resolvedMode = config?.sheetMode ?? 'DEFAULT';

    if (config) {
      setSheetConfig({
        initialTab: config.initialTab ?? 'manual',
        allowedTabs: config.allowedTabs ?? ['nfc', 'scan', 'manual'],
        sheetMode: resolvedMode,
      });
    } else {
      // Reset to default when opened from tab bar
      setSheetConfig({
        initialTab: 'manual',
        allowedTabs: ['nfc', 'scan', 'manual'],
        sheetMode: 'DEFAULT',
      });
    }

    setMounted(true);
    setIsOpen(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      damping: 20,
      stiffness: 150,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(slideAnim, {
      toValue: SHEET_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(false);
      setMounted(false);
    });
  };

  return (
    <Tab.Navigator
      // Add navigation listeners at the navigator level
      screenListeners={({ navigation }) => ({
        state: e => {
          if (!navigation) return;

          // Listen for params on any screen
          const state = navigation.getState();
          const currentRoute = state.routes[state.index];

          if (currentRoute.params) {
            const params = currentRoute.params as any;

            if (
              params?.sheetOpen ||
              params?.sheetAllowed ||
              params?.sheetMode
            ) {
              openSheet({
                initialTab: params.sheetOpen as TabType,
                allowedTabs: params.sheetAllowed as TabType[],
                sheetMode: params.sheetMode as
                  | 'ADD_ASSET'
                  | 'EDIT_ASSET'
                  | 'DEFAULT',
              });

              // Clear params
              navigation.setParams({
                sheetOpen: undefined,
                sheetAllowed: undefined,
                sheetMode: undefined,
              } as any);
            }
          }
        },
      })}
      tabBar={props => (
        <View pointerEvents="box-none">
          {isOpen && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={closeSheet}
              style={{
                position: 'absolute',
                bottom: TAB_BAR_HEIGHT,
                left: 0,
                right: 0,
                height: SCREEN_HEIGHT,
                backgroundColor: 'rgba(0,0,0,0.4)',
              }}
            />
          )}

          {/* sliding sheet */}
          {mounted && (
            <View
              style={{
                position: 'absolute',
                bottom: TAB_BAR_HEIGHT,
                left: 0,
                right: 0,
                height: SCREEN_HEIGHT,
              }}
              pointerEvents="box-none"
            >
              <Animated.View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: -100,
                  height: SHEET_HEIGHT + 100,
                  paddingBottom: 100,
                  transform: [{ translateY: slideAnim }],
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: -4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                  elevation: 10,
                  paddingVertical: 12,
                }}
              >
                <SearchSheet
                  onClose={closeSheet}
                  initialTab={sheetConfig.initialTab}
                  allowedTabs={sheetConfig.allowedTabs}
                  sheetMode={sheetConfig.sheetMode}
                />
              </Animated.View>
            </View>
          )}

          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
          paddingTop: 10,
          paddingBottom: 8,
          height: TAB_BAR_HEIGHT,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />

      <Tab.Screen
        name="Search"
        component={() => null}
        options={{
          tabBarIcon: () => <Icon name="search" size={24} color="#263f94" />,
          tabBarButton: props => (
            <TouchableOpacity
              {...(props as any)}
              onPress={() => openSheet()}
              style={props.style}
            />
          ),
        }}
      />

      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      <Tab.Screen name="Auth" component={AuthNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
