import { defineStore } from 'pinia';
import axios from 'axios';


export const useShipStore = defineStore('ship', {

    state: () => ({
        token: localStorage.getItem('wafatoken') ? localStorage.getItem('wafatoken') : null,
        errors: [],
        holds: [],
        bls: [],
        sumBl: [],
        blByCategory: [],
        loading: false,
        rapportDates: [],
        ships: [],
        url: import.meta.env.VITE_API_URL,
    }),
    getters: {
        getToken: (state) => state.token,
        getErrors: (state) => state.errors,
        getLoading: (state) => state.loading,
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
        async registerForm(id, form) {
            // await this.csrf();
            this.errors = [];
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            await axios.post(this.url + '/ship/store/' + id, form)
                .then((response) => {
                    if (response.status === 200) {
                        this.loading = false;
                    }
                }).catch((error) => {
                    if (error.response.status === 401) {
                        for (const key in error.response.data.errors) {
                            this.errors.push(error.response.data.errors[key][0]);
                        }
                    }
                })
        },
        async getShips() {
            this.loading = true;
            // await this.csrf();
            this.ships = [];
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            await axios.get(this.url + '/ships')
                .then((response) => {

                    if (response.status === 200) {
                        this.loading = false;
                        this.ships = response.data.ships;
                    }
                }).catch((error) => {
                    if (error.response.status === 401) {
                        for (const key in error.response.data.errors) {
                            this.errors.push(error.response.data.errors[key][0]);
                        }
                    }
                })
        },
        async updateShip(user_id, form) {
            // await this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            await axios.put(this.url + '/ship/update/' + user_id, form)
                .then((response) => {
                    if (response.status === 200) {
                        this.loading = false;
                    }
                }).catch((error) => {
                    console.log(error);
                    if (error.response.status === 401) {
                        for (const key in error.response.data.errors) {
                            this.errors.push(error.response.data.errors[key][0]);
                        }
                    }
                    if (error.response.status === 404) {
                        this.errors.push('probleme de connexion');
                    }
                })
        },
        async destroy(id) {
            // await this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            this.loading = true;
            axios.delete(this.url + '/ship/delete/' + id)
                .then((response) => {
                    if (response.status == 200) {
                        this.loading = false;
                    }
                }).catch((error) => {
                    window.location.href = '/dashboard';
                })
        },
        async showShip(id) {
            this.ships = [];
            this.holds = [];
            this.bls = [];
            // await this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            axios.get(this.url + '/ship/show/' + id)
                .then((response) => {
                    if (response.status == 200) {
                        this.loading = false;
                        this.ships = response.data.data[0];
                        this.holds = response.data.data[0].holds;
                        this.bls = response.data.data[0].bls;
                    }
                }).catch((error) => {
                    window.location.href = '/dashboard';
                })
        },
        async updateHold(id, form) {
            // await this.csrf();
            this.errors = [];
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            await axios.put(this.url + '/hold/update/' + id, form)
                .then((response) => {
                    if (response.status === 200) {
                        this.loading = false;
                    }
                }).catch((error) => {
                    if (error.response.status === 401) {
                        for (const key in error.response.data.errors) {
                            this.errors.push(error.response.data.errors[key][0]);
                        }
                    }
                    if (error.response.status === 404) {
                        this.errors.push('probleme de connexion');
                    }
                })
        },
        async destroyHold(id) {
            // await this.csrf();
            this.errors = [];
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            this.loading = true;
            axios.delete(this.url + '/hold/delete/' + id)
                .then((response) => {
                    if (response.status == 200) {
                        this.loading = false;
                    }
                }).catch((error) => {
                    this.errors.push(error.response.data);
                })
        },
        async storeHold(id, form) {
            // await this.csrf();
            this.errors = [];
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            this.loading = true;
            axios.post(this.url + '/hold/store/' + id, form)
                .then((response) => {
                    if (response.status == 200) {
                        this.loading = false;
                    }
                }).catch((error) => {
                    if (error.response.status === 401) {
                        for (const key in error.response.data.errors) {
                            this.errors.push(error.response.data.errors[key][0]);
                        }
                    }
                })
        },
        async storeHoldHistory(id, form) {
            // await this.csrf();
            this.errors = [];
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            this.loading = true;
            await axios.post(this.url + '/hold-history/store/' + id, form)
                .then((response) => {
                    if (response.status == 200) {
                        this.loading = false;
                    }
                }).catch((error) => {
                    if (error.response.status === 401) {
                        for (const key in error.response.data.errors) {
                            this.errors.push(error.response.data.errors[key][0]);
                        }
                    }
                })
        },
        async destroyHoldHistory(id) {
            // await this.csrf();
            this.errors = [];
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            this.loading = true;
            axios.delete(this.url + '/hold-history/delete/' + id)
                .then((response) => {
                    if (response.status == 200) {
                        this.loading = false;
                    }
                }).catch((error) => {
                    this.errors.push(error.response.data);
                })
        },
        async storebl(id, form) {
            // await this.csrf();
            this.errors = [];
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            this.loading = true;
            axios.post(this.url + '/bl/store/' + id, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
                .then((response) => {
                    if (response.status == 200) {
                        this.loading = false;
                    }
                }).catch((error) => {
                    console.log(error);
                    if (error.response.status === 401) {
                        for (const key in error.response.data.errors) {
                            this.errors.push(error.response.data.errors[key][0]);
                        }
                    }
                })
        },
        async blAll(search) {
            this.bls = [];
            this.sumBl = [];
            this.blByCategory = [],
                // await this.csrf();
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            axios.get(this.url + '/bls/?search=' + search)
                .then((response) => {
                    if (response.status == 200) {
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
                    // window.location.href = '/dashboard';
                    console.log(error);
                })
        },
        async sumByCategory(arrays) {
            this.sumBl = [];
            if (arrays.length) {
                arrays.forEach(element => {
                    const sumTotal = element.items.reduce((sum, current) => {
                        // return sum + current.tonnage_mt;
                        // if (current.date_reception != 'LOI') {
                        // }
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
                    // console.log(this.sumBl);

                });
            }
        },
        async updatebl(id, form) {
            // await this.csrf();
            this.errors = [];
            this.bls = [];
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            this.loading = true;
            axios.put(this.url + '/bl/update/' + id, form)
                .then((response) => {
                    if (response.status == 200) {
                        this.loading = false;
                    }
                }).catch((error) => {

                    if (error.response.status === 401) {
                        for (const key in error.response.data.errors) {
                            this.errors.push(error.response.data.errors[key][0]);

                        }
                    }
                })
        },
        async destroyBl(id) {
            // await this.csrf();
            this.errors = [];
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            this.loading = true;
            axios.delete(this.url + '/bl/delete/' + id)
                .then((response) => {
                    if (response.status == 200) {
                        this.loading = false;
                    }
                }).catch((error) => {
                    this.errors.push(error.response.data);
                })
        },
        async storeRapportDate(id, rapport) {
            // await this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            axios.post(this.url + '/rapport/' + id, rapport)
                .then((response) => {
                    if (response.status == 200) {
                        this.loading = false;
                    }
                }).catch((error) => {
                    console.log(error);

                    this.errors.push(error.response.data);
                })
        },
        async rapportDateByShip(id) {
            await this.csrf();
            this.rapportDates = [];
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            axios.get(this.url + '/rapports/' + id)
                .then((response) => {
                    // console.log(response);
                    if (response.status == 200) {
                        this.rapportDates = response.data.data;
                    }
                }).catch((error) => {
                    console.log(error);
                })
        },
        async destroyRapportDate(id) {
            await this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            axios.delete(this.url + '/rapport/delete/' + id)
                .then((response) => {
                    if (response.status == 200) {
                        console.log(response);
                    }
                }).catch((error) => {
                    console.log(error);
                })
        },
    },
})