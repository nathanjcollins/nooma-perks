<script setup lang="ts">
const supabase = useSupabaseClient();
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
};
</script>

<template>
  <div>
    <div class="flex justify-between mx-20 my-5">
      <h1 class="text-xl font-bold">Nooma Perks</h1>
      <UButton @click="signOut">Sign Out</UButton>
    </div>
    <slot />
  </div>
</template>
