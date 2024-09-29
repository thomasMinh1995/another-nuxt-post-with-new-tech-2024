
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue);

    nuxtApp.vueApp.component('DataTable', DataTable);
    nuxtApp.vueApp.component('Column', Column);
    nuxtApp.vueApp.component('Paginator', Paginator);
    nuxtApp.vueApp.component('Button', Button);
});