<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { createForm } from 'felte';

	let email: string;
	let confirmEmail: string;
	let password: string;

	const { form, errors } = createForm({
		validate: (values) => {
			const errors = {};
			if (!values.firstName) errors.firstName = ['Must not be empty'];
			if (!values.lastName) errors.lastName = ['Must not be empty'];
			if (!values.email || !/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(values.email)) {
				errors.email = 'Must be a valid email';
			}
			if (!values.confirmEmail) errors.confirmEmail = ['Must not be empty'];
			if (values.email !== values.confirmEmail) errors.confirmEmail = ['Email does not match'];
			if (!values.password) errors.password = ['Must not be empty'];
			if (values.password && values.password.length < 8) {
				errors.password = ['Must be over 8 characters'];
			}

			return errors;
		},
		onSubmit: (values) => {
			console.log(JSON.stringify(values));
		},
		extend: reporter
	});

	const handleSignUp = async () => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email: 'example@email.com',
				password: 'example-password',
				options: {
					data: {
						first_name: 'John',
						age: 27
					}
				}
			});
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			alert(error.error_description || error.message);
		}
	};
</script>

<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">Sign Up</h2>

<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
	<div class="bg-white dark:bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
		<form use:form class="space-y-6">
			<div>
				<label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
					>First name</label
				>
				<div class="mt-1">
					<input
						type="text"
						name="firstName"
						id="firstName"
						placeholder="Enter your First Name"
						autocomplete="given-name"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
					<ValidationMessage for="firstName" let:messages={message}>
						<span class="text-red-500 text-sm">{message || ''}</span>
					</ValidationMessage>
				</div>
			</div>
			<div>
				<label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
					>Last name</label
				>
				<div class="mt-1">
					<input
						type="text"
						name="lastName"
						id="lastName"
						placeholder="Enter your Last Name"
						autocomplete="family-name"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
					<ValidationMessage for="lastName" let:messages={message}>
						<span class="text-red-500 text-sm">{message || ''}</span>
					</ValidationMessage>
				</div>
			</div>
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
					What is your email?
				</label>
				<div class="mt-1">
					<input
						bind:value={email}
						id="email"
						name="email"
						type="email"
						placeholder="Enter your email"
						autocomplete="email"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
					<ValidationMessage for="email" let:messages={message}>
						<span class="text-red-500 text-sm">{message || ''}</span>
					</ValidationMessage>
				</div>
			</div>

			<div>
				<label
					for="confirmEmail"
					class="block text-sm font-medium text-gray-700 dark:text-gray-300"
				>
					Confirm your email
				</label>
				<div class="mt-1">
					<input
						bind:value={confirmEmail}
						id="confirmEmail"
						name="confirmEmail"
						type="email"
						placeholder="Enter your email again"
						autocomplete="email"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
					<ValidationMessage for="confirmEmail" let:messages={message}>
						<span class="text-red-500 text-sm">{message || ''}</span>
					</ValidationMessage>
				</div>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
					Create a Password
				</label>
				<div class="mt-1">
					<input
						bind:value={password}
						id="password"
						name="password"
						type="password"
						placeholder="Must be at least 8 characters"
						autocomplete="current-password"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
					<ValidationMessage for="password" let:messages={message}>
						<span class="text-red-500 text-sm">{message || ''}</span>
					</ValidationMessage>
				</div>
			</div>

			<div>
				<button type="submit" class="w-full flex justify-center btn-primary">Create Account</button>
			</div>
		</form>
	</div>
</div>
