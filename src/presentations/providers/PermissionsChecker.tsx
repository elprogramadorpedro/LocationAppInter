import React, {Children, PropsWithChildren, useEffect} from 'react';
import {checkLocationPermission} from '../../actions/permissions/location';
import {usePermissionStore} from '../store/permission/usePerrmissionStore';
import {AppState} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigations/StackNavigator';
export const PermissionsChecker = ({children}: PropsWithChildren) => {
  const {locationStatus, checkLocationPermission} = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    if (locationStatus === 'granted') {
      navigation.reset({
        //index: 0,
        routes: [{name: 'MapsScreen'}],
      });
    } else if (locationStatus !== 'undetermined') {
      navigation.navigate('PermissionsScreen');
    }
  }, [locationStatus]);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const subscripcion = AppState.addEventListener('change', nextAppState => {
      checkLocationPermission();
      if (nextAppState === 'active') {
        checkLocationPermission();
      }
    });

    return () => {
      subscripcion.remove();
    };
  }, []);

  return <>{children}</>;
};
