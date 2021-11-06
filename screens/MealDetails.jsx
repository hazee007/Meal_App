import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import { MEALS } from "../data/dummy-data";
import DefaultText from "../components/DefaultText";

export default function MealDetails({ navigation }) {
  const mealId = navigation.getParam("mealId");
  const meal = MEALS.find((m) => m.id === mealId);

  return (
    <ScrollView>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{meal.duration}m</DefaultText>
        <DefaultText>{meal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{meal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}> Ingredients</Text>
      {meal.ingredients.map((ingredient, index) => (
        <Text style={styles.listItem} key={index}>
          {ingredient}
        </Text>
      ))}
      <Text style={styles.title}> Steps</Text>
      {meal.steps.map((step, index) => (
        <Text style={styles.listItem} key={index}>
          {step}
        </Text>
      ))}
    </ScrollView>
  );
}

MealDetails.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam("mealId");
  const meal = MEALS.find((m) => m.id === mealId);
  return {
    headerTitle: meal.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Favorite" iconName="ios-star" onPress={() => {}} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    fontFamily: "open-sans",
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    padding: 10,
    borderWidth: 1,
  },
});
