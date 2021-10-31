import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { CATEGORIES } from "../data/dummy-data";

export default function CategoryMeals(props) {
  const { navigation } = props;
  const cuid = navigation.getParam("categoryId");
  const category = CATEGORIES.find((c) => c.id === cuid);
  return (
    <View style={styles.screen}>
      <Text>The Categories Meal Screen</Text>
      <Text>{category.title}</Text>
      <Button
        title="GO to Meals Details"
        onPress={() => navigation.navigate("MealDetails")}
      />
    </View>
  );
}

CategoryMeals.navigationOptions = (navigationData) => {
  const cuid = navigationData.navigation.getParam("categoryId");
  const category = CATEGORIES.find((c) => c.id === cuid);
  return {
    headerTitle: category.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
