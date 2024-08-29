import { defineStore } from 'pinia';
import axios from 'axios';

export const useClientStore = defineStore('client', {
    state: () => ({
        user: localStorage.getItem('wafaauth') ? localStorage.getItem('wafaauth') : null,
        token: localStorage.getItem('wafatoken') ? localStorage.getItem('wafatoken') : null,
        url: import.meta.env.VITE_API_URL,
        ships: [],
        ship: [],
        bls: [],
        sumBl: [],
        blByCategory: [],
        holds: [],
        sumByHoldHistory: [],
    }),
    getters: {
        getUser: (state) => state.user ? JSON.parse(state.user) : null,
        getToken: (state) => state.token,
        getBlLength: (state) => state.sumBl.length,
        getTotalMarchandise: (state) => state.sumBl.reduce((sum, current) => {
            return sum + current.sumTotal;;
        }, 0),
        getTotalMarchandiseOf: (state) => state.sumBl.reduce((sum, current) => {
            return sum + current.sumTotalOf;
        }, 0),
    },
    actions: {

        csrf() {
            axios.get('/sanctum/csrf-cookie');
        },
        async shipByUser() {
            this.ships = [];
            await this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            axios.get(this.url + '/ships/client/?id=' + this.getUser.id)
                .then((response) => {
                    // console.log(response);
                    if (response.status == 200) {
                        this.ships = response.data.data;
                    }
                }).catch((error) => {
                    console.log(error);
                })
        },
        async ship(id) {
            this.ship = [];
            await this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            axios.get(this.url + '/client/ship/?id=' + id)
                .then((response) => {

                    if (response.status == 200) {
                        this.ship = response.data.data[0];
                    }
                }).catch((error) => {
                    console.log(error);
                })
        },
        async bls() {
            this.bls = [];
            this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            axios.get(this.url + '/client/bls/?id=' + this.getUser.id)
                .then((response) => {
                    if (response.status == 200) {
                        this.bls = response.data.data;
                    }
                }).catch((error) => {
                    console.log(error);
                })
        },
        async holds(id) {
            this.holds = [];
            this.sumByHoldHistory = [];
            this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            axios.get(this.url + '/client/holds/?id=' + id)
                .then((response) => {
                    // console.log(response);
                    if (response.status == 200) {
                        this.holds = response.data.data;
                        let totalParIndex = [];
                        this.holds.forEach(hold => {
                            hold.holdHistories.forEach((historyItem, index) => {
                                if (totalParIndex[index]) {
                                    totalParIndex[index] += historyItem.discharged;;
                                } else {
                                    totalParIndex[index] = historyItem.discharged;
                                }
                            })
                        })
                        this.sumByHoldHistory = totalParIndex;


                    }
                }).catch((error) => {
                    console.log(error);
                })
        },
        async blsByShip(id) {
            this.bls = [];
            this.sumBl = [];
            this.blByCategory = [],
                await this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            await axios.get(this.url + '/bls/client/?shipId=' + id)
                .then((response) => {
                    if (response.status === 200) {
                        this.bls = response.data.data;
                        this.bls.sort((a, b) => a.marchandise.localeCompare(b.marchandise));
                        // Réduire les éléments en groupes par catégorie
                        const groupedByCategory = this.bls.reduce((acc, item) => {
                            if (!acc[item.marchandise]) {
                                acc[item.marchandise] = [];
                            }
                            acc[item.marchandise].push(item);
                            return acc;
                        }, {});

                        // Convertir en tableau de tableaux avec catégories
                        this.blByCategory = Object.entries(groupedByCategory).map(([marchandise, items]) => ({
                            marchandise,
                            items
                        }));
                        this.sumByCategory(this.blByCategory);
                    }
                }).catch((error) => {
                    console.log(error);
                })
        },
        async sumByCategory(arrays) {
            this.sumBl = [];
            if (arrays.length) {
                arrays.forEach(element => {
                    const sumTotal = element.items.reduce((sum, current) => {
                        return current.date_reception != 'non_recu' ? sum + current.tonnage_mt : sum + 0;
                    }, 0);
                    const sumTotalOf = element.items.reduce((sum, current) => {
                        return current.date_reception == 'non_recu' ? sum + current.tonnage_mt : sum + 0;
                    }, 0);
                    this.sumBl.push({
                        sumTotal,
                        sumTotalOf,
                        category: element.marchandise,
                    });
                });
            }
        },

    },
})