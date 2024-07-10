<script setup>
useSeoMeta({
  title: 'testing site',
  description: 'This is my amazing site, let me tell you all about it.',
})
const themeOverrides = {
  common: {
    primaryColor: "#009DFF",
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: "black",
      },
    },
  },
};
</script>
<template>
  <div>
    <NConfigProvider :theme-overrides="themeOverrides">
      <NMessageProvider placement="top">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </NMessageProvider>
    </NConfigProvider>
  </div>
</template>