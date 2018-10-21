<template>
    <div class="order-pane" data-app>
        <div style="display: flex; height: 100%;">
            <!-- RECIPE LIST -->
            <recipe-list
                v-if="recipes && recipes.length"
                :recipes="recipes"
                class="order-column recipe-list"
                @recipeSelected="recipeSelected"
                :assetsUrl="assetsUrl"
            />

            <!-- ORDER IN PROCESS -->
            <div class="order-column order-being-created">
                <checkout
                    :currentOrder="currentOrder"
                    :submittable="selectedRecipe !== null"
                    :selectedRecipe="selectedRecipe"
                    @itemRemoved="itemRemoved"
                    @submitOrder="submitOrder"
                />
            </div>
        </div>

        <!-- CONFIRM ITEM TO ADD TO ORDER -->
        <confirm-item-order
            v-if="selectedRecipe"
            class="order-column add-item-to-order"
            :selectedRecipe="selectedRecipe"
            @itemAdded="itemAdded"
        />

    </div>
</template>

<script>
    import RecipeList from './RecipeList';
    import ConfirmItemOrder from './ConfirmItemOrder';
    import Checkout from './Checkout';
    export default {
        props: ['assetsUrl'],
        components: { RecipeList, ConfirmItemOrder, Checkout },
        data() {
            return {
                selectedRecipe: null,
                recipes: [],
                currentOrder: [],
            };
        },
        watch: {
            recipes() {
                this.recipes.forEach(recipe => {
                    this.resetSelectedIngredients(recipe);
                });
            },
        },
        methods: {
            recipeSelected(recipe) {
                this.selectedRecipe = { ...recipe };
            },
            itemAdded() {
                if (!this.selectedRecipe) return;
                const item = JSON.parse(JSON.stringify(this.selectedRecipe));
                this.currentOrder.push(item);
                this.resetSelectedIngredients(this.selectedRecipe);
                this.selectedRecipe = null;
            },
            itemRemoved(index) {
                this.currentOrder.splice(index, 1);
            },
            submitOrder() {
                this.axios.post('orders', { items: this.currentOrder })
                    .then(response => console.log(response))
                    .catch(error => console.log(error.response));
                this.currentOrder = [];
            },
            resetSelectedIngredients(recipe) {
                recipe.ingredients.forEach(ingredient => {
                    ingredient.selected = ingredient.selected_by_default;
                });
            },
        },
        mounted() {
            if (!this.axios) {
                return console.error('ADD AXIOS TO VUE PROTOTYPE');
            }
            // TODO GET/SET CURRENT RESTAURANT FROM LIST
            // const restaurant = 7;
            this.axios.get('restaurants/7/recipes')
                .then(response => {
                    this.recipes = response.data;
                });
        },
    };
</script>

<style scoped>
    .order-pane {
        height: 100%;
    }
    .recipe-list {
        flex: 3;
        background-color: #333;
        overflow-y: auto;
        height: 100vh;
    }
    .order-being-created {
        flex: 1;
        background-color: white;
    }
</style>
