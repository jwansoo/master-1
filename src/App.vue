<script setup lang="ts">
const errorStore = useErrorStore()

onErrorCaptured((error) => {
  errorStore.setError({ error })
})

onMounted(async () => {
  useAuthStore().trackAuthChanges()
})

const { user } = storeToRefs(useAuthStore())
const AuthLayout = defineAsyncComponent(() => import('./components/Layout/main/AuthLayout.vue'))
const GuestLayout = defineAsyncComponent(() => import('./components/Layout/main/GuestLayout.vue'))

useMeta({
  title: 'Pulse',
})
</script>

<template>
  <metainfo></metainfo>
  <Component :is="user ? AuthLayout : GuestLayout">
    <AppErrorPage v-if="errorStore.activeError" />
    <router-view v-else v-slot="{ Component, route }">
      <Transition nae="fade" mode="out-in">
        <div class="w-full" :key="route.path">
          <Suspense v-if="Component" :timeout="0">
            <Component :is="Component"></Component>
            <template #fallback>
              <div
                class="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center w-full h-screen bg-background bg-opacity-90 z-50"
              >
                <iconify-icon icon="lucide:loader-circle" class="text-6xl animate-spin" />
              </div>
            </template>
          </Suspense>
        </div>
      </Transition>
    </router-view>
  </Component>
</template>

<style scoped></style>
