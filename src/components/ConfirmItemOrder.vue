<template>
    <v-layout row justify-center>

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title class="headline" primary-title>
                    Add This Item to Order?
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                    <h1 style="margin-top: 0">
                        {{ selectedRecipe.name }}
                    </h1>
                    <div v-for="ingredient in selectedRecipe.ingredients.filter(i => i.selected)">
                        <div class="ingredient-label">
                            {{ ingredient.name }}
                        </div>
                    </div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="primary darken-1"
                        flat
                        @click="dialog = false"
                    >
                        Cancel
                    </v-btn>

                    <v-btn
                        color="primary darken-1"
                        flat
                        @click="dialog = false; $emit('itemAdded')"
                    >
                        Add to Order
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        name: 'confirm-item-order',
        props: ['selectedRecipe'],
        data() {
            return {
                dialog: null,
            };
        },
        watch: {
            selectedRecipe: {
                immediate: true,
                handler(newVal, oldVal) {
                    if (!this.selectedRecipe) return;
                    this.dialog = true;
                },
            },
        },
    };
</script>

<style scoped>
    .ingredient-label {
        padding-left: 16px;
    }

</style>
