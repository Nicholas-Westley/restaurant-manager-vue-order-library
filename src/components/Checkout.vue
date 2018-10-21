<template>
    <div class="checkout">

        <!-- ORDER EMPTY -->
        <div
            v-if="!currentOrder.length"
            class="order-empty">
            <v-btn disabled large color="primary">Order</v-btn>
            <div style="margin-left: 12px;">
                Order Currently Empty
            </div>
        </div>

        <div v-if="currentOrder.length">
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
                    {{index+1 }}: {{ item.name }}
                    <div
                        class="remove-item"
                        @click="$emit('itemRemoved', index)"
                        title="Remove Item"
                    >
                        x
                    </div>
                </h4>
                <!--<h5>{{ item.description }}</h5>-->
                <div class="ingredients-list">
                    <div v-for="ingredient in item.ingredients">
                        <span v-if="ingredient.selected">
                            {{ ingredient.name }}
                        </span>
                    </div>
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
    .remove-item {
        cursor: pointer;
        float: right;
        color: red;
    }
</style>
