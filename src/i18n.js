import { createI18n } from 'vue-i18n'

const messages = {
    en: {
        titleHold: 'Cumulative Unloading',
        historyDechargement: 'Daily unloadings',
        language: "language",
        logout: 'logout',
        titleHeader: "Home",
        blTitle: "List of BLs",
        tonnage: "Tonnage Mt",
        marchandise: "Cargo",
        reception: "Receivers",
        date_reception: "Date of Receipt",
        total_bl_recu: "Total Bls Received",
        total_bl_non_recu: "Total BLs Missing",
        total_cargo_title: "Total Cargo",
    },
    fr: {
        titleHold: 'Cumule Déchargement',
        historyDechargement: 'Déchargements journaliers',
        language: "langue",
        logout: "deconnexion",
        titleHeader: "Accueil",
        blTitle: " Liste des BLs",
        tonnage: "Tonnage Tm",
        marchandise: "Marchandise",
        reception: "Réceptionnaire",
        date_reception: "Date de réception",
        total_bl_recu: "Total BLs recus",
        total_bl_non_recu: "Total non BLs recus",
        total_cargo_title: "Total par marchandise",
    }
}
const i18n = createI18n({
    locale: 'fr',
    legacy: false,
    fallbackLocale: 'fr',
    messages,
})

export default i18n;