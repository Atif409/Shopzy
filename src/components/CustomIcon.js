import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const CustomIcon = ({ name, size = 24, color = 'grey', style }) => {
  return (
    <MaterialIcons
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};
export default CustomIcon;
