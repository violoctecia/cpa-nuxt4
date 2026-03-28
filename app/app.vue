<template>
	<NuxtLoadingIndicator color="var(--primary)" />
	<div class="min-h-svh">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
	<Toaster
		rich-colors
		position="top-right"
	/>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner';
import 'vue-sonner/style.css';

useHead({
	meta: [
		{
			name: 'robots',
			content: 'noindex, nofollow',
		},
	],
});
</script>
