<script setup lang="ts">
import { toast } from 'vue-sonner';
import type { Network } from '~/components/dashboard/tables/networks/columns';
import { columns } from '~/components/dashboard/tables/networks/columns';
import DataTable from '~/components/dashboard/tables/networks/DataTable.vue';

definePageMeta({
	layout: 'dashboard',
});

const data = ref<Network[]>([]);
const isLoading = ref(true);

async function getData(): Promise<Network[]> {
	return [
		{
			id: 1,
			status: 'joined',
			name: 'AdNetwork Pro',
			logo: null,
			country: { code: 'US', title: 'США' },
			created_at: 1710000000,
			pricing_models: [{ id: 1, name: 'CPC (Cost per Click)' }],
			currencies: [{ code: 'USD', name: 'доллар США', symbol: '$' }],
			merchants_count: 12,
			affiliates_count: 45,
			offers_count: 120,
			leads_count: 540,
			leads_turnover: 12000,
		},
		{
			id: 2,
			status: 'joined',
			name: 'LeadGen Hub',
			logo: null,
			country: { code: 'DE', title: 'Германия' },
			created_at: 1711000000,
			pricing_models: [{ id: 2, name: 'CPA (Cost per Action)' }],
			currencies: [{ code: 'EUR', name: 'евро', symbol: '€' }],
			merchants_count: 8,
			affiliates_count: 30,
			offers_count: 80,
			leads_count: 210,
			leads_turnover: 8300,
		},
		{
			id: 3,
			status: 'joined',
			name: 'TrafficFlow',
			logo: null,
			country: { code: 'RU', title: 'Россия' },
			created_at: 1712000000,
			pricing_models: [{ id: 3, name: 'RevShare' }],
			currencies: [
				{ code: 'RUB', name: 'рубль', symbol: '₽' },
				{ code: 'USD', name: 'доллар США', symbol: '$' },
			],
			merchants_count: 15,
			affiliates_count: 60,
			offers_count: 200,
			leads_count: 900,
			leads_turnover: 25000,
		},
		{
			id: 4,
			status: 'joined',
			name: 'CPA Master',
			logo: null,
			country: { code: 'KZ', title: 'Казахстан' },
			created_at: 1713000000,
			pricing_models: [
				{ id: 1, name: 'CPC (Cost per Click)' },
				{ id: 2, name: 'CPA (Cost per Action)' },
			],
			currencies: [{ code: 'USD', name: 'доллар США', symbol: '$' }],
			merchants_count: 5,
			affiliates_count: 18,
			offers_count: 40,
			leads_count: 120,
			leads_turnover: 4100,
		},
		{
			id: 5,
			status: 'joined',
			name: 'ClickStorm',
			logo: null,
			country: { code: 'FR', title: 'Франция' },
			created_at: 1714000000,
			pricing_models: [{ id: 1, name: 'CPC (Cost per Click)' }],
			currencies: [{ code: 'EUR', name: 'евро', symbol: '€' }],
			merchants_count: 20,
			affiliates_count: 75,
			offers_count: 300,
			leads_count: 1200,
			leads_turnover: 40000,
		},
		{
			id: 6,
			status: 'joined',
			name: 'AdCore',
			logo: null,
			country: { code: 'PL', title: 'Польша' },
			created_at: 1715000000,
			pricing_models: [{ id: 2, name: 'CPA (Cost per Action)' }],
			currencies: [
				{ code: 'EUR', name: 'евро', symbol: '€' },
				{ code: 'USD', name: 'доллар США', symbol: '$' },
			],
			merchants_count: 9,
			affiliates_count: 22,
			offers_count: 65,
			leads_count: 340,
			leads_turnover: 9500,
		},
		{
			id: 7,
			status: 'joined',
			name: 'MarketLeads',
			logo: null,
			country: { code: 'IT', title: 'Италия' },
			created_at: 1716000000,
			pricing_models: [{ id: 3, name: 'RevShare' }],
			currencies: [{ code: 'EUR', name: 'евро', symbol: '€' }],
			merchants_count: 7,
			affiliates_count: 15,
			offers_count: 50,
			leads_count: 180,
			leads_turnover: 6200,
		},
		{
			id: 8,
			status: 'joined',
			name: 'GlobalAds',
			logo: null,
			country: { code: 'UK', title: 'Великобритания' },
			created_at: 1717000000,
			pricing_models: [
				{ id: 1, name: 'CPC (Cost per Click)' },
				{ id: 3, name: 'RevShare' },
			],
			currencies: [{ code: 'USD', name: 'доллар США', symbol: '$' }],
			merchants_count: 14,
			affiliates_count: 55,
			offers_count: 180,
			leads_count: 760,
			leads_turnover: 21000,
		},
		{
			id: 9,
			status: 'joined',
			name: 'AdRiver',
			logo: null,
			country: { code: 'UA', title: 'Украина' },
			created_at: 1718000000,
			pricing_models: [{ id: 2, name: 'CPA (Cost per Action)' }],
			currencies: [
				{ code: 'USD', name: 'доллар США', symbol: '$' },
				{ code: 'EUR', name: 'евро', symbol: '€' },
			],
			merchants_count: 6,
			affiliates_count: 12,
			offers_count: 35,
			leads_count: 95,
			leads_turnover: 2800,
		},
		{
			id: 10,
			status: 'joined',
			name: 'ClickBridge',
			logo: null,
			country: { code: 'ES', title: 'Испания' },
			created_at: 1719000000,
			pricing_models: [{ id: 1, name: 'CPC (Cost per Click)' }],
			currencies: [{ code: 'EUR', name: 'евро', symbol: '€' }],
			merchants_count: 11,
			affiliates_count: 40,
			offers_count: 140,
			leads_count: 500,
			leads_turnover: 15000,
		},
		{
			id: 11,
			status: 'joined',
			name: 'AdSphere',
			logo: null,
			country: { code: 'NL', title: 'Нидерланды' },
			created_at: 1720000000,
			pricing_models: [
				{ id: 2, name: 'CPA (Cost per Action)' },
				{ id: 3, name: 'RevShare' },
			],
			currencies: [{ code: 'EUR', name: 'евро', symbol: '€' }],
			merchants_count: 13,
			affiliates_count: 33,
			offers_count: 95,
			leads_count: 410,
			leads_turnover: 11000,
		},
		{
			id: 12,
			status: 'joined',
			name: 'TrafficStars',
			logo: null,
			country: { code: 'CA', title: 'Канада' },
			created_at: 1721000000,
			pricing_models: [{ id: 3, name: 'RevShare' }],
			currencies: [
				{ code: 'USD', name: 'доллар США', symbol: '$' },
				{ code: 'CAD', name: 'канадский доллар', symbol: '$' },
			],
			merchants_count: 16,
			affiliates_count: 70,
			offers_count: 220,
			leads_count: 980,
			leads_turnover: 30000,
		},
	];
}

