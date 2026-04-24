// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import StackNavigator from '@/navigation/StackNavigation';

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <StackNavigator />
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
