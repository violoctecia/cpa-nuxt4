<template>
	<div class="rounded-xl bg-muted/50 md:grid-cols-4 p-4 md:p-8">
		<h2 class="text-lg mb-4">Статистика</h2>
		<div class="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
			<div
				v-for="card in cards"
				:key="card.title"
				class="flex flex-col bg-background aspect-square rounded-md p-4"
			>
				<h3 class="text-lg font-medium mb-4">{{ card.title }}</h3>
				<p class="text-2xl font-bold mt-auto">
					{{ typeof card.value === 'number' ? card.value.toLocaleString() : card.value }}
				</p>
			</div>
		</div>
	</div>
	<div class="min-h-screen flex-1 rounded-xl md:min-h-min">
		<div class="grid auto-rows-min gap-4 md:grid-cols-3">
			<div class="bg-muted/50 aspect-video rounded-xl" />
			<div class="bg-muted/50 aspect-video rounded-xl" />
			<div class="bg-muted/50 aspect-video rounded-xl" />
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
});

const cards = [
	{
		title: 'Всего кликов',
		value: 214,
	},
	{
		title: 'Всего звонков',
		value: 1834,
	},
	{
		title: 'Всего заявок',
		value: 1834,
	},
	{
		title: 'Общий заработок',
		value: 429_132,
		currency: 'RUB',
	},
];
</script>
