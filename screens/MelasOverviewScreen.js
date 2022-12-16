import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import MealItem from "../components/MealsList/MealItem";
import { CATEGORIES, MEALS } from "../data/dummy-data";

// we can use this hook to get "route" object
import { useRoute } from "@react-navigation/native";
import MealsList from "../components/MealsList/MealsList";

// we can get this props becouse this function is registered as navigator. to get params we set when navigatin we use "route" prop
function MealsOverviewScreen({ navigation, route }) {
    const catId = route.params.categoryId;

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find(
            (category) => category.id === catId
        ).title;

        navigation.setOptions({
            title: categoryTitle,
        });
    }, [catId, navigation]);

    return <MealsList items={displayedMeals} />;
}

export default MealsOverviewScreen;
