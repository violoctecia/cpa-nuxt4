<template>
	<div>
		<DefaultHeader />
		<slot />
	</div>
</template>

<script setup lang="ts">
import DefaultHeader from '~/components/global/DefaultHeader.vue';
</script>
