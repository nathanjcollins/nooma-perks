<script setup lang="ts">
const search = ref("");

const { data: perks } = await useAsyncData("perks", async () => {
  const { data } = await useFetch("/api/perks");

  return data.value;
});

const filteredPerks = computed(() => {
  const filtered = !search.value
    ? perks.value
    : perks.value?.filter((perk) =>
        perk.name.toLowerCase().includes(search.value.toLowerCase()),
      );

  return filtered;
});

const claimPerk = async (perk: any) => {
  perk.loading = true;
  perk.claimed = false;

  await useFetch(`/api/redeem?id=${perk.id}`);

  perk.loading = false;
  perk.claimed = true;
};
</script>

<template>
  <UContainer class="max-w-5xl m-auto prose">
    <UContainer class="flex flex-col gap-5">
      <UInput
        v-model="search"
        class="w-60"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="sm"
        color="white"
        :trailing="false"
        placeholder="Search..."
      />
      <UCard v-for="perk in filteredPerks">
        <template #header>
          {{ perk.name }}
        </template>

        {{ perk.description }}

        <template #footer>
          <div v-if="!perk.claimed" class="flex space justify-between">
            <div>
              Limit: {{ perk.limit ?? "∞" }}
              <span v-if="perk.limit"
                >(Remaining: {{ perk.limit - perk.redeemed }})</span
              >
            </div>
            <div v-if="!perk.limit || perk.limit > perk.redeemed">
              <UButton
                :disabled="perk.loading || perk.claimed"
                @click="claimPerk(perk)"
                >{{ perk.claimed ? "Claimed" : "Claim" }}</UButton
              >
            </div>
          </div>
          <span v-else class="mr-5 text-green-400">{{
            perk.claimed
              ? "Success! Nathan will be in touch soon with more details."
              : ""
          }}</span>
        </template>
      </UCard>
    </UContainer>
  </UContainer>
</template>
