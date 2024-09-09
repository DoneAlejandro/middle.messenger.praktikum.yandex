// Общая функция валидации
export function checkValidate(event: Event, validationFn: (value: string) => boolean, fieldType: string) {
	const inputElement = event.target as HTMLInputElement;
	const value = inputElement.value;

	let isValid = false;
	let errorMessage = '';

	// Проверка типа поля
	switch (fieldType) {
		case 'login':
			isValid = validationFn(value);
			errorMessage = 'Неверный логин';
			break;

		case 'password':
			isValid = validationFn(value);
			errorMessage = 'Неверный пароль';
			break;

		case 'email':
			isValid = validationFn(value);
			errorMessage = 'Неверный email';
			break;

		case 'first_name':
			isValid = validationFn(value);
			errorMessage = 'Имя должно начинаться с большой буквы';
			break;

		case 'last_name':
			isValid = validationFn(value);
			errorMessage = 'Фамилия должна начинаться с большой буквы';
			break;

		case 'phone':
			isValid = validationFn(value);
			errorMessage = 'Телефон должен начинаться с +7 и содержать 12 символов';
			break;

		default:
			console.error('Неизвестный тип поля');
	}

	if (!isValid) {
		inputElement.classList.add('input--error');
		const errorSpan = inputElement.nextElementSibling as HTMLElement;
		if (errorSpan) {
			errorSpan.textContent = errorMessage;
		}
	} else {
		inputElement.classList.remove('input--error');
		const errorSpan = inputElement.nextElementSibling as HTMLElement;
		if (errorSpan) {
			errorSpan.textContent = '';
		}
	}
}

// Валидация логина
export function loginValidation(value: string): boolean {
	return /^[a-zA-Z0-9_-]{3,16}$/.test(value);
}

// Валидация пароля
export function passwordValidation(value: string): boolean {
	const regex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_-]{8,40}$/;
	return regex.test(value);
}

// Валидация email
export function emailValidation(email: string): boolean {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email);
}

// Валидация имени и фамилии
export function nameValidation(name: string): boolean {
	const namePattern = /^[A-ZА-ЯЁ][a-zа-яё]+$/;
	return namePattern.test(name);
}

// Валидация телефона
export function phoneValidation(phone: string): boolean {
	const phonePattern = /^\+7\d{10}$/;
	return phonePattern.test(phone);
}
