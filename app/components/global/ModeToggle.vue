<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-vue-next';

const userStore = useUserStore();
</script>

<template>
	<Button
		variant="ghost"
		@click="userStore.toggleTheme"
	>
		<client-only>
			<SunIcon v-if="userStore.theme === 'light'" />
			<MoonIcon v-if="userStore.theme === 'dark'" />
		</client-only>

		<span class="sr-only">Поменять тему</span>
	</Button>
</template>
