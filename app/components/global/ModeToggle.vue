<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-vue-next';

const colorMode = useColorMode();

const themes = [
	{
		value: 'light',
		label: 'Светлая',
	},
	{
		value: 'dark',
		label: 'Темная',
	},
	{
		value: 'system',
		label: 'Системная',
	},
];

const toggleTheme = () => {
	colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
};
</script>

<template>
	<Button
		variant="ghost"
		@click="toggleTheme"
	>
		<SunIcon v-if="colorMode.value === 'light'" />
		<MoonIcon v-if="colorMode.value === 'dark'" />
		<span class="sr-only">Поменять тему</span>
	</Button>
</template>
