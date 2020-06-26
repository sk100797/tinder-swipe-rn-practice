import React from "react";
import { Dimensions, View, StyleSheet, StatusBar } from "react-native";

import Tracking from "./examples/Tracking";

const App = () => {
  return (
    <View style={styles.container}>
      <Tracking />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default App;
