import React, {PropsWithChildren} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';

const GradientRect = ({
  children,
  style,
  start,
  end,
  colors,
  useAngle,
  angle,
  locations,
}: PropsWithChildren<{
  style: ViewStyle;
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  colors: string[];
  useAngle?: boolean;
  angle?: number;
  locations?: number[];
}>) => {
  const startX = start?.x || 0;
  const startY = start?.y || 0;
  const endX = end?.x || 0;
  const endY = end?.y || 1;

  if (locations && locations.length !== colors.length) {
    console.error(
      'GradientRect: locations length must be equal to colors length',
    );
    return null;
  }

  return (
    <View style={[style, {overflow: 'hidden'}]}>
      <View style={styles.linearContainer}>
        <Svg width="100%" height="100%">
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
          <Defs>
            <LinearGradient
              id="gradient"
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              gradientTransform={useAngle ? `rotate(-${angle})` : undefined}>
              {colors.map((color, index) => (
                <Stop
                  offset={
                    index === 0
                      ? 0
                      : (locations ? locations[index] : 1 / index).toFixed(2)
                  }
                  stopColor={color}
                />
              ))}
            </LinearGradient>
          </Defs>
        </Svg>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  linearContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
});

export default GradientRect;
