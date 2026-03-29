<script setup lang="ts">
import AppSidebar from '@/components/sidebar/AppSidebar.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { LogOutIcon, Settings, UserPen } from 'lucide-vue-next';
</script>

<template>
	<div>
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header
					class="flex h-16 shrink-0 px-4 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
				>
					<div class="flex items-center gap-2">
						<SidebarTrigger class="-ml-1" />
						<Separator
							orientation="vertical"
							class="mr-2 data-[orientation=vertical]:h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem class="hidden md:block">
									<BreadcrumbLink href="#">Сети</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator class="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Мои сети</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<div class="flex items-center gap-2">
						<ModeToggle />
						<Separator
							orientation="vertical"
							class="mr-2 data-[orientation=vertical]:h-4"
						/>

						<DropdownMenu>
							<DropdownMenuTrigger>
								<Avatar>
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								:side-offset="20"
								class="w-56"
							>
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<Settings />
										Настройки
									</DropdownMenuItem>
									<DropdownMenuItem>
										<UserPen />
										Профиль
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<LogOutIcon />
									Выйти
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>

				<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
					<slot />
				</div>
			</SidebarInset>
		</SidebarProvider>
	</div>
</template>
