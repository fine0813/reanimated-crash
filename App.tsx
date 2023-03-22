import React, {useRef} from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native';
import Animated, {useAnimatedRef} from 'react-native-reanimated';

const HEADER_HEIGHT = 250;

const DATA = [0, 1, 2, 3, 4];
const identity = (v: unknown): string => v + '';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Example: React.FC = () => {
  const ref = useAnimatedRef<any>();
  const renderItem: ListRenderItem<number> = React.useCallback(({index}) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
    );
  }, []);

  return (
    <AnimatedFlatList
      ref={ref}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={identity}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
});

export default Example;
