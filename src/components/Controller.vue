<template>
    <div class="order-pane" data-app>
        <div style="display: flex">
            <!-- RECIPE LIST -->
            <recipe-list
                v-if="recipes && recipes.length"
                :recipes="items"
                class="order-column recipe-list"
                @recipeSelected="recipeSelected"
                :assetsUrl="assetsUrl"
            />

            <!-- ORDER IN PROCESS -->
            <checkout
                v-if="currentOrder.length"
                class="order-column order-being-created"
                :currentOrder="currentOrder"
                :submittable="selectedRecipe !== null"
                :selectedRecipe="selectedRecipe"
                @itemRemoved="itemRemoved"
                @submitOrder="submitOrder"
            />
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
                items: [],
            };
        },
        watch: {
            recipes() {
                this.getItems();
            },
        },
        methods: {
            recipeSelected(recipe) {
                this.selectedRecipe = { ...recipe };
            },
            itemAdded() {
                if (this.selectedRecipe) this.currentOrder.push({ ...this.selectedRecipe });
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
            getItems() {
                this.items = JSON.parse(JSON.stringify(this.recipes));
                this.items.forEach(item => {
                    item.ingredients.forEach(ingredient => {
                        ingredient.selected = ingredient.selected_by_default;
                    });
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
    .recipe-list {
        flex: 3;
    }
    .order-being-created {
        flex: 1;
    }


</style>
