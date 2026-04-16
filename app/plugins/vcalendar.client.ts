import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

export default defineNuxtPlugin({
  name: 'vcalendar',
  enforce: 'pre',
  setup(nuxtApp) {
    nuxtApp.vueApp.use(VCalendar, {});
  },
});
