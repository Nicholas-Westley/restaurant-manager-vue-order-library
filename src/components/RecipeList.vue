<template>
    <v-layout>
        <v-flex v-for="recipe in recipes" :key="recipe.id" xs6 style="padding: 12px; max-width: 500px">
            <v-card >
                <v-img
                    :src="'/assets/images/' + recipe.image"
                    aspect-ratio="3"
                ></v-img>

                <v-card-title primary-title>
                    <div>
                        <h1 class="headline mb-0">
                            <v-label>
                                {{ recipe.name }}
                            </v-label>
                        </h1>
                        <!--<div>{{ recipe.description }} </div>-->
                    </div>
                </v-card-title>
                <v-card-text style="height: 260px">
                    <div style="display: flex">
                        <div style="min-width: 200px">
                            <h4 color="primary">
                                Components
                            </h4>
                            <div v-for="ingredient in recipe.ingredients.filter(i => !i.optional)">
                                <v-checkbox
                                    :label="ingredient.name"
                                    v-model="ingredient.selected"
                                    disabled
                                ></v-checkbox>
                            </div>
                        </div>
                        <div>
                            <h4 color="primary">
                                Configurable Components (free)
                            </h4>
                            <div v-for="ingredient in recipe.ingredients.filter(i => i.optional)">

                                <v-checkbox
                                    :label="ingredient.name"
                                    v-model="ingredient.selected"
                                ></v-checkbox>

                            </div>
                        </div>
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
                        @click="$emit('recipeSelected', recipe)"
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
        props: ['recipes'],
    };
</script>

<style >
    .v-input--selection-controls .v-input__slot,
    .v-input__slot, .v-input__slot {
        margin: 0 !important;
        padding: 0 !important;
        margin-top: 0 !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }
    .v-messages { display: none; }
    .v-label {
        font-size: 150%;
        padding-top: 4px;
    }


</style>
