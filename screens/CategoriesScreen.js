import { FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import { CATEGORIES } from "../data/dummy-data";

// navigation props is special screen wich we get from stack navigation

function CategoriesScreen({ navigation }) {
    // we moved this function inside to get navigation props
    function renderCategoryItem(itemData) {
        function pressHandler() {
            // navigation.navigate("MealsOverview"); we can use navigation without title like this
            navigation.navigate("MealsOverview", {
                categoryId: itemData.item.id,
            });
        }

        return (
            <CategoryGridTile
                title={itemData.item.title}
                color={itemData.item.color}
                onPress={pressHandler}
            />
        );
    }

    return (
        <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={2}
        />
    );
}

export default CategoriesScreen;
