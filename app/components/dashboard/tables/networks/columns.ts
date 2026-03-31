import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { ColumnDef } from '@tanstack/vue-table';
import { ArrowUpDown } from 'lucide-vue-next';
import { h } from 'vue';
import DropdownAction from './DataTableDropdown.vue';

export interface Network {
	id: number;
	status: string;
	name: string;
	logo: string | null;
	country: {
		code: string;
		title: string;
	};
	created_at: number;
	pricing_models: {
		id: number;
		name: string;
	}[];
	currencies: {
		code: string;
		name: string;
		symbol: string;
	}[];
	merchants_count: number;
	affiliates_count: number;
	offers_count: number;
	leads_count: number;
	leads_turnover: number;
}

export const columns: ColumnDef<Network>[] = [
	{
		accessorKey: 'logo',
		header: () => h('div', { class: 'min-w-[40px] max-w-[40px]' }),
		cell: ({ row }) => {
			const logo = row.getValue('logo') as string | null;
			const name = row.getValue('name') as string;

			return h(
				Avatar,
				{},
				{
					default: () => [
						logo ? h(AvatarImage, { src: logo, alt: name }) : null,
						h(AvatarFallback, {}, () => name?.[0] ?? '?'),
					],
				},
			);
		},
	},

	{
		accessorKey: 'name',
		header: () => h('div', {}, 'Название'),
		cell: ({ row }) => {
			const name = row.getValue('name') as string;
			return h('div', { class: 'font-medium' }, name);
		},
	},

	{
		accessorKey: 'offers_count',
		// header: () => h('div', { class: 'text-center' }, 'Офферы, шт.'),
		// cell: ({ row }) => {
		// 	const value = row.getValue('offers_count') as number;
		// 	return h('div', { class: 'text-center' }, value);
		// },
		header: ({ column }) => {
			return h(
				Button,
				{
					variant: 'ghost',
					onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
				},
				() => ['Кол-во офферов', h(ArrowUpDown, {})],
			);
		},
		cell: ({ row }) => h('div', { class: 'px-4' }, row.getValue('offers_count')),
	},

	{
		accessorKey: 'pricing_models',
		header: () => h('div', {}, 'Модели оплаты'),
		cell: ({ row }) => {
			const models = row.getValue('pricing_models') as Network['pricing_models'];

			const text = models.map((m) => m.name).join(', ');
			return h('div', {}, text || '—');
		},
	},

	{
		accessorKey: 'currencies',
		header: () => h('div', {}, 'Поддерживаемые валюты'),
		cell: ({ row }) => {
			const currencies = row.getValue('currencies') as Network['currencies'];

			const text = currencies.map((c) => c.code).join(', ');
			return h('div', {}, text || '—');
		},
	},

	{
		id: 'country',
		header: () => h('div', {}, 'Страна'),
		cell: ({ row }) => {
			const country = row.original.country;
			return h('div', {}, country?.title ?? '—');
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const data = row.original;

			return h(
				'div',
				{ class: 'flex justify-end' },
				h(DropdownAction, {
					data,
				}),
			);
		},
	},
];
