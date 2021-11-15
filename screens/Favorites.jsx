import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import { Text, View, StyleSheet } from "react-native";

import MealList from "../components/MealList";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";

export default function Favorites({ navigation }) {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);
  if (favoriteMeals.length === 0)
    return (
      <View style={styles.empty}>
        <DefaultText>No favorite meals found. Start adding some...</DefaultText>
      </View>
    );
  return <MealList displayedMeals={favoriteMeals} navigation={navigation} />;
}

Favorites.navigationOptions = (navData) => {
  return {
    headerTitle: "Your favorite",
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
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
