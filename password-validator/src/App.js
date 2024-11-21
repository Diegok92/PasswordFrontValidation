import React, { useState } from "react";
import {
	FaCheck,
	FaTimes,
	FaEye,
	FaEyeSlash,
	FaClipboard,
} from "react-icons/fa";
import "./App.css";

function App() {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [validation, setValidation] = useState({
		length: false,
		lowercaseUppercase: false,
		noConsecutiveLetters: false,
		minNumbers: false,
		noConsecutiveNumbers: false,
		minSpecialChars: false,
		noZero: false,
		noSpaces: false,
	});

	const specialChars = "!@#$%^&*-_+=?";

	const validatePassword = (value) => {
		setPassword(value);

		const specialCharsCount = specialChars
			.split("")
			.filter((char) => value.includes(char)).length;

		const specialCharsInPassword = value
			.split("")
			.filter((char) => specialChars.includes(char));

		const noConsecutiveSpecialChars = specialCharsInPassword.every(
			(char, index) => {
				return (
					index === 0 || !specialChars.includes(value[value.indexOf(char) - 1])
				);
			}
		);

		setValidation({
			length: value.length >= 16,
			lowercaseUppercase: /[a-z]/.test(value) && /[A-Z]/.test(value),
			noConsecutiveLetters: !/([a-zA-Z])\1/.test(value),
			minNumbers: (value.match(/[1-9]/g) || []).length >= 4,
			noConsecutiveNumbers: !/(\d)\1/.test(value),
			minSpecialChars:
				specialCharsCount >= 2 &&
				new Set(specialCharsInPassword).size >= 2 &&
				noConsecutiveSpecialChars,
			noZero: !value.includes("0"),
			noSpaces: !/\s/.test(value),
		});
	};

	const getValidationClass = (isValid) =>
		`validation-item ${isValid ? "valid" : "invalid"}`;

	const isPasswordValid = () => {
		return Object.values(validation).every((valid) => valid);
	};

	const copyPasswordToClipboard = () => {
		navigator.clipboard
			.writeText(password)
			.then(() => {
				alert("Contraseña copiada al portapapeles");
			})
			.catch((err) => {
				console.error("Error al copiar la contraseña: ", err);
			});
	};

	return (
		<div className="container mt-5">
			<div className="card p-4 shadow-lg animated-card">
				<h2 className="card-title text-center mb-4">
					Validador de Contraseña Segura
				</h2>
				<div className="mb-3 password-input-wrapper">
					<input
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => validatePassword(e.target.value)}
						className="form-control"
						placeholder="Introduce tu contraseña..."
					/>
					<span
						className="password-toggle"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? <FaEyeSlash /> : <FaEye />}
					</span>
					{isPasswordValid() && (
						<span className="password-copy" onClick={copyPasswordToClipboard}>
							<FaClipboard />
						</span>
					)}
				</div>
				<ul className="list-group">
					<li
						className={`list-group-item ${getValidationClass(
							validation.length
						)}`}
					>
						{validation.length ? <FaCheck /> : <FaTimes />} Al menos 16
						caracteres
					</li>
					<li
						className={`list-group-item ${getValidationClass(
							validation.lowercaseUppercase
						)}`}
					>
						{validation.lowercaseUppercase ? <FaCheck /> : <FaTimes />} Letras
						mayúsculas y minúsculas
					</li>
					<li
						className={`list-group-item ${getValidationClass(
							validation.noConsecutiveLetters
						)}`}
					>
						{validation.noConsecutiveLetters ? <FaCheck /> : <FaTimes />} No
						tener dos letras iguales consecutivas
					</li>
					<li
						className={`list-group-item ${getValidationClass(
							validation.minNumbers
						)}`}
					>
						{validation.minNumbers ? <FaCheck /> : <FaTimes />} Al menos 4
						números (excluyendo 0)
					</li>
					<li
						className={`list-group-item ${getValidationClass(
							validation.noConsecutiveNumbers
						)}`}
					>
						{validation.noConsecutiveNumbers ? <FaCheck /> : <FaTimes />} No
						tener dos números iguales consecutivos
					</li>
					<li
						className={`list-group-item ${getValidationClass(
							validation.minSpecialChars
						)}`}
					>
						{validation.minSpecialChars ? <FaCheck /> : <FaTimes />} Al menos 2
						caracteres especiales no repetidos ni consecutivos (!@#$%^&*-_+=?)
					</li>
					<li
						className={`list-group-item ${getValidationClass(
							validation.noZero
						)}`}
					>
						{validation.noZero ? <FaCheck /> : <FaTimes />} No usar el número 0
					</li>
					<li
						className={`list-group-item ${getValidationClass(
							validation.noSpaces
						)}`}
					>
						{validation.noSpaces ? <FaCheck /> : <FaTimes />} No se permiten
						espacios
					</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
