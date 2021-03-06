// * Creamos un objeto 'inputs' con todos los inputs de nuestro HTML.
const inputs = {
	fullName: document.getElementById("participant__full_name"),
	birthYear: document.getElementById("participant__birth_year"),
	username: document.getElementById("participant__username"),
	password: document.getElementById("participant__password"),
	repPassword: document.getElementById("participant__rep_password"),
};

window.addEventListener("load", () => {
	initializeRequired(inputs);
	addEvents(inputs);
});

const initializeRequired = (inputs) => {
	// Iteramos por cada propiedad del objeto
	for (const [key, input] of Object.entries(inputs)) {
		/*
		 * Definimos, con la propiedad required,
		 * que los campos son obligatorios
		 */
		input.required = true;
	}
};

const addEvents = (i) => {
	let modal = document.getElementById("confirm__modal");

	i.fullName.addEventListener("focusout", function () {
		this.value = this.value.toUpperCase();
	});
	i.birthYear.addEventListener("input", function () {
		checkBirthYearValidity(this);
	});
	i.username.addEventListener("input", function () {
		checkUsernameValidity(this);
	});
	i.password.addEventListener("input", function () {
		checkPasswordsValidity(this, i.repPassword);
	});
	i.repPassword.addEventListener("input", function () {
		checkPasswordsValidity(i.password, this);
	});
	document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
		checkbox.addEventListener("click", function () {
			checkCheckboxes();
		});
	});

	document
		.getElementById("modal__close")
		.addEventListener("click", function () {
			modal.style.display = "none";
			document.getElementById("modal__body").innerHTML = "";
		});
	document
		.getElementById("modal__confirm")
		.addEventListener("click", function () {
			window.location.reload();
		});

	document
		.getElementById("participant__submit")
		.addEventListener("click", function (event) {
			event.preventDefault();
			handleSubmit(i, modal);
		});
};

// Comprueba las condiciones de los checkboxes
const checkMatch = (value) => {
	return (regex) => regex.test(value);
};

/**
 * Determina si una condici??n del feedback proporcionado al usuario se cumple o
 * no. En caso de que se cumpla, se tacha de la lista.
 *
 * @param {String} id: Identificador del elemento a controlar
 * @param {Boolean} shouldStrike: Determina si se tiene que a??adir o no la clase
 * @param {String} classToHandle: Contiene la clase a a??adir o eliminar. Por
 * defecto es 'text-decoration-line-through' ya que es el valor m??s recurrente.
 */
const handleCondition = (
	id,
	shouldAdd,
	classToHandle = "text-decoration-line-through"
) => {
	if (shouldAdd) {
		document.getElementById(id).classList.add(classToHandle);
	} else {
		document.getElementById(id).classList.remove(classToHandle);
	}
};

/*
 ****************************** A??O NACIMIENTO *******************************
 *****************************************************************************
 * El a??o estar?? comprendido entre  1957 y 2003
 *****************************************************************************
 - ^ delimitador (comienzo de la cadena)
 - 19[6789]\d para a??os entre 1960 y 1999 (ambos incluidos)
 - 195[789] para a??os entre 1957 y 1959
 - 200[0123] para a??os entre el 2000 y 2003
 - $ delimitador (final de la cadena)

 // ESTE ES EL REGEX: /^(19[6789]\d|195[789]|200[0123])$/
 */
const checkBirthYearValidity = (birthYear) => {
	if (checkMatch(birthYear.value)(/^(19[6789]\d|195[789]|200[0123])$/)) {
		birthYear.classList.add("is-valid");
		birthYear.classList.remove("is-invalid");
		birthYear.style.backgroundColor = "white";
	} else {
		birthYear.classList.remove("is-valid");
		birthYear.classList.add("is-invalid");
		birthYear.style.backgroundColor = "yellow";
	}
};

/*
 ******************************* NOMBRE USUARIO ******************************
 * Dividimos el RegExp en 2 grupos (delimitados por par??ntesis)
 *****************************************************************************
 * GRUPO 1: El primer car??cter del nombre de usuario ser?? una consonante en
 * may??scula.
 *****************************************************************************
 * Regex: ^([^ -AEIOU[-??])

 - El primer ^ afirma la posici??n al comienzo de la cadena.
 - El ^ contenido en el grupo comprueba que el nombre de usuario NO comienza con
   el patr??n determinado.
 -  -A excluye los caracteres ASCII comprendidos entre el ??ndice 32 ( ) y el 65
    (A).
 - EIOU son caracteres a excluir dentro del rango de consonantes en may??scula.
 - [-?? El car??cter [ es el valor que sucede al car??cter Z, por lo que todos los
   caracteres consecuentes son innecesarios. -?? filtra los caracteres hasta ??,
   el cual es el ??ltimo car??cter ASCII (255).

 ******************************************************************************
 * GRUPO 2: El resto de caracteres en min??sculas. Letras, incluida la ??, vocales
 * acentuadas, n??meros y _
 ******************************************************************************
 * Regex: ([a-z0-9_??-????])

 - \w incluye el alfabeto (min??scula y may??scula), n??meros, _
 - ??-?? para vocales acentuadas (may??scula y min??scula).
 - ?? para incluir la letra ??.

 ******************************************************************************
 * M??nimo 5 y m??ximo 15 caracteres
 ******************************************************************************
 - {4,14} el n??mero de veces que se tiene que repetir el patr??n, sin tener en
   cuenta la primera consonante may??scula.

 Regex final: /^([^ -AEIOU[-??])([a-z0-9_??-??????]){4,14}$/
 */
