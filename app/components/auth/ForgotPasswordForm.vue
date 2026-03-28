<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
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
});
const { handleSubmit } = useForm({
	validationSchema: toTypedSchema(formSchema),
	initialValues: {
		email: '',
	},
});

const onSubmit = handleSubmit(async (values) => {
	isLoading.value = true;
	try {
		toast.success('Успешный вход!');

		// TODO: сохранить токен и редирект
		// const token = useCookie('token')
		// token.value = result.token
		// navigateTo('/')
	} catch (err: any) {
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
				<h1 class="text-2xl font-medium">Восстановление пароля</h1>
				<p class="text-muted-foreground text-sm text-balance">Введите ваш email, чтобы восстановить пароль</p>
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
					Отправить ссылку
				</Button>
			</Field>
		</FieldGroup>
		<p class="text-sm text-muted-foreground text-center">
			<nuxt-link
				to="/auth/login"
				class="text-primary"
			>
				Вернуться к входу
			</nuxt-link>
		</p>
	</form>
</template>