onMounted(async () => {
	try {
		isLoading.value = true;
		setTimeout(() => {}, 800);
		data.value = await getData();
	} catch (e) {
		toast.error('Произошла ошибка при загрузке данных');
	} finally {
		isLoading.value = false;
	}
});
</script>

<template>
	<div class="mx-auto w-full">
		<DataTable
			:is-loading="isLoading"
			:columns="columns"
			:data="data"
			:filter-column="{
				placeholder: 'Поиск по названию',
				column: 'name',
			}"
		/>
	</div>
	<!-- <div class="overflow-hidden rounded-lg border relative">
		<Table class="text-sm">
			<TableHeader class="bg-muted sticky top-0 z-10">
				<TableRow>
					<TableHead class="w-[100px]"></TableHead>
					<TableHead>Название</TableHead>
					<TableHead>Офферы, шт.</TableHead>
					<TableHead>Модели оплаты</TableHead>
					<TableHead>Поддерживаемые валюты</TableHead>
					<TableHead>Страна</TableHead>
					<TableHead></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow v-for="i in 4">
					<TableCell class="py-0.5">
						<Avatar>
							<AvatarImage src="" />
							<AvatarFallback>
								{{
									data.data[0]?.name
										.split(' ')
										.slice(0, 2)
										.map((i) => i[0]?.toUpperCase())
										.join('')
								}}
							</AvatarFallback>
						</Avatar>
					</TableCell>
					<TableCell class="py-0.5 font-bold">{{ data.data[0]?.name }}</TableCell>
					<TableCell class="py-0.5">{{ data.data[0]?.offers_count }}</TableCell>
					<TableCell class="py-0.5">{{ data.data[0]?.pricing_models.map((i) => i.name).join(', ') }}</TableCell>
					<TableCell class="py-0.5">{{ data.data[0]?.currencies.map((i) => i.code).join(', ') }}</TableCell>
					<TableCell class="py-0.5">{{ data.data[0]?.country.title }}</TableCell>
					<TableCell class="py-0.5 flex justify-end">
						<DropdownMenu>
							<DropdownMenuTrigger as-child>
								<Button
									variant="ghost"
									size="icon"
								>
									<MoreHorizontal />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								class="w-56"
								align="end"
							>
								<DropdownMenuLabel>{{ data.data[0]?.name }}</DropdownMenuLabel>
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<ListCollapseIcon />
										Подробнее
										<DropdownMenuShortcut>
											<ArrowRightIcon />
										</DropdownMenuShortcut>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<ZapIcon />
										Офферы
										<DropdownMenuShortcut>
											<ArrowRightIcon />
										</DropdownMenuShortcut>
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</TableCell>
				</TableRow>
			</TableBody>
		
		</Table>
	</div> -->
</template>
