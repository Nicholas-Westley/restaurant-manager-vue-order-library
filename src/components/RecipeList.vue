<template>
    <v-layout row wrap style="padding: 16px;">
        <v-flex
            v-for="recipe in recipes"
            :key="recipe.id"
            xs6
            wrap
            style="padding: 16px; max-width: 500px">
            <v-card >
                <v-img
                    :src="assetsUrl + 'assets/images/' + recipe.image"
                    aspect-ratio="3"
                ></v-img>
                <h1>
                    {{ recipe.name }}
                </h1>
                <v-card-text class="components-container">
                    <div class="components-list">
                        <h4 color="primary">
                            Components
                        </h4>
                        <template v-for="ingredient in recipe.ingredients.filter(i => !i.optional)">
                            <v-checkbox
                                :label="ingredient.name"
                                v-model="ingredient.selected"
                                disabled
                            ></v-checkbox>
                        </template>
                    </div>
                    <div class="components-list">
                        <h4 color="primary" class="configurable-components">
                            Extra Components (free)
                        </h4>
                        <template v-for="ingredient in recipe.ingredients.filter(i => i.optional)">

                            <v-checkbox
                                :label="ingredient.name"
                                v-model="ingredient.selected"
                            ></v-checkbox>

                        </template>
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-btn
                        @click="$emit('recipeSelected', recipe)"
                        large
                        color="primary"
                        >
                        Add To Order
                    </v-btn>
                    <v-btn
                        @click="$emit('recipeReset', recipe)"
                        large
                        flat
                        color="primary"
                    >
                        Reset Item
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        props: ['recipes', 'assetsUrl'],
    };
</script>

<style lang="scss">
    .v-input--selection-controls, .v-input__slot {
        margin: 0 !important;
    }
    .v-messages { display: none !important; }
    h1 {
        padding: 8px 12px 0 12px;
    }
    .components-container {
        display: flex;
        height: 170px;
        padding-top: 8px !important;
        .components-list {
            flex: 1;
        }
    }

    .ingredient-checkbox {
        color: red !important;
    }
    .configurable-components {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
