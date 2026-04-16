import { defineStore } from "pinia";
import { storage } from "~/lib/storage";

const KOINS_KEY_PREFIX = "koins_";

export const useKoinsStore = defineStore("koins", () => {
  const authStore = useAuthStore();
  const totalKoins = ref(0);

  const storageKey = computed(() =>
    authStore.user ? `${KOINS_KEY_PREFIX}${authStore.user.email}` : null
  );

  const load = () => {
    if (!storageKey.value) return;
    const stored = storage.get(storageKey.value);
    totalKoins.value = stored ? parseInt(stored, 10) : 0;
  };

  const addKoins = (amount: number) => {
    if (!storageKey.value) return;
    totalKoins.value += amount;
    storage.set(storageKey.value, String(totalKoins.value));
  };

  watch(() => authStore.user, load, { immediate: true });

  return { totalKoins, addKoins, load };
});
