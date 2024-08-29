<template>
    <NavBarRapport />
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <!-- Menu -->
            <SideBarClientRapport />
            <!-- / Menu -->

            <!-- Layout container -->
            <div class="layout-page">
                <!-- Navbar -->
                <NavBar />
                <!-- / Navbar -->

                <!-- Content wrapper -->
                <div class="content-wrapper">
                    <!-- Content -->


                    <div class="container-xxl flex-grow-1 container-p-y">


                        <div class="row">
                            <!-- Basic -->

                            <div class="col-md-12 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="divider">
                                            <div class="divider-text fs-3">{{ client.ship.name }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-md-8 col-lg-6 mb-3">
                                <div class="card">
                                    <h5 class="card-header">Moyenne decharger par cal</h5>
                                    <div class="card-body">
                                        <div class="table-responsive text-nowrap">
                                            <table class="table table-bordered">
                                                <tbody v-if="client.holds.length">
                                                    <tr v-for="hold in client.holds" :key="hold.id">
                                                        <td>
                                                            <i class="fab fa-angular fa-lg text-danger me-3"></i>
                                                            <strong>{{ hold.name }}</strong>
                                                        </td>
                                                        <td>{{ (hold.Total_discharged /
                                                            hold.holdHistories.length).toFixed(3) }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-4 mb-3">
                                <div class="card">
                                    <h5 class="card-header">Moyenne decharger</h5>
                                    <div class="card-body">
                                        <blockquote class="blockquote mb-0">
                                            <p v-if="totaldischarged">
                                                {{ (totaldischarged /
                                                    store.rapportDates.length).toFixed(3) }}
                                            </p>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="card ">
                            <main>
                                <div v-if="client.holds.length" class="container-box ">
                                    <div v-for="hold in client.holds" :key="hold.id" class="box">
                                        <div>
                                            <h6 class="text-center my-3 fs-6 fw-bold">{{ hold.name }} - {{ hold.type }}
                                            </h6>
                                            <!-- <div class="text-left text-dark fs-6">Moyenne: {{ (hold.holdHistoriesSum
                        / hold.moyenne).toFixed(2) }}</div> -->
                                            <div class="text-left text-dark fs-6 px-2 ">ROB: {{ (hold.Total_cargo -
                                                hold.Total_discharged).toFixed(3) }}</div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                        <!-- / Content -->
                        <div class="card card-heigth">
                            <h5 class="card-header">{{ $t('titleHold') }}</h5>
                            <div class="table-responsive text-nowrap">
                                <div v-if="client.holds.length" class="mt-3 d-flex flex-row">
                                    <div class="vertical-align">
                                        <div class="p-2 border">Holds</div>
                                        <div class="p-2 border">Total cargo</div>
                                        <div class="p-2 border">Total discharged</div>
                                        <div class="p-2 border mb-5">Remaining on board</div>
                                        <div class="positionAbsolute">{{ $t('historyDechargement') }}</div>
                                        <div v-for="rapportDate in store.rapportDates" class="p-2 border">
                                            <span>{{
                                                rapportDate.rapport }}
                                            </span>
                                        </div>
                                    </div>
                                    <CardHoldClient v-for="hold in client.holds" :key="hold.id" :hold="hold"
                                        :ship_id="hold.id" />
                                    <div class="vertical-align box-position">
                                        <div class=" border" v-for="sum in client.sumByHoldHistory">{{ sum }}</div>
                                    </div>
                                    <div class="vertical-align">
                                        <div class="p-2 border">Total</div>
                                        <div class="p-2 border">{{ totalCargos }}</div>
                                        <div class="p-2 border">{{ totaldischarged }}</div>
                                        <div class="p-2 border">{{ totalreste }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="alert alert-danger text-end" role="alert"><strong>ETC:</strong>{{ client.ship.etc }}
                        </div>
                    </div>
                    <!-- / Content -->


                    <!-- Footer -->
                    <Footer />
                    <!-- / Footer -->

                    <div class="content-backdrop fade"></div>
                </div>
                <!-- Content wrapper -->
            </div>
            <!-- / Layout page -->
        </div>

        <!-- Overlay -->
        <div class="layout-overlay layout-menu-toggle"></div>
    </div>


</template>

<script setup>
import SideBarClientRapport from '../components/SideBarClientRapport.vue'
import CardHoldClient from '../components/CardHoldClient.vue'
// import NavBarUser from "@/components/NavBarUser.vue";
import { useClientStore } from "@/stores/client";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import NavBarRapport from '@/components/NavBarRapport.vue';
import { useShipStore } from '@/stores/shipStore';



const user = useUserStore();
const client = useClientStore();
const route = useRoute();
const store = useShipStore();
store.rapportDateByShip(route.params.id);

onMounted(() => {
    client.holds(route.params.id);
    client.ship(route.params.id);
})
const totalCargos = computed(() => {
    if (client.holds.length) {
        return client.holds
            .reduce((sum, item) => sum + item.Total_cargo, 0)
            .toFixed(3);
    }

});
const totaldischarged = computed(() => {
    if (client.holds.length) {
        return client.holds
            .reduce((sum, item) => sum + item?.Total_discharged, 0)
            .toFixed(3);
    }
});
const totalreste = computed(() => {
    return (totalCargos.value - totaldischarged.value).toFixed(3);
});
const pourcentage = computed(() => {
    return totalCargos.value > 0
        ? ((totaldischarged.value * 100) / totalCargos.value).toFixed(2)
        : 0;
});


</script>
<style scoped>
.card-heigth {
    margin: 0 auto;
    display: flex;
    align-items: center;
}

main {
    background-image: url('@/assets/img/wafa-ship.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;

}

.container-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: 150px auto 10px;
}

.card-heigth {
    overflow-x: scroll;
    padding: 0 20px;
}

@media only screen and (max-width: 934px) {
    .text-nowrap {
        margin-left: 120px;
    }
}

@media only screen and (max-width: 840px) {
    .text-nowrap {
        margin-left: 350px;
    }
}

@media only screen and (max-width: 580px) {
    .text-nowrap {
        margin-left: 490px;
    }
}

@media only screen and (max-width: 440px) {
    .text-nowrap {
        margin-left: 550px;
    }

    .box-position {
        position: absolute;
        top: 70.3%;
        left: 0;
        /* transform: translate(-50%, -30px); */
        transform: translateX(100%);
        font-size: 1.1rem;
    }
}

.box {
    width: 200px;
    height: 90px;
    background-color: rgb(238, 227, 227);
    margin: 8px 3px;
    color: white;
    font-size: 24px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

@keyframes slide-up {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-10px);
    }
}

.heighborder {
    padding: 8px 0;
}

.positionAbsolute {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -30px);
    font-size: 1.1rem;
}

.box-position {
    position: absolute;
    right: 18.5%;
    top: 70.3%;
    /* transform: translate(-50%, -30px); */
    font-size: 1.1rem;
}

.box-position div {
    padding: 6.4px 3px;
}
</style>