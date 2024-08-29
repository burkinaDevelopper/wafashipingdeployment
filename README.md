# wafafront

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build


  <div
                v-if="isModalOpen"
                class="modal modal-top fade"
                id="modalTop"
                tabindex="-1"
              >
                <div class="modal-dialog">
                  <form @submit.prevent="onSubmit" class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="modalTopTitle">
                        Mofifier navire
                      </h5>
                      <div
                        class="bs-toast toast fade show bg-success"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        v-if="successMessage"
                      >
                        <div class="toast-header">
                          <i class="bx bx-bell me-2"></i>
                          <div class="me-auto fw-semibold">navire modifier</div>
                          <small>il ya 2s</small>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                          ></button>
                        </div>
                      </div>
                      ------------------------
                      <div
                        class="bs-toast toast fade show bg-danger"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        v-if="errorMessage"
                      >
                        <div class="toast-header">
                          <i class="bx bx-bell me-2"></i>
                          <div class="me-auto fw-semibold">
                            Remplire tout les champs
                          </div>
                          <small>il ya 1s</small>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                          ></button>
                        </div>
                      </div>

                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        @click="refresDataShip()"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col mb-3">
                          <label for="nameSlideTop" class="form-label"
                            >Nom</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            v-model="form.name"
                          />
                          <input type="hidden" :value="form.user_id" />
                        </div>
                      </div>
                      <div class="row g-2">
                        <div class="col mb-0">
                          <label for="emailSlideTop" class="form-label"
                            >ETA</label
                          >
                          <input
                            type="date"
                            class="form-control"
                            v-model="form.eta"
                            @change="etaDate($event.target.value)"
                          />
                        </div>
                        <div class="col mb-3">
                          <label for="dobSlideTop" class="form-label"
                            >ETB</label
                          >
                          <input
                            type="date"
                            class="form-control"
                            v-model="form.etb"
                            :min="form.etb"
                          />
                        </div>
                      </div>
                      <div class="col mb-3">
                        <label for="nameSlideTop" class="form-label">ETC</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="form.etc"
                          :min="form.etc"
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        data-bs-dismiss="modal"
                        @click="refresDataShip()"
                      >
                        Close
                      </button>
                      <button type="submit" class="btn btn-primary">
                        modifier
                      </button>
                    </div>
                  </form>
                </div>
              </div>

```



 <div class="col">
    <div class="card h-100">
      <strong class="ms-2 d-flex justify-content-between"
        ><span>{{ props.hold.name }}- {{ props.hold.type }}</span>
        <span class="float-right">
          <i
            :data-name="props.hold.name"
            :data-category="props.hold.type"
            :data-tcargo="props.hold.Total_cargo"
            :data-tdischarged="props.hold.Total_discharged"
            :data-id="props.hold.id"
            @click="handleClick($event)"
            class="bx bx-edit-alt me-1 mx-3 cursor-pointer"
          ></i
          ><i
            @click="deleteHold($event)"
            :data-holdname="props.hold.name"
            :data-holdid="props.hold.id"
            class="bx bx-trash me-1 mx-3 text-danger cursor-pointer"
          ></i
        ></span>
      </strong>

      <div class="card-body">
        <h5 class="card-title">{{ props.hold.Total_cargo }}</h5>
        <h5 class="card-title">
          {{ props.hold.Total_discharged }}
        </h5>
        <h5 class="card-title">
          {{ props.hold.Total_cargo - props.hold.Total_discharged }}
        </h5>
        <p
          v-if="props.hold.holdHistories.length"
          v-for="holdHistory in props.hold.holdHistories"
          :key="holdHistory.id"
          class="card-text mt-2 mb-0"
        >
          {{ holdHistory.discharged }}&nbsp; - &nbsp; &nbsp; &nbsp;<em
            ><i class="bi bi-clock"></i> {{ holdHistory.history }}</em
          >
        </p>
      </div>
    </div>
  </div>


  .filter((bl) => {
    return (
      bl.n.toString().includes(search.toString()) &&
      bl.tonnage_mt.includes(search.toString()) &&
      bl.marchandise
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      bl.receptionnaire
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  })
  [{n:10,tonnage_mt:300,marchandise:"mais"},{n:50,tonnage_mt:200,marchandise:"riz"},{n:10,tonnage_mt:600,marchandise:"ble"}]

 item.n.toString().includes(query) ||
      item.tonnage_mt.toString().includes(query) ||
      item.marchandise.toLowerCase().includes(query) ||
      item.receptionnaire.toLowerCase().includes(query) ||