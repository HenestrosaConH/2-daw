"use strict"

var from = $("#booking__from");
var to = $("#booking__to");
var unavailableDates;

$(function () {
	// All the buttons' IDs for booking a car end with '__button'
	$("[id*='__button']").on("click", e => {
		fillHiddenInputs(e.currentTarget.id);
		getAvailability();
	});
	from.on("change", () => checkDate(from.val(), to.val()));
	to.on("change", () => checkDate(from.val(), to.val()));
	$("#booking__submit").on("click", () => checkFields(from.val(), to.val())); 
});

const fillHiddenInputs = id => {
	const carId = id.split("__");
	$("#booking__car_id").val(carId[0]);
}

const getAvailability = () => {
	const data = { "car_id_to_check": $("#booking__car_id").val() };
	$.post("./php/get_unavailable_dates.php", data, (response) => {
		createDatepicker(from, response);
		createDatepicker(to, response);
		unavailableDates = response;
	});
}

const createDatepicker = (element, unavailableDates) => {
	if (element.data("datepicker") != null) {
		element.datepicker("destroy")
	}
	console.log(unavailableDates);
	element.datepicker({
		dateFormat: "yy-mm-dd",
		changeMonth: true,
		changeYear: true,
		minDate: getMinDate(),
		maxDate: "+5Y",
		beforeShowDay: function (date) {
			var string = jQuery.datepicker.formatDate("yy-mm-dd", date);
			return [unavailableDates.indexOf(string) == -1]
		},
		beforeShow: function () {
			element.css({
				"position": "relative",
				"z-index": 999999999
			});
		},
		onClose: function () { element.css({ "z-index": 0 }); }
	});
}

const getMinDate = () => {
	const today = new Date();

	const month = today.getMonth() + 1;
	const day = today.getDate();
	const year = today.getFullYear();
	if (month < 10)
		month = '0' + month.toString();
	if (day < 10)
		day = '0' + day.toString();

	return year + '-' + month + '-' + day;
}

const checkDate = (from, to) => {
	if (from > to && (from.length > 0 && to.length > 0)) {
		alert("La fecha final no puede ser anterior a la inicial de la reserva.");
		window.to.val('');
	}
}

const isPeriodAvailable = (from, to) => {
	for (let date = new Date(from); date <= new Date(to); date.setDate(date.getDate() + 1)) {
		const dateString = `${date.getUTCFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
		if (unavailableDates.includes(dateString)) {
			return false;
		}
	}
	return true;
};


const areDatesValid = (from, to) => (
	(from.length > 0 && to.length > 0)
	&& (from >= getMinDate() && to > getMinDate())
	&& (from <= to)
	&& isPeriodAvailable(from, to)
);

const checkFields = (from, to) => {
	if (areDatesValid(from, to)) {
		confirmBooking(from, to);
	} else {
		alert("Verifica las fechas.");
	}
}

const confirmBooking = (from, to) => {
	if (confirm(`Vas a realizar la reserva desde el ${from} hasta el ${to}. ¿Estás seguro?`)) {
		$("#booking__form").submit();
	} else {
		return false;
	}
}