<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ListCollapseIcon, MoreHorizontal, ZapIcon } from 'lucide-vue-next';
import type { Network } from './columns';

defineProps<{ data: Network }>();

function copy(id: string | number) {
	navigator.clipboard.writeText(String(id));
}
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button
				variant="ghost"
				class="w-8 h-8 p-0"
			>
				<span class="sr-only">Открыть меню</span>
				<MoreHorizontal class="w-4 h-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent
			align="end"
			class="w-56"
		>
			<DropdownMenuLabel>{{ data.name }}</DropdownMenuLabel>

			<DropdownMenuItem as-child>
				<nuxt-link :to="`/affiliate/networks/${data.id}`">
					<ListCollapseIcon />
					Подробнее
				</nuxt-link>
			</DropdownMenuItem>
			<DropdownMenuItem>
				<ZapIcon />
				Офферы сети
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem @click="copy(data.id)">Копировать ID</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
