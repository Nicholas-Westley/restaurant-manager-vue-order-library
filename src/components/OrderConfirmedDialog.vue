<template>
    <v-layout row justify-center>

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title class="headline" primary-title>
                    Order Confirmed
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                    <div style="font-size: 200%">
                        Ticket number {{ ticketNumber }}
                    </div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="primary darken-1"
                        flat
                        @click="dialog = false;"
                    >
                        ok
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        name: 'order-confirmed-dialog',
        props: ['confirmedOrder'],
        data() {
            return {
                dialog: null,
                ticketNumber: 0,
            };
        },
        watch: {
            confirmedOrder: {
                immediate: true,
                handler(newVal, oldVal) {
                    if (!this.confirmedOrder) return;
                    this.dialog = true;
                    this.ticketNumber = this.confirmedOrder.id % 100;
                    setTimeout(()=> {
                        this.dialog = false;
                    }, 5000);
                },
            },
        },
    };
</script>

<style scoped>

</style>
