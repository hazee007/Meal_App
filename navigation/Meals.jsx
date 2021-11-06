import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createAppContainer } from "react-navigation";
import { Platform, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Categories from "../screens/Categories";
import CategoryMeals from "../screens/CategoryMeals";
import MealDetails from "../screens/MealDetails";
import Favorites from "../screens/Favorites";
import { Colors } from "../utils";
import Filters from "../screens/Filters";

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  }, //For IOS
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const MealsNavigator = createStackNavigator(
  {
    Categories: Categories,
    CategoryMeals: {
      screen: CategoryMeals,
    },
    MealDetails: MealDetails,
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions,
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: Favorites,
    MealDetails: MealDetails,
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions,
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primary,
      tabBarLabel: Platform.OS === "android" && (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
      ),
    },
  },
  Favorite: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: "Favorites!!",
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accent,
      tabBarLabel: Platform.OS === "android" && (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
      ),
    },
  },
};

const IOSTabNavigator = createBottomTabNavigator(tabScreenConfig, {
  tabBarOptions: {
    labelStyle: {
      fontFamily: "open-sans",
    },
    activeTintColor: Colors.accent,
  },
});

const AndroidTabNavigator = createMaterialBottomTabNavigator(tabScreenConfig, {
  activeColor: "white",
  shifting: true,
  // barStyle:{
  //   backgroundColor: Colors.primary
  // }   //This works when shifting is false
});

const MealsBottomTabNavigator =
  Platform.OS === "android" ? AndroidTabNavigator : IOSTabNavigator;

const FiltersNavigator = createStackNavigator(
  {
    Filters: Filters,
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsBottomTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals",
      },
    },
    Filters: FiltersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accent,
      labelStyle: {
        fontFamily: "open-sans-bold",
        fontFamily: "open-sans-bold",
      },
    },
  }
);

export default createAppContainer(MainNavigator);
