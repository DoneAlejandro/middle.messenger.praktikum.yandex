import { LoginRequestData } from "../../../api/types";
import { login } from "../../../services/authorization";
import { emailValidation, loginValidation, nameValidation, passwordValidation, phoneValidation } from "../validation";

export function handleFormSubmit(event: Event) {
	
	console.log(event.target);
	const formElement = event.target as HTMLFormElement;
	console.log(`formElement ${formElement}`);
	
	// Теперь передаем форму в FormData
	const formData = new FormData(formElement);

	const formObject: LoginRequestData = {} as LoginRequestData;

	// Собираем все значения полей
	formData.forEach((value, key) => {
		formObject[key] = value.toString();
	});

	// Проверяем наличие каждого поля перед валидацией
	const isLoginValid = formObject["login"] ? loginValidation(formObject["login"]) : true;
	const isPasswordValid = formObject["password"] ? passwordValidation(formObject["password"]) : true;
	const isEmailValid = formObject["email"] ? emailValidation(formObject["email"]) : true;
	const isFirstNameValid = formObject["firstName"] ? nameValidation(formObject["firstName"]) : true;
	const isLastNameValid = formObject["lastName"] ? nameValidation(formObject["lastName"]) : true;
	const isPhoneValid = formObject["phone"] ? phoneValidation(formObject["phone"]) : true;

	// Проверяем, все ли поля валидны
	if (isLoginValid && isPasswordValid && isEmailValid && isFirstNameValid && isLastNameValid && isPhoneValid) {
		console.log("Форма успешно отправлена:", formObject);
		return true;
	} else {
		console.log("Форма содержит ошибки");
		return false;
	}
	// login(formObject);
	// userinfo();
}
