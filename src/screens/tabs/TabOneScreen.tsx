import React from 'react'
import { View, Text } from 'react-native'
import { HamburguerMenu } from '../../components/shared/HamburguerMenu'
import { IonIcon } from '../../components/shared/IonIcon'




export const TabOneScreen = () => {
   return (
      <View>
         <HamburguerMenu/>
               <Text>TabOneScreen</Text>
              <IonIcon name='rocket-outline' size={50} 
              />
           </View>
     )
}
