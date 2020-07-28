// const formatNumber = number => new Intl.NumberFormat().format(number)

const formatCurrency = (number: number) => {
	if (number >= 0) {
		return "$" + formatNumber(Math.abs(number).toFixed(2));
	}
	else {
		return "-$" + formatNumber(Math.abs(number).toFixed(2));
	}
}

const formatNumber = (number: string) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const formatCurrencyToFixed = (number: number) => {
	if (number >= 0) {
		return formatNumber(Math.abs(number).toFixed(2));
	}
	else {
		return formatNumber(Math.abs(number).toFixed(2));
	}
}

export {
	formatCurrency,
	formatNumber, 
	formatCurrencyToFixed
}