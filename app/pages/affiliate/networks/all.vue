<script setup lang="ts">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowRightIcon, ListCollapseIcon, MoreHorizontal, ZapIcon } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

definePageMeta({
	layout: 'dashboard',
});

const data = ref({
	data: [
		{
			id: 3,
			status: 'joined',
			pinned: false,
			name: 'Тестовая сеть 1',
			logo: null,
			country: {
				code: 'RU',
				title: 'Россия',
			},
			created_at: 1770335175,
			pricing_models: [
				{
					id: 6,
					name: 'CPC (Cost per Click)',
				},
			],
			currencies: [
				{
					code: 'RUB',
					name: 'российский рубль',
					symbol: '₽',
				},
				{
					code: 'USD',
					name: 'доллар США',
					symbol: '$',
				},
			],
			merchants_count: 3,
			affiliates_count: 3,
			offers_count: 5,
			settings: {
				auto_approve: false,
			},
			leads_count: 0,
			leads_turnover: 0,
			visibility: {
				roles: ['affiliate', 'merchant'],
			},
			default_manager_affiliate: {
				id: 4,
				first_name: '234',
				last_name: '234243243',
			},
			default_manager_merchant: {
				id: 5,
				first_name: 'Менджер',
				last_name: 'реклов',
			},
		},
	],
	sort_column: 'created_at',
	sort_order: 'desc',
	sortable: ['id', 'name', 'country', 'created_at'],
	total: 1,
	per_page: 25,
	current_page: 1,
	last_page: 1,
});

onMounted(async () => {
	try {
	} catch (e) {
		toast.error('Произошла ошибка при загрузке');
	}
});
</script>

<template>
	<div class="overflow-hidden rounded-lg border relative">
		<Table>
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
			<TableBody class="bg-muted/30">
				<TableRow v-for="i in 4">
					<TableCell>
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
					<TableCell>{{ data.data[0]?.name }}</TableCell>
					<TableCell>{{ data.data[0]?.offers_count }}</TableCell>
					<TableCell>{{ data.data[0]?.pricing_models.map((i) => i.name).join(', ') }}</TableCell>
					<TableCell>{{ data.data[0]?.currencies.map((i) => i.code).join(', ') }}</TableCell>
					<TableCell>{{ data.data[0]?.country.title }}</TableCell>
					<TableCell>
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
			<!-- <TableFooter>
				<TableRow>
					<TableCell colspan="3">Total</TableCell>
					<TableCell class="text-right">$2,500.00</TableCell>
				</TableRow>
			</TableFooter> -->
		</Table>
	</div>
</template>
