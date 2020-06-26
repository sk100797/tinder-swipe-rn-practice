import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const {
  Value,
  event,
  cond,
  eq,
  set,
  drag,
  add,
  interpolate,
  concat,
} = Animated;

const Tracking = () => {
  const dragX = new Value(0);
  const dragY = new Value(0);
  const offsetX = new Value(0);
  const offsetY = new Value(0);
  const gestureState = new Value(-1);

  const _onGestureEvent = event([
    {
      nativeEvent: {
        translationX: dragX,
        translationY: dragY,
        state: gestureState,
      },
    },
  ]);

  const transX = cond(
    eq(gestureState, State.ACTIVE),
    set(dragX, add(offsetX, dragX), set(offsetX, new Value(0)))
  );

  const transY = cond(
    eq(gestureState, State.ACTIVE),
    set(dragY, add(offsetY, dragY)),
    set(offsetY, new Value(0))
  );

  const rotate = interpolate(transX, {
    inputRange: [-1 * width, 0, width],
    outputRange: [-60, 0, 60],
  });

  const likeOpacity = interpolate(transX, {
    inputRange: [0, width],
    outputRange: [0, 1],
  });

  const dislikeOpacity = interpolate(transX, {
    inputRange: [-1 * width, 0],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={_onGestureEvent}
        onHandlerStateChange={_onGestureEvent}
      >
        <Animated.View
          style={[
            styles.box,
            {
              transform: [
                { translateX: transX },
                { rotate: concat(rotate, "deg") },
                { translateY: transY },
              ],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.like,
              { opacity: likeOpacity, transform: [{ rotate: -45 }] },
            ]}
          >
            <Text style={styles.likeText}>LIKE</Text>
          </Animated.View>
          <Animated.Text
            style={[
              styles.dislike,
              { opacity: dislikeOpacity, transform: [{ rotate: 45 }] },
            ]}
          >
            DISLIKE
          </Animated.Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  box: {
    height: height * 0.6,
    width: width * 0.8,
    backgroundColor: "plum",
    alignItems: "center",
  },
  like: {
    alignSelf: "flex-start",
    position: "absolute",
    left: 20,
    top: 30,
    borderWidth: 4,
    borderColor: "green",
    padding: 20,
    borderRadius: 10,
  },
  likeText: {
    fontWeight: "bold",
    color: "green",
    fontSize: 28,
  },
  dislike: {
    position: "absolute",
    right: 20,
    top: 50,
    fontSize: 28,
    borderWidth: 4,
    borderColor: "red",
    padding: 20,
    fontWeight: "bold",
    borderRadius: 10,
    color: "red",
    textAlign: "center",
  },
});

export default Tracking;
