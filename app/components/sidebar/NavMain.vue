<script setup lang="ts">
import type { NavGroup } from '@/components/sidebar/AppSidebar.vue';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { ChevronRight } from 'lucide-vue-next';

defineProps<{
	nav: NavGroup;
}>();
</script>

<template>
	<SidebarGroup>
		<SidebarGroupLabel>{{ nav.group }}</SidebarGroupLabel>
		<SidebarMenu>
			<Collapsible
				v-for="item in nav.items"
				:key="item.title"
				as-child
				class="group/collapsible"
			>
				<SidebarMenuItem>
					<CollapsibleTrigger as-child>
						<SidebarMenuButton
							:tooltip="item.title"
							as-child
						>
							<div v-if="!item.url">
								<component
									:is="item.icon"
									v-if="item.icon"
								/>
								<span>{{ item.title }}</span>
								<ChevronRight
									class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
								/>
							</div>

							<nuxt-link
								:to="item.url"
								v-else
							>
								<component
									:is="item.icon"
									v-if="item.icon"
								/>
								<span>{{ item.title }}</span>
							</nuxt-link>
						</SidebarMenuButton>
					</CollapsibleTrigger>
					<CollapsibleContent v-if="item.items">
						<SidebarMenuSub>
							<SidebarMenuSubItem
								v-for="subItem in item.items"
								:key="subItem.title"
							>
								<SidebarMenuSubButton as-child>
									<nuxt-link :to="subItem.url">
										<component
											:is="subItem.icon"
											v-if="subItem.icon"
										/>
										<span>{{ subItem.title }}</span>
									</nuxt-link>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>
						</SidebarMenuSub>
					</CollapsibleContent>
				</SidebarMenuItem>
			</Collapsible>
		</SidebarMenu>
	</SidebarGroup>
</template>
