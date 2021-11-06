import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  FlatList,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CATEGORIES } from "../data/dummy-data";
import HeaderButton from "../components/HeaderButton";

export default function Categories(props) {
  const { navigation } = props;
  const renderGridItem = (itemData) => {
    let Touchable = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version >= 21) {
      Touchable = TouchableNativeFeedback;
    }

    return (
      <View style={styles.gridItem}>
        <Touchable
          onPress={() =>
            navigation.navigate("CategoryMeals", {
              categoryId: itemData.item.id,
            })
          }
        >
          <View
            style={{
              ...styles.container,
              backgroundColor: itemData.item.color,
            }}
          >
            <Text style={styles.title}>{itemData.item.title}</Text>
          </View>
        </Touchable>
      </View>
    );
  };
  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
}

Categories.navigationOptions = (navData) => {
  return {
    headerTitle: "Meal Category",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    elevation: 3,
  },
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
  },
});
