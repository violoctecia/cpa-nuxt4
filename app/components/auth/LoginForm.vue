<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-vue-next';
import type { HTMLAttributes } from 'vue';

import { toTypedSchema } from '@vee-validate/zod';
import { useForm, Field as VeeField } from 'vee-validate';
import { toast } from 'vue-sonner';
import * as z from 'zod';
import { useAuthApi } from '~/api';
import Spinner from '../ui/spinner/Spinner.vue';

const props = defineProps<{
	class?: HTMLAttributes['class'];
}>();

const showPassword = ref(false);
const isLoading = ref(false);
const { login } = useAuthApi();

const formSchema = z.object({
	email: z.email('Неверный адрес электронной почты'),
	password: z.string().min(6, 'Пароль должен быть не менее 6 символов.'),
	remember: z.boolean().optional(),
});
const { handleSubmit } = useForm({
	validationSchema: toTypedSchema(formSchema),
	initialValues: {
		email: '',
		password: '',
		remember: false,
	},
});

const onSubmit = handleSubmit(async (values) => {
	isLoading.value = true;
	try {
		const result = await login({
			email: values.email,
			password: values.password,
			user_agent: window.navigator.userAgent,
		});

		console.log(result);

		toast.success('Успешный вход!');

		// TODO: сохранить токен и редирект
		// const token = useCookie('token')
		// token.value = result.token
		// navigateTo('/')
	} catch (err: any) {
		const status = err?.response?.status ?? err?.statusCode;

		if (status === 403) {
			toast.warning('Доступ ограничен', {
				description: 'Ваша заявка на рассмотрении. С вами свяжется менеджер.',
			});
		} else if (status === 401) {
			toast.error('Неверные данные', {
				description: 'Проверьте email и пароль.',
			});
		} else {
			toast.error('Ошибка входа', {
				description: 'Попробуйте ещё раз позже.',
			});
		}
	} finally {
		isLoading.value = false;
	}
});
</script>

<template>
	<form
		:class="cn('flex flex-col gap-12', props.class)"
		@submit="onSubmit"
	>
		<FieldGroup class="gap-6">
			<div class="flex flex-col gap-2 mb-6">
				<h1 class="text-2xl font-medium">Войти в систему</h1>
				<p class="text-muted-foreground text-sm text-balance">С возвращением, у нас столько нового!</p>
			</div>

			<VeeField
				v-slot="{ field, errors }"
				name="email"
				:validate-on-model-update="false"
			>
				<Field :data-invalid="!!errors.length">
					<FieldLabel for="email">Электронная почта</FieldLabel>
					<Input
						id="email"
						v-bind="field"
						placeholder="m@example.com"
						autocomplete="off"
						:aria-invalid="!!errors.length"
					/>
					<FieldError
						v-if="errors.length"
						:errors="errors"
					/>
				</Field>
			</VeeField>

			<VeeField
				v-slot="{ field, errors }"
				name="password"
				:validate-on-model-update="false"
			>
				<Field :data-invalid="!!errors.length">
					<div class="flex items-center">
						<FieldLabel for="password">Пароль</FieldLabel>
						<nuxt-link
							to="/auth/forgot-password"
							class="ml-auto text-muted-foreground text-xs underline-offset-4 hover:underline"
						>
							Забыли пароль?
						</nuxt-link>
					</div>

					<div class="relative">
						<Input
							id="password"
							v-bind="field"
							autocomplete="off"
							:type="showPassword ? 'text' : 'password'"
							:aria-invalid="!!errors.length"
						/>
						<button
							type="button"
							class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
							@click="showPassword = !showPassword"
						>
							<Eye
								v-if="!showPassword"
								class="size-4"
							/>
							<EyeOff
								v-else
								class="size-4"
							/>
						</button>
					</div>

					<FieldError
						v-if="errors.length"
						:errors="errors"
					/>
				</Field>
			</VeeField>

			<VeeField
				v-slot="{ field }"
				name="remember"
			>
				<Field>
					<div class="flex items-center gap-2">
						<Checkbox
							id="remember-me"
							v-bind="field"
						/>
						<FieldLabel for="remember-me">Запомнить меня</FieldLabel>
					</div>
				</Field>
			</VeeField>

			<Field class="mt-8">
				<Button
					type="submit"
					size="lg"
					:disabled="isLoading"
				>
					<Spinner
						v-if="isLoading"
						class="animate-spin"
					/>
					Войти в систему
				</Button>
			</Field>
		</FieldGroup>
		<p class="text-sm text-muted-foreground text-center">
			У вас еще нет учетной записи?
			<nuxt-link
				to="/auth/register"
				class="text-primary"
			>
				Создать аккаунт
			</nuxt-link>
		</p>
	</form>
</template>
