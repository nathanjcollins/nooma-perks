<script setup lang="ts">
definePageMeta({ layout: false });
const supabase = useSupabaseClient();
const email = ref("");
const config = useRuntimeConfig();

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: `${config.public.appUrl}/confirm`,
    },
  });
  if (error) console.log(error);
};
</script>
<template>
  <UContainer
    class="flex flex-col gap-2 max-w-5xl m-auto items-center min-h-screen justify-center"
  >
    <h1 class="font-bold text-xl">Happy Christmas, Nooma!</h1>
    <UInput v-model="email" type="email" placeholder="Type your email..." />
    <UButton @click="signInWithOtp">Sign In with E-Mail</UButton>
  </UContainer>
</template>
