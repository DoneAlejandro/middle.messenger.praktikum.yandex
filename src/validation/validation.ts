// Общая функция валидации
export function checkValidate(event: Event, validationFn: (value: string) => boolean, fieldType: string) {
	console.log('validation');
	const input = event.target as HTMLInputElement;
	const isValid = validationFn(input.value);
	const errorElement = input.parentElement!.querySelector('.input-error') as HTMLElement;
	console.log(`input ${input.value}`);

	if (!isValid) {
		errorElement.textContent = getErrorMessage(fieldType);
		input.classList.add('input--error');
	} else {
		errorElement.textContent = '';
		input.classList.remove('input--error');
	}
}

// Функция для получения сообщения об ошибке
function getErrorMessage(fieldType: string): string {
	if (fieldType === 'login') {
		return 'Логин должен быть от 3 до 16 символов и содержать только буквы, цифры, символы "_" и "-".';
	} else if (fieldType === 'password') {
		return 'Пароль должен быть не менее 8 символов.';
	}
	return 'Неверный ввод';
}

// Валидация логина
export function loginValidation(value: string): boolean {
	console.log(`value ${value}`);

	return /^[a-zA-Z0-9_-]{3,16}$/.test(value);
}

// Валидация пароля
export function passwordValidation(value: string): boolean {
	const regex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_-]{8,40}$/;
	return regex.test(value);
}
