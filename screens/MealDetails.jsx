import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/actions/meals";

export default function MealDetails({ navigation }) {
  const dispatch = useDispatch();
  const availableMeals = useSelector((state) => state.meals.meals);
  const mealId = navigation.getParam("mealId");
  const meal = availableMeals.find((m) => m.id === mealId);
  const isFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meals) => meals.id === mealId)
  );

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    navigation.setParams({ isFavorite: isFavorite });
  }, [isFavorite]);

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
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  const isFav = navigationData.navigation.getParam("isFavorite");
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFav ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
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
