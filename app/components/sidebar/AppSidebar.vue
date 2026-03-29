<script setup lang="ts">
import Logo from '@/components/global/Logo.vue';
import NavMain from '@/components/sidebar/NavMain.vue';
import type { SidebarProps } from '@/components/ui/sidebar';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from '@/components/ui/sidebar';
import { ArrowLeftRight, House, Landmark, MessageCircleMore, Wallet, Waypoints } from 'lucide-vue-next';

const props = withDefaults(defineProps<SidebarProps>(), {
	collapsible: 'icon',
});

export interface NavItem {
	title: string;
	url?: string;
	icon?: Component;
	items?: NavItem[];
}

export interface NavGroup {
	group: string;
	items: NavItem[];
}

const nav: NavGroup[] = [
	{
		group: 'Аккаунт',
		items: [
			{
				title: 'Главная',
				url: '/',
				icon: House,
			},
			{
				title: 'Поддержка',
				url: '/',
				icon: MessageCircleMore,
			},
			{
				title: 'Кошельки',
				icon: Wallet,
				items: [
					{
						title: 'Баланс',
						icon: Landmark,
						url: '/',
					},
					{
						title: 'Транзакции',
						icon: ArrowLeftRight,
						url: '/',
					},
				],
			},
		],
	},
	{
		group: 'Система',
		items: [
			{
				title: 'Сети',
				icon: Waypoints,
				items: [
					{
						title: 'Все сети',
						url: '/',
					},
					{
						title: 'Мои сети',
						url: '/',
					},
					{
						title: 'Мои заявки',
						url: '/',
					},
				],
			},
		],
	},
];

const { state } = useSidebar();
</script>

<template>
	<Sidebar v-bind="props">
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton
						size="lg"
						class="flex items-center justify-center"
					>
						<nuxt-link
							to="/"
							class="flex items-center justify-center"
						>
							<Logo
								:is-small="state === 'collapsed'"
								class="flex items-center justify-center w-fit!"
							/>
						</nuxt-link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
		<SidebarContent>
			<NavMain
				v-for="group in nav"
				:key="group.group"
				:nav="group"
			/>
		</SidebarContent>
		<SidebarFooter></SidebarFooter>
		<SidebarRail />
	</Sidebar>
</template>
