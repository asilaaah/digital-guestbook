<script setup lang="ts">
import { RouterView } from 'vue-router';
import type { NConfigProvider, GlobalThemeOverrides } from 'naive-ui';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#383838',
    primaryColorHover : '#383838',
    primaryColorPressed : '#383838',
    primaryColorSuppl: '#383838',
  },
}
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider placement="bottom">
      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>
