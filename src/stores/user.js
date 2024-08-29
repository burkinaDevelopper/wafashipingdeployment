import { defineStore } from 'pinia';
import axios from 'axios';



export const useUserStore = defineStore('user', {

    state: () => ({
        logged: localStorage.getItem('wafaauth') ? true : false,
        user: localStorage.getItem('wafaauth') ? localStorage.getItem('wafaauth') : null,
        token: localStorage.getItem('wafatoken') ? localStorage.getItem('wafatoken') : null,
        errors: [],
        users: [],
        loading: false,
        url: import.meta.env.VITE_API_URL,
    }),
    getters: {
        getUser: (state) => state.user ? JSON.parse(state.user) : null,
        getToken: (state) => state.token,
        getErrors: (state) => state.errors,
        getLoading: (state) => state.loading,
    },
    actions: {
        csrf() {
            axios.get('/sanctum/csrf-cookie');
        },
        async register(form) {
            await this.csrf();
            this.errors = [];
            await axios.post(this.url + '/auth/register', form)
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem('wafaauth', JSON.stringify(response.data?.user));
                        localStorage.setItem('wafatoken', response.data?.token);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data?.token}`;
                        if (response.data?.user?.role == 'admin') {
                            // window.location.href = '/dashboard';
                            this.$router.push({ name: 'dashboard' });
                        } else {
                            // window.location.href = '/dashboard.client';
                            this.$router.push({ name: 'dashboard.client' });
                        }
                    }
                }).catch((error) => {
                    if (error.response.status === 401) {
                        for (const key in error.response.data.errors) {
                            this.errors.push(error.response.data.errors[key][0]);
                        }
                    }
                })
        },

        async createClient(form) {
            await this.csrf();
            this.errors = [];
            await axios.post(this.url + '/auth/register', form)
                .then((response) => {
                    if (response.status === 200) {
                        console.log('');
                    }
                }).catch((error) => {
                    if (error.response.status === 401) {
                        for (const key in error.response.data.errors) {
                            this.errors.push(error.response.data.errors[key][0]);
                        }
                    }
                })
        },
        async updateClient(form) {
            await this.csrf();
            this.errors = [];
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            this.loading = true;
            await axios.post(this.url + '/user/update', form)
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
        async updateAdmin(form) {
            await this.csrf();
            this.errors = [];
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            this.loading = true;
            await axios.post(this.url + '/user/update', form)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        localStorage.clear();
                        this.token = null;
                        localStorage.setItem('wafaauth', JSON.stringify(response.data.user));
                        localStorage.setItem('wafatoken', response.data.token);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                    }
                }).catch((error) => {
                    if (error.response.status === 401) {
                        for (const key in error.response.data.errors) {
                            this.errors.push(error.response.data.errors[key][0]);
                        }
                    }
                })
        },
        async login(form) {
            await this.csrf();
            this.errors = [];
            await axios.post(this.url + '/auth/login', form)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        localStorage.setItem('wafaauth', JSON.stringify(response.data?.user));
                        localStorage.setItem('wafatoken', response.data.token);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data?.token}`;
                        if (response.data?.user?.role == 'admin') {
                            window.location.href = '/dashboard';
                            // this.$router.replace({ name: 'dashboard' });
                        } else {
                            // this.$router.push({ name: 'dashboard-client', params: { id: this.getShipItem.id } }).then(() => {
                            //     window.location.reload();
                            // })
                            // this.$router.replace({ name: 'dashboard.client' });
                            window.location.href = '/dashboard-client';
                        }
                    }
                }).catch((error) => {
                    if (error.response?.status === 401) {
                        for (const key in error.response?.data?.errors) {
                            this.errors.push(error.response.data.errors[key][0]);
                        }
                    }
                    if (error.response?.status === 403) {
                        this.errors.push(error.response?.data?.errors);
                    }
                })
        },
        async logout() {
            this.errors = [];
            await this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            await axios.post(this.url + '/logout/' + this.getUser.id)
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.clear();
                        this.token = null;
                        this.$reset();
                        window.location.href = '/';
                    }
                }).catch((error) => {
                    this.errors.push('utilisateur non reconnue');
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: this.errors[0],
                        allowOutsideClick: false,
                    });

                })
        },
        async destroy(id) {
            await this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            this.loading = true;
            axios.delete(this.url + '/user/destroy/' + id)
                .then((response) => {
                    if (response.status == 200) {
                        this.loading = false;
                        // localStorage.clear();
                        // this.$reset();
                        // window.location.href = '/';
                    }
                }).catch((error) => {
                    window.location.href = '/dashboard';
                })
        },
        async destroyAdmin(id) {
            await this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            this.loading = true;
            axios.delete(this.url + '/user/destroy/' + id)
                .then((response) => {
                    if (response.status == 200) {
                        localStorage.clear();
                        this.$reset();
                        window.location.href = '/';
                    }
                }).catch((error) => {
                    window.location.href = '/dashboard';
                })
        },
        async getUsersAll() {
            this.users = [];
            await this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            this.loading = true;
            await axios.get(this.url + '/users').then((response) => {
                if (response.status == 200) {
                    this.loading = false;
                    this.users = response.data.users;
                }
            }).catch((error) => {
                console.log(error);
            })
        },
        async activeUser(id, form) {
            this.errors = [];
            this.loading = true;
            await this.csrf();
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.getToken}`;
            await axios.post(this.url + '/active-user/' + id, form)
                .then((response) => {
                    if (response.status === 200) {
                        this.loading = false;
                    }
                }).catch((error) => {
                    this.errors.push(error.response.data);
                })
        },
    },
})