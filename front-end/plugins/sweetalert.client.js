import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('swal', Swal); 
});