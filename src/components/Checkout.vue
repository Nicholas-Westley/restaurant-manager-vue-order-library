<template>
    <div class="checkout">

        <!-- SUBMIT -->
        <v-btn
            large
            color="primary"
            @click="$emit('submitOrder')"
        >
            Order
        </v-btn>
        <!-- LIST CURRENT -->
        <div class="order-item" v-for="(item, index) in currentOrder">
            <h4>
                <v-label>{{index+1 }}: {{ item.name }}</v-label>
                <div
                    class="float-right"
                    @click="$emit('itemRemoved', index)"
                    style="cursor: pointer"
                    title="Remove Item"
                >
                    x
                </div>
            </h4>
            <!--<h5>{{ item.description }}</h5>-->
            <div class="ingredients-list">
                <div v-for="ingredient in item.ingredients">
                    <span :class="ingredient.selected ? 'hasIngredient' : 'notIngredient'">
                        <v-label>
                            {{ ingredient.name }}
                        </v-label>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'checkout',
    props: ['submittable', 'currentOrder', 'selectedRecipe'],
};
</script>

<style scoped>
    .checkout {
        padding: 16px;
    }
    .order-item {
        padding: 16px 0;
    }
    .ingredients-list {
        padding: 0 16px;
    }
    .hasIngredient {
        font-weight: bold;
    }
    .notIngredient {
        color: #ddd;
        text-decoration: line-through;
    }
</style>
