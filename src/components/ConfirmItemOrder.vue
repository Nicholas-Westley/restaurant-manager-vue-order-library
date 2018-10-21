<template>
    <v-layout row justify-center>

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title class="headline grey" primary-title>
                    Add This Item to Order?
                </v-card-title>

                <v-card-text>

                    <h1>
                        {{ selectedRecipe.name }}
                        <span style="font-size: 60%">
                            with
                        </span>
                    </h1>
                    <div v-for="ingredient in selectedRecipe.ingredients.filter(i => i.selected)">
                        <label class="ingredient-label">
                            {{ ingredient.name }}
                        </label>
                    </div>
                </v-card-text>

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
</style>
