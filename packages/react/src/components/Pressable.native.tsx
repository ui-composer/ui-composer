import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  GestureResponderEvent,
  Pressable as ReactNativePressable,
  View,
} from 'react-native';

import { Haptics } from '../native-modules/Haptics';
import { compose } from '../theme';
import debounce from '../utils/debounce';

type HapticFeedbackType = 'light' | 'normal' | 'heavy' | 'none';

const AnimatedPressable = Animated.createAnimatedComponent(ReactNativePressable);

export type ThemablePressableProps = React.ComponentPropsWithoutRef<typeof ThemablePressable>;
export const ThemablePressable = compose(AnimatedPressable);
ThemablePressable.displayName = 'ThemablePressable';

export type PressableProps = {
  /**
   * Haptic feedback to trigger when being pressed.
   * @default none
   */
  feedback?: HapticFeedbackType;
  /**
   * React Native is historically trash at debouncing touch events. This can cause a lot of
   * unwanted behavior such as double navigations where we push a screen onto the stack 2 times.
   * Debouncing the event 500 miliseconds, but taking the leading event prevents this effect and
   * the accidental "double-tap".
   */
  disableDebounce?: boolean;
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
} & ThemablePressableProps;

export const Pressable = memo(
  forwardRef(function Pressable(
    {
      children,
      feedback = 'none',
      onPress,
      onPressIn,
      onPressOut,
      noScaleOnPress,
      // Interactable
      disableDebounce,
      ...props
    }: PressableProps,
    forwardedRef: ForwardedRef<View>
  ) {
    const [pressed, setPressed] = useState(false);
    const pressScale = useRef(new Animated.Value(1));

    const pressIn = useCallback(() => {
      Animated.spring(pressScale.current, {
        toValue: 1 - 0.02,
        useNativeDriver: true,
      }).start();
    }, []);

    const pressOut = useCallback(() => {
      Animated.spring(pressScale.current, {
        friction: 3,
        tension: 5,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }, []);

    const onPressHandler = useMemo(
      () => (event: GestureResponderEvent) => {
        if (feedback === 'light') {
          Haptics.lightImpact();
        } else if (feedback === 'normal') {
          Haptics.normalImpact();
        } else if (feedback === 'heavy') {
          Haptics.heavyImpact();
        }

        onPress?.(event);
      },
      [feedback, onPress]
    );

    const debouncedOnPressHandler = useMemo(() => debounce(onPressHandler), [onPressHandler]);

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        if (!disableDebounce) {
          debouncedOnPressHandler(event);
        } else {
          onPressHandler(event);
        }
      },
      [disableDebounce, debouncedOnPressHandler, onPressHandler]
    );

    const handlePressIn = useCallback(
      (event: GestureResponderEvent) => {
        setPressed(true);
        pressIn();
        onPressIn?.(event);
      },
      [pressIn, onPressIn]
    );

    const handlePressOut = useCallback(
      (event: GestureResponderEvent) => {
        setPressed(false);
        pressOut();
        onPressOut?.(event);
      },
      [pressOut, onPressOut]
    );

    const scaleOnPressStyle = useMemo(
      () => ({ transform: [{ scale: pressScale.current }] }),
      [pressScale]
    );

    return (
      <ThemablePressable
        {...props}
        accessibilityRole="button"
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        pressed={pressed}
        style={!noScaleOnPress ? scaleOnPressStyle : undefined}
        ref={forwardedRef}
      >
        {children}
      </ThemablePressable>
    );
  })
);

Pressable.displayName = 'Pressable';
