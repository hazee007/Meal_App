import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";

import Categories from "../screens/Categories";
import CategoryMeals from "../screens/CategoryMeals";
import MealDetails from "../screens/MealDetails";
import { Colors } from "../utils";

const MealsNavigator = createStackNavigator(
  {
    Categories: Categories,
    CategoryMeals: {
      screen: CategoryMeals,
    },
    MealDetails: MealDetails,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

export default createAppContainer(MealsNavigator);
