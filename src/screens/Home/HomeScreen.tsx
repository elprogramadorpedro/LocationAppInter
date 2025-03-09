import React, { useEffect } from 'react';

import {globalStyles} from '../../theme/theme';
import {PrimaryButton} from '../../components/shared/PrimaryButton';
import {View} from 'react-native';
import  { DrawerActions, type NavigationProp, useNavigation} from '@react-navigation/native';
import { type RootStackParams } from '../../routes/StackNavigator';
//import { Pressable, Text } from 'react-native-gesture-handler';
import { HamburguerMenu } from '../../components/shared/HamburguerMenu';

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();


 { /*
   useEffect(() => {
  navigation.setOptions({
    headerLeft: () => (
      <Pressable onPress={()=> navigation.dispatch(DrawerActions.toggleDrawer)} >
        <Text>Menu</Text>
      </Pressable>
    )
  })
 }, [])
  */}

 






  return (
    <View style={globalStyles.container}>
      <HamburguerMenu/>
      <PrimaryButton
        onPress={() => navigation.navigate('Products')}
        label="Productos"
      />

   <PrimaryButton
        onPress={() => navigation.navigate('Settings')}
        label="Settings"
      />
    </View>
  );
};
