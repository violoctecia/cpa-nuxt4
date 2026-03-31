<template>
	<div class="rounded-xl bg-muted/50 p-4 md:p-8">
		<div class="grid grid-cols-1 xl:grid-cols-6 gap-4">
			<div class="flex flex-col gap-2 mb-8 xl:col-span-2">
				<h2 class="text-lg">{{ title }}</h2>
				<p
					v-if="subtitle"
					class="text-sm text-muted-foreground"
				>
					{{ subtitle }}
				</p>
			</div>
			<div
				class="hidden xl:flex gap-4 mb-3 text-xs font-medium text-muted-foreground items-center justify-center w-full col-span-4"
			>
				<div class="flex items-center gap-2 bg-background rounded-full p-2 h-fit">
					<span class="w-2.5 h-2.5 rounded-sm bg-[#016147]" />
					Собранные клики
				</div>
				<div class="flex items-center gap-2 bg-background rounded-full p-2 h-fit">
					<span class="w-2.5 h-2.5 rounded-sm bg-blue-500" />
					Собранные звонки
				</div>
				<div class="flex items-center gap-2 bg-background rounded-full p-2 h-fit">
					<span class="w-2.5 h-2.5 rounded-sm bg-amber-400" />
					Проданные лиды
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 xl:grid-cols-6 gap-4">
			<div class="bg-background rounded-md p-4 xl:col-span-2 flex flex-col gap-3 justify-between">
				<div class="grid gauto-rows-min xl:grid-cols-3 gap-3">
					<div
						class="bg-muted/50 rounded-lg p-3"
						v-for="(item, index) in cards.small"
						:key="index"
					>
						<p class="text-xs text-muted-foreground mb-1">{{ item.title }}</p>
						<p class="text-xl font-medium">{{ item.value.toLocaleString('ru-RU') }}</p>
					</div>
				</div>

				<div class="rounded-md bg-muted/50 p-4 flex flex-col gap-4">
					<div class="">
						<p class="text-xs md:text-sm text-muted-foreground mb-1">{{ cards.large.title }}</p>
						<p class="text-xl md:text-2xl font-medium">{{ cards.large.value.toLocaleString('ru-RU') }}</p>
					</div>
					<div class="flex items-start gap-4">
						<p class="text-xs md:text-sm leading-relaxed text-muted-foreground">
							Конверсия отражает процентное соотношение успешных лидов (одобренные CPA заявки и подтверждённые
							звонки) к общему количеству трафика (собранные клики и поступившие звонки).
						</p>
					</div>
				</div>
			</div>

			<div
				class="xl:col-span-4 relative bg-background rounded-md overflow-hidden p-4 xl:aspect-2/1 w-full flex items-center justify-center"
			>
				<transition name="fade">
					<Line
						v-if="isMounted"
						:data="data"
						:options="options"
						class="relative z-10"
					/>
				</transition>

				<Skeleton
					v-if="!isMounted"
					class="w-full h-full absolute inset-0 aspect-2/1"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';
import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	type ChartOptions,
} from 'chart.js';
import { Line } from 'vue-chartjs';

const isMounted = ref(false);

onMounted(() => {
	isMounted.value = true;
});

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const userStore = useUserStore();
const isDark = computed(() => userStore.theme === 'dark');

const props = defineProps<{
	title: string;
	subtitle?: string;
	clicks: number[];
	calls: number[];
	leads: number[];
}>();

const totalClicks = computed(() => props.clicks.reduce((a, b) => a + b, 0));
const totalCalls = computed(() => props.calls.reduce((a, b) => a + b, 0));
const totalLeads = computed(() => props.leads.reduce((a, b) => a + b, 0));

const cards = computed(() => ({
	small: [
		{
			title: 'Клики',
			value: totalClicks.value,
		},
		{
			title: 'Звонки',
			value: totalCalls.value,
		},
		{
			title: 'Лиды',
			value: totalLeads.value,
		},
	],
	large: {
		title: 'Конверсия',
		value: ((totalLeads.value / (totalClicks.value + totalCalls.value)) * 100).toFixed(2) + '%',
	},
}));

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const data = computed(() => ({
	labels,
	datasets: [
		{
			label: 'Клики',
			data: props.clicks,
			borderColor: '#016147',
			backgroundColor: isDark.value ? 'rgba(26,171,116,0.08)' : 'rgba(1,97,71,0.08)',
			fill: true,
			tension: 0.4,
			pointBackgroundColor: '#016147',
			pointRadius: 1,
			pointHoverRadius: 3,
			borderWidth: 2,
		},
		{
			label: 'Звонки',
			data: props.calls,
			borderColor: '#3b82f6',
			backgroundColor: 'rgba(59,130,246,0.08)',
			fill: true,
			tension: 0.4,
			pointBackgroundColor: '#3b82f6',
			pointRadius: 1,
			pointHoverRadius: 3,
			borderWidth: 2,
		},
		{
			label: 'Лиды',
			data: props.leads,
			borderColor: '#f59e0b',
			backgroundColor: 'rgba(245,158,11,0.08)',
			fill: true,
			tension: 0.4,
			pointBackgroundColor: '#f59e0b',
			pointRadius: 1,
			pointHoverRadius: 3,
			borderWidth: 2,
		},
	],
}));

let delayed = false;

const options = computed<ChartOptions<'line'>>(() => ({
	responsive: true,
	interaction: {
		intersect: false,
		mode: 'index' as const,
	},
	plugins: {
		legend: { display: false },
		tooltip: {
			backgroundColor: isDark.value ? 'oklch(0.205 0 0)' : 'oklch(1 0 0)',
			borderColor: isDark.value ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
			borderWidth: 1,
			titleColor: isDark.value ? 'oklch(0.985 0 0)' : 'oklch(0.145 0 0)',
			bodyColor: isDark.value ? 'oklch(0.708 0 0)' : 'oklch(0.556 0 0)',
			padding: 12,
			boxPadding: 4,
			usePointStyle: true,
			caretSize: 0,
			callbacks: {
				label: (ctx: any) => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('ru-RU')}`,
			},
		},
	},
	animation: {
		onComplete: () => {
			delayed = true;
		},
		delay: (context) => {
			let delay = 0;
			if (context.type === 'data' && context.mode === 'default' && !delayed) {
				delay = context.dataIndex * 300 + context.datasetIndex * 100;
			}
			return delay;
		},
	},
	scales: {
		x: {
			grid: { color: isDark.value ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' },
			ticks: { color: isDark.value ? '#b3b3b3' : '#888888' },
			border: { display: false },
		},
		y: {
			beginAtZero: true,
			grid: { color: isDark.value ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' },
			ticks: {
				color: isDark.value ? '#b3b3b3' : '#888888',
				callback: (v: any) => v.toLocaleString('ru-RU'),
			},
			border: { display: false },
		},
	},
}));
</script>
