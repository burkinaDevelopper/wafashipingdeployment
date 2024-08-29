<template>
    <NavBarUser />
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <!-- Menu -->
            <SideBarClient />
            <!-- / Menu -->

            <!-- Layout container -->
            <div class="layout-page">
                <!-- Navbar -->
                <NavBar />
                <!-- / Navbar -->

                <!-- Content wrapper -->
                <div class="content-wrapper">
                    <!-- Content -->

                    <!-- <div class="container-xxl flex-grow-1 container-p-y">
                        <h4 class="fw-bold py-3 mb-4">
                            <span class="text-muted fw-light">Formulaire /</span>
                        </h4>
                        <FormShip />
                    </div> -->
                    <!-- / Content -->
                    <!-- <div class="card">
                        <div class="input-group input-group-merge">
                            <span class="input-group-text" id="basic-addon-search31"><i class="bx bx-search"></i></span>
                            <input v-model="searchQuery" type="text" class="form-control" placeholder="Search..." />
                        </div>
                        <h5 class="card-header">Liste des navires</h5>
                        <div class="table-responsive text-nowrap">


                        </div>

                    </div> -->

                    <!-- Footer -->
                    <!-- <Footer /> -->
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
import NavBarUser from '../components/NavBarUser.vue'
import SideBarClient from '@/components/SideBarClient.vue';
import Footer from '../components/Footer.vue'

</script>
<style></style>