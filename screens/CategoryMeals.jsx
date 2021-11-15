import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";

import MealList from "../components/MealList";
import { CATEGORIES } from "../data/dummy-data";

export default function CategoryMeals(props) {
  const availableMeal = useSelector((state) => state.meals.filteredMeals);
  const { navigation } = props;
  const cuid = navigation.getParam("categoryId");
  const displayedMeals = availableMeal.filter(
    (meal) => meal.categoryIds.indexOf(cuid) >= 0
  );

  if (displayedMeals.length === 0)
    return (
      <View style={styles.empty}>
        <DefaultText>No meal found, maybe check your filters.</DefaultText>
      </View>
    );

  return <MealList displayedMeals={displayedMeals} navigation={navigation} />;
}

CategoryMeals.navigationOptions = (navigationData) => {
  const cuid = navigationData.navigation.getParam("categoryId");
  const category = CATEGORIES.find((c) => c.id === cuid);
  return {
    headerTitle: category.title,
  };
};

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
