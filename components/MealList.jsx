import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import MealDetails from "./MealDetails";

export default function ({ displayedMeals, navigation }) {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  const renderMealItem = (itemData) => {
    const isFavorite = favoriteMeals.some(
      (meals) => meals.id === itemData.item.id
    );
    return (
      <MealDetails
        itemData={itemData}
        onSelect={() =>
          navigation.navigate("MealDetails", {
            mealId: itemData.item.id,
            mealTitle: itemData.item.title,
            isFavorite: isFavorite,
          })
        }
      />
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        renderItem={renderMealItem}
        styles={{ width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});
