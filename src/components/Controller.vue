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
        <confirm-item-dialog
            v-if="selectedRecipe"
            class="order-column add-item-to-order"
            :selectedRecipe="selectedRecipe"
            @itemAdded="itemAdded"
        />

        <!-- ORDER CONFIRMED DIALOG -->
        <order-confirmed-dialog
            :confirmedOrder="confirmedOrder"
        />

    </div>
</template>

<script>
    import RecipeList from './RecipeList';
    import ConfirmItemDialog from './ConfirmItemDialog';
    import Checkout from './Checkout';
    import OrderConfirmedDialog from "./OrderConfirmedDialog";
    export default {
        props: {
            assetsUrl: String,
            restaurantId: Number,
        },
        components: { OrderConfirmedDialog, RecipeList, ConfirmItemDialog, Checkout },
        data() {
            return {
                selectedRecipe: null,
                recipes: [],
                currentOrder: [],
                confirmedOrder: null,
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
                this.resetSelectedIngredients(this.recipes.find(r => r.id === this.selectedRecipe.id));
                this.recipes = JSON.parse(JSON.stringify(this.recipes));
                this.selectedRecipe = null;
            },
            itemRemoved(index) {
                this.currentOrder.splice(index, 1);
            },
            submitOrder() {
                this.axios.post('orders', { items: this.currentOrder })
                    .then(response => {
                        this.confirmedOrder = response.data.order;
                    })
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
            this.axios.get(`restaurants/${this.restaurantId}/recipes`)
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
