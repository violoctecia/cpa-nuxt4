<template>
	<div class="rounded-xl bg-muted/50 md:grid-cols-4 p-4 md:p-8">
		<h2 class="text-lg mb-8">Статистика</h2>
		<div class="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
			<div
				v-for="card in cards"
				:key="card.title"
				class="flex flex-col bg-background rounded-md p-4"
			>
				<h3 class="font-medium mb-4">{{ card.title }}</h3>
				<p class="text-2xl font-bold mt-auto">
					{{ card.value }}
				</p>
			</div>
		</div>
	</div>

	<ConversionChart
		:title="'Конверсия'"
		:subtitle="'За последнюю неделю'"
		:clicks="[120, 340, 210, 724, 380, 90, 60]"
		:calls="[142, 45, 30, 60, 55, 10, 5]"
		:leads="[5, 12, 8, 92, 15, 3, 1]"
	/>

	<div class="min-h-screen flex-1 rounded-xl md:min-h-min">
		<div class="grid auto-rows-min gap-4 md:grid-cols-3">
			<div class="bg-muted/50 aspect-video rounded-xl" />
			<div class="bg-muted/50 aspect-video rounded-xl" />
			<div class="bg-muted/50 aspect-video rounded-xl" />
		</div>
	</div>
</template>

<script setup lang="ts">
import ConversionChart from '~/components/dashboard/widgets/ConversionChart.vue';

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

const mock = {
	data: [
		{
			timestamp: 1774299600,
			clicks_count: 0,
			leads_count: 0,
			calls_count: 0,
			leads: {
				approved_count: 0,
				declined_count: 0,
				hold_count: 0,
			},
			clicks_conversion: 0,
			leads_conversion: 0,
		},
		{
			timestamp: 1774386000,
			clicks_count: 0,
			leads_count: 0,
			calls_count: 0,
			leads: {
				approved_count: 0,
				declined_count: 0,
				hold_count: 0,
			},
			clicks_conversion: 0,
			leads_conversion: 0,
		},
		{
			timestamp: 1774472400,
			clicks_count: 0,
			leads_count: 0,
			calls_count: 0,
			leads: {
				approved_count: 0,
				declined_count: 0,
				hold_count: 0,
			},
			clicks_conversion: 0,
			leads_conversion: 0,
		},
		{
			timestamp: 1774558800,
			clicks_count: 0,
			leads_count: 0,
			calls_count: 0,
			leads: {
				approved_count: 0,
				declined_count: 0,
				hold_count: 0,
			},
			clicks_conversion: 0,
			leads_conversion: 0,
		},
		{
			timestamp: 1774645200,
			clicks_count: 0,
			leads_count: 0,
			calls_count: 0,
			leads: {
				approved_count: 0,
				declined_count: 0,
				hold_count: 0,
			},
			clicks_conversion: 0,
			leads_conversion: 0,
		},
		{
			timestamp: 1774731600,
			clicks_count: 0,
			leads_count: 0,
			calls_count: 0,
			leads: {
				approved_count: 0,
				declined_count: 0,
				hold_count: 0,
			},
			clicks_conversion: 0,
			leads_conversion: 0,
		},
		{
			timestamp: 1774818000,
			clicks_count: 0,
			leads_count: 0,
			calls_count: 0,
			leads: {
				approved_count: 0,
				declined_count: 0,
				hold_count: 0,
			},
			clicks_conversion: 0,
			leads_conversion: 0,
		},
	],
	summary: {
		clicks_count: 0,
		leads_count: 0,
		calls_count: 0,
		leads: {
			approved_count: 0,
			declined_count: 0,
			hold_count: 0,
		},
		clicks_conversion: 0,
		leads_conversion: 0,
	},
};
</script>
