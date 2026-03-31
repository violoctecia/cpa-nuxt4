<script setup lang="ts" generic="TData, TValue">
import { valueUpdater } from '@/components/ui/table/utils';
import type { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/vue-table';
import {
	FlexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useVueTable,
} from '@tanstack/vue-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const props = defineProps<{
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	filterColumn?: {
		placeholder: string;
		column: string;
	};
	isLoading?: boolean;
}>();

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);

const table = useVueTable({
	get data() {
		return props.data;
	},
	get columns() {
		return props.columns;
	},
	getCoreRowModel: getCoreRowModel(),
	getPaginationRowModel: getPaginationRowModel(),

	getSortedRowModel: getSortedRowModel(),
	onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),

	onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
	getFilteredRowModel: getFilteredRowModel(),

	state: {
		get sorting() {
			return sorting.value;
		},
		get columnFilters() {
			return columnFilters.value;
		},
	},
});
</script>

<template>
	<div class="w-full">
		<div
			class="flex items-center py-4"
			v-if="filterColumn"
		>
			<Input
				class="max-w-sm"
				:placeholder="filterColumn.placeholder"
				:model-value="table.getColumn(filterColumn.column)?.getFilterValue() as string"
				@update:model-value="table.getColumn(filterColumn.column)?.setFilterValue($event)"
			/>
		</div>

		<div class="border rounded-md overflow-hidden relative">
			<Table>
				<TableHeader class="bg-muted/50 sticky top-0 z-10">
					<TableRow
						v-for="headerGroup in table.getHeaderGroups()"
						:key="headerGroup.id"
					>
						<TableHead
							v-for="header in headerGroup.headers"
							:key="header.id"
						>
							<FlexRender
								v-if="!header.isPlaceholder"
								:render="header.column.columnDef.header"
								:props="header.getContext()"
							/>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow
						v-if="isLoading"
						key="loading"
					>
						<TableCell
							:colspan="columns.length"
							class="h-24 text-center"
						>
							<Spinner class="mx-auto" />
						</TableCell>
					</TableRow>

					<TableRow
						v-else-if="!table.getRowModel().rows.length"
						key="empty"
					>
						<TableCell
							:colspan="columns.length"
							class="h-24 text-center"
						>
							Нет результатов
						</TableCell>
					</TableRow>

					<transition-group name="fade">
						<TableRow
							v-for="row in table.getRowModel().rows"
							:key="row.id"
						>
							<TableCell
								v-for="cell in row.getVisibleCells()"
								:key="cell.id"
							>
								<FlexRender
									:render="cell.column.columnDef.cell"
									:props="cell.getContext()"
								/>
							</TableCell>
						</TableRow>
					</transition-group>
				</TableBody>
			</Table>
		</div>
		<div class="flex items-center justify-end py-4 space-x-2">
			<Button
				variant="outline"
				size="sm"
				:disabled="!table.getCanPreviousPage()"
				@click="table.previousPage()"
			>
				Пред.
			</Button>
			<Button
				variant="outline"
				size="sm"
				:disabled="!table.getCanNextPage()"
				@click="table.nextPage()"
			>
				След.
			</Button>
		</div>
	</div>
</template>
