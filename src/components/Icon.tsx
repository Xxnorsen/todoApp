import React from 'react';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { ICONS } from '../constants/index';

interface IconProps {
  iconKey: keyof typeof ICONS;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ iconKey, size, color }) => {
  const iconConfig = ICONS[iconKey];
  const finalSize = size || iconConfig.size;
  const finalColor = color || iconConfig.color;

  switch (iconConfig.type) {
    case 'MaterialIcons':
      return <MaterialIcons name={iconConfig.name as any} size={finalSize} color={finalColor} />;
    case 'FontAwesome5':
      return <FontAwesome5 name={iconConfig.name as any} size={finalSize} color={finalColor} />;
    case 'Ionicons':
      return <Ionicons name={iconConfig.name as any} size={finalSize} color={finalColor} />;
    default:
      return null;
  }
};

export default Icon;
