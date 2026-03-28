<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-vue-next';

defineProps<{
	text: string;
}>();
</script>

<template>
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger as-child>
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-full border-none bg-transparent text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				>
					<HelpCircle class="h-4 w-4" />
				</button>
			</TooltipTrigger>
			<TooltipContent>
				<p class="max-w-xs">{{ text }}</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
</template>
