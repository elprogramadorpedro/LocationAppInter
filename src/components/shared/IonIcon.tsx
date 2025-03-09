import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

//creamoos nuestra propiedades propiedades en una interfaz

interface Props {
  name: string;
  size?: number;
  color?: string;
}

//y luego desestructuramos las propiedades en el argumento de la funcion

export const IonIcon = ({name, size = 20, color = 'black'}: Props) => {
  return (
    <Icon
      //ahora el name va a serr igual al name que le pasamos en las propiedades.

      name={name}
      size={size}
      color={color}
    />
  );
};
