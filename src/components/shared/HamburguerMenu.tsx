import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Pressable, Text } from 'react-native';
import { IonIcon } from './IonIcon';

export const HamburguerMenu = () => {

    const navigation = useNavigation();

    useEffect(()=>{
         navigation.setOptions({
            headerLeft:()=>(
                <Pressable style={{marginLeft:8}} onPress={() => navigation.dispatch (DrawerActions.toggleDrawer)}>
                      <IonIcon name='menu-outline' size={50} />
                </Pressable>
            )
         })   
    },[])



  return(<></>);
}
