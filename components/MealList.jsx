import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import MealDetails from "./MealDetails";

export default function ({ displayedMeals, navigation }) {
  const renderMealItem = (itemData) => {
    return (
      <MealDetails
        itemData={itemData}
        onSelect={() =>
          navigation.navigate("MealDetails", {
            mealId: itemData.item.id,
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
