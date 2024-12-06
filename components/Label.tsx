import { useState } from "react";
import { StyleSheet, View, ViewStyle, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export interface LabelProps {
  text: string;
  containerStyle: ViewStyle;
  isFilled: boolean;
}
export default function Label({ text, containerStyle, isFilled }: LabelProps) {
  const [focused, setFocused] = useState(false);
  const style = useSharedValue({
    position: "relative",
    top: 0,
    left: 0,
    textAlign: "center",
  });

  const onCheckStyle = "";
  const onBorderStyle = useAnimatedStyle(() =>
    !focused
      ? {
          position: "relative",
          backgroundColor: "transparent",
          fontSize: 15,
          paddingHorizontal: 0,
          textAlign: "center",
          left: 0,
          top: 0,
        }
      : styles.onBorder
  );

  console.log("focus", focused);
  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <Animated.Text style={onBorderStyle}>{text}</Animated.Text>
        {focused && <TextInput style={{ height: "100%" }} />}
      </View>
      <Button onPress={() => setFocused((focused) => !focused)}>Focus</Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "violet",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    height: 40,

    marginTop: 10,
  },
  default: {
    fontSize: 14,
    color: "violet",
  },
  onBorder: {
    position: "absolute",
    top: 0,
    left: "10%",
    fontSize: 10,
    color: "violet",
    transform: [{ translateY: -5 }],
    zIndex: 10,
    backgroundColor: "white",
    paddingHorizontal: 2,
  },
});