const checkUsernameValidity = (username) => {
	if (checkMatch(username.value)(/^([^ -AEIOU[-??])([a-z0-9_??-??????]){4,14}$/)) {
		username.classList.add("is-valid");
		username.classList.remove("is-invalid");
		username.style.backgroundColor = "white";
	} else {
		username.classList.remove("is-valid");
		username.classList.add("is-invalid");
		username.style.backgroundColor = "yellow";
		checkUsernameMatches(username.value);
	}
};

const checkUsernameMatches = (value) => {
	const checkMatchOfValue = checkMatch(value);

	checkMatchOfValue(/^([^ -AEIOU[-??])/) ?
		handleCondition("username__start", true) :
		handleCondition("username__start", false);

	checkMatchOfValue(/([a-z0-9_??-??????])/) ?
		handleCondition("username__lowercase", true) :
		handleCondition("username__lowercase", false)

	checkMatchOfValue(/^[ -~]{5,15}$/) ?
		handleCondition("username__length", true) :
		handleCondition("username__length", false)
}

/*
 ******************************** CONTRASE??A ********************************
 *****************************************************************************
 * Debe tener, al menos, un n??mero par.
 *****************************************************************************
 (?=.*[02468])

 *****************************************************************************
 * Debe tener, al menos, un car??cter $&@#
 *****************************************************************************
 (?=.*[$&@#])

 *****************************************************************************
 * Debe tener al menos un car??cter alfab??tico en may??scula.
 *****************************************************************************
 (?=.*[A-Z??])

 *****************************************************************************
 * No puede contener la palabra 'pass'
 *****************************************************************************
 (?!.*pass)

 *****************************************************************************
 * Al menos 8 caracteres y 20 m??ximo
 *****************************************************************************
 {8,20}

 // REGEX: ^(?!.*pass)(?=.*[02468])(?=.*[$&@#]).{8,20}$
 */
const checkPasswordsValidity = (password, repPassword) => {
	const regexPassword =
		/^(?!.*pass)(?=.*[02468])(?=.*[$&@#])(?=.*[A-Z??]).{8,20}$/;

	if (
		checkMatch(password.value)(regexPassword) &&
		password.value === repPassword.value
	) {
		password.classList.add("is-valid");
		password.classList.remove("is-invalid");
		password.style.backgroundColor = "white";
		repPassword.classList.add("is-valid");
		repPassword.classList.remove("is-invalid");
		repPassword.style.backgroundColor = "white";
	} else if (!checkMatch(password.value)(regexPassword)) {
		password.classList.remove("is-valid");
		password.classList.add("is-invalid");
		password.style.backgroundColor = "yellow";
		checkPasswordMatches(password.value);
		repPassword.classList.remove("is-valid");
		repPassword.classList.remove("is-invalid");
		repPassword.style.backgroundColor = "white";
	} else {
		// password y repPassword no coinciden
		password.classList.add("is-valid");
		password.classList.remove("is-invalid");
		password.style.backgroundColor = "white";
		repPassword.classList.remove("is-valid");
		repPassword.classList.add("is-invalid");
		repPassword.style.backgroundColor = "yellow";
	}
};

const checkPasswordMatches = (value) => {
	const checkMatchOfValue = checkMatch(value);

	checkMatchOfValue(/(?=.*[02468])/) ?
		handleCondition("password__even_number", true) :
		handleCondition("password__even_number", false)

	checkMatchOfValue(/(?=.*[$&@#])/) ?
		handleCondition("password__special_char", true) :
		handleCondition("password__special_char", false)

	checkMatchOfValue(/(?=.*[A-Z??])/) ?
		handleCondition("password__uppercase", true) :
		handleCondition("password__uppercase", false)

	checkMatchOfValue(/^[ -~]{8,20}$/) ?
		handleCondition("password__length", true) :
		handleCondition("password__length", false)
}


/*
 ******************************** CHECKBOXES *********************************
 * Como m??nimo, se podr?? elegir 1 opci??n y como m??ximo 3.
 *****************************************************************************
 */
const checkCheckboxes = () => {
	const checkedLength = document.querySelectorAll(
		'input[type="checkbox"]:checked'
	).length;
	if (checkedLength >= 1 && checkedLength <= 3) {
		handleCondition("checkbox__feedback", true, "d-none");
		handleCondition("checkbox__feedback", false, "is-invalid");
	} else {
		handleCondition("checkbox__feedback", false, "d-none");
		handleCondition("checkbox__feedback", true, "is-invalid");
	}
};

/*
 ********************************** SUBMIT ***********************************
 *****************************************************************************
 * Al pulsar este bot??n se comprobar?? que todos los datos son requeridos y que
 * los datos son correctos seg??n lo establecido en las expresiones regulares y
 * en las especificaciones del ejercicio.
 *****************************************************************************
 * El aviso de datos incorrectos se realizar??n en el span correspondiente al
 * dato y se cambiar?? el fondo de la caja de texto al color amarillo. 
 *****************************************************************************
 * Si todos los datos son correctos, mostrarlos en una ventana modal y pedir
 * confirmaci??n de env??o. 
 */
const handleSubmit = (inputs, modal) => {
	console.log(Object.values(inputs).every((i) => i !== null && i !== ""));
	if (
		document.getElementsByClassName("is-invalid").length === 0 &&
		// Comprobaci??n de que ning??n elemento es nulo o vac??o
		Object.values(inputs).every((i) => i.value !== null && i.value !== "")
	) {
		modal.style.display = "block"; // Despliega el modal
		handleCondition("form__feedback", true, "d-none");
		// Rellenar cuerpo del modal
		for (const [key, element] of Object.entries(inputs)) {
			const node = document.createElement("p");
			node.innerHTML = `<strong>${element.labels[0].innerText}</strong>: ${element.value}`;
			document.getElementById("modal__body").appendChild(node);
		}
	} else {
		handleCondition("form__feedback", false, "d-none");
	}
};