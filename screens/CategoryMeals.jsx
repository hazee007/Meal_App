import React from "react";

import MealDetails from "../components/MealDetails";
import MealList from "../components/MealList";
import { CATEGORIES, MEALS } from "../data/dummy-data";

export default function CategoryMeals(props) {
  const { navigation } = props;
  const cuid = navigation.getParam("categoryId");
  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(cuid) >= 0
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
