import { useContext, useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

import { MEALS } from "../data/dummy-data";
// import { FavoritesContext } from "../store/context/favorites-context";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";

function MealDetailScree({ route, navigation }) {
    // const favoriteMealCtx = useContext(FavoritesContext);

    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
    const dispatch = useDispatch();

    const mealId = route.params.mealId;

    // const mealIsFavorite = favoriteMealCtx.ids.includes(mealId);
    const mealIsFavorite = favoriteMealIds.includes(mealId);

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    function changeFavoritesStatusHandler() {
        if (mealIsFavorite) {
            // favoriteMealCtx.removeFavorite(mealId);
            dispatch(removeFavorite({ id: mealId }));
        } else {
            // favoriteMealCtx.addFavorite(mealId);
            dispatch(addFavorite({ id: mealId }));
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <IconButton
                        name={mealIsFavorite ? "star" : "star-outline"}
                        color="white"
                        onPress={changeFavoritesStatusHandler}
                    />
                );
            },
        });
    }, [navigation, changeFavoritesStatusHandler]);

    return (
        <ScrollView style={styles.rootContainer}>
            <Image
                source={{ uri: selectedMeal.imageUrl }}
                style={styles.image}
            />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingreients</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    );
}

export default MealDetailScree;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32,
    },
    image: {
        width: "100%",
        height: 350,
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        margin: 8,
        textAlign: "center",
        color: "white",
    },
    detailText: {
        color: "white",
    },
    listOuterContainer: {
        alignItems: "center",
    },
    listContainer: {
        width: "80%",
    },
});
