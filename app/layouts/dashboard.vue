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
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CameraIcon, LogOutIcon, Settings, UserPen } from 'lucide-vue-next';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useTimezonesApi } from '~/api';

const tzItems = await useTimezonesApi().getTimezones();

const open = ref(false);
const value = ref('');
const selectedFramework = computed(() => tzItems.find((item) => item.value === value.value));
function selectFramework(selectedValue: string) {
	value.value = selectedValue === value.value ? '' : selectedValue;
	open.value = false;
}
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

						<Dialog>
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
										<DialogTrigger as-child>
											<DropdownMenuItem>
												<Settings />
												Настройки
											</DropdownMenuItem>
										</DialogTrigger>
										<DialogTrigger as-child>
											<DropdownMenuItem>
												<UserPen />
												Профиль
											</DropdownMenuItem>
										</DialogTrigger>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<LogOutIcon />
										Выйти
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<DialogContent class="sm:max-w-xl">
								<Tabs default-value="profile">
									<TabsList class="w-full mb-6 mt-3">
										<TabsTrigger value="profile">Профиль</TabsTrigger>
										<TabsTrigger value="settings">Настройки</TabsTrigger>
										<TabsTrigger value="notifications">Уведомления</TabsTrigger>
										<TabsTrigger value="billing">Биллинг</TabsTrigger>
									</TabsList>
									<TabsContent value="profile">
										<DialogHeader>
											<DialogTitle>Профиль</DialogTitle>
											<DialogDescription>Ваша персональная информация</DialogDescription>
										</DialogHeader>

										<div class="mt-6 flex flex-col gap-6">
											<div class="p-4 bg-muted/50 rounded-xl flex items-center gap-6">
												<Button
													variant="secondary"
													class="p-0 h-full rounded-full"
												>
													<Avatar class="w-20! h-20! relative">
														<AvatarImage
															src="https://github.com/shadcn.png"
															class="brightness-50"
														/>
														<CameraIcon
															class="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-6! h-6! text-white"
														/>
													</Avatar>
												</Button>
												<div class="flex flex-col w-full">
													<div class="grid gap-2">
														<Input
															class="border-none shadow-none rounded-none px-0 focus-visible:ring-0 bg-transparent!"
															id="name"
															type="text"
															placeholder="Имя"
														/>
													</div>
													<Separator />
													<div class="grid gap-2">
														<Input
															class="border-none shadow-none rounded-none px-0 focus-visible:ring-0 bg-transparent!"
															id="surname"
															type="text"
															placeholder="Фамилия"
														/>
													</div>
												</div>
											</div>

											<div class="grid gap-3">
												<Label for="phone">Телефон</Label>
												<Input
													id="phone"
													type="text"
												/>
											</div>
											<div class="grid gap-3">
												<Label for="email">Электронная почта</Label>
												<Input
													id="email"
													type="email"
												/>
											</div>
											<div class="grid gap-3">
												<Label as="span">Пароль</Label>
												<Button
													size="sm"
													class="w-fit"
												>
													Изменить пароль
												</Button>
											</div>
										</div>
									</TabsContent>

									<TabsContent value="settings">
										<DialogHeader>
											<DialogTitle>Настройки</DialogTitle>
										</DialogHeader>
										<div class="mt-6 flex flex-col gap-6">
											<div class="grid gap-3">
												<Label as="span">Формат даты</Label>
												<Select>
													<SelectTrigger class="w-full">
														<SelectValue placeholder="Выберите формат" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectItem value="apple">дд.мм.гггг</SelectItem>
															<SelectItem value="banana">дд/мм/гггг</SelectItem>
															<SelectItem value="blueberry">мм/дд/гггг</SelectItem>
														</SelectGroup>
													</SelectContent>
												</Select>
											</div>
											<div class="grid gap-3">
												<Label as="span">Основная валюта</Label>
												<Select>
													<SelectTrigger class="w-full">
														<SelectValue placeholder="Выберите валюту" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectItem value="apple">Российский рубль</SelectItem>
															<SelectItem value="banana">Доллар США</SelectItem>
															<SelectItem value="blueberry">Евро</SelectItem>
														</SelectGroup>
													</SelectContent>
												</Select>
											</div>
											<div class="grid gap-3">
												<Label as="span">Часовой пояс</Label>
												<Popover v-model:open="open">
													<PopoverTrigger as-child>
														<Button
															variant="outline"
															role="combobox"
															:aria-expanded="open"
															class="w-full justify-between"
														>
															{{ selectedFramework?.label || 'Выберите часовой пояс' }}
															<ChevronsUpDownIcon class="opacity-50" />
														</Button>
													</PopoverTrigger>
													<PopoverContent
														class="w-sm p-0"
														align="start"
														side="top"
														:side-offset="4"
														:avoid-collisions="false"
													>
														<Command>
															<CommandInput
																class="h-9"
																placeholder="Поиск..."
															/>
															<CommandList>
																<CommandEmpty>Ничего не найдено</CommandEmpty>
																<CommandGroup>
																	<CommandItem
																		v-for="item in tzItems"
																		:key="item.value"
																		:value="item.value"
																		@select="
																			(ev) => {
																				selectFramework(ev.detail.value as string);
																			}
																		"
																	>
																		{{ item.label }}
																		<CheckIcon
																			:class="
																				cn(
																					'ml-auto',
																					value === item.value
																						? 'opacity-100'
																						: 'opacity-0',
																				)
																			"
																		/>
																	</CommandItem>
																</CommandGroup>
															</CommandList>
														</Command>
													</PopoverContent>
												</Popover>
											</div>
										</div>
									</TabsContent>

									<TabsContent value="notifications">
										<DialogHeader>
											<DialogTitle>Настройка уведомлений</DialogTitle>
										</DialogHeader>
									</TabsContent>
									<TabsContent value="billing">
										<DialogHeader>
											<DialogTitle>Биллинг</DialogTitle>
										</DialogHeader>
									</TabsContent>
								</Tabs>

								<DialogFooter class="sm:justify-center mt-8">
									<DialogClose as-child>
										<Button
											type="button"
											variant="secondary"
											class="flex-1"
										>
											Закрыть
										</Button>
									</DialogClose>
									<Button class="flex-1">Сохранить</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</header>

				<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
					<slot />
				</div>
			</SidebarInset>
		</SidebarProvider>
	</div>
</template>
