function formatMoney(amount) {
	const billion = 1000000000;
	const million = 1000000;

	// Hàm định dạng số với dấu chấm làm phân cách phần thập phân và dấu phẩy làm phân cách hàng nghìn
	const formatNumber = (number) => {
		return number
			.toLocaleString("vi-VN", {
				minimumFractionDigits: 0,
				maximumFractionDigits: 2,
			})
			.replace(/,/g, ".");
	};

	if (amount >= billion) {
		return formatNumber(amount / billion) + " tỷ";
	} else if (amount >= million) {
		return formatNumber(amount / million) + " triệu";
	} else {
		return formatNumber(amount);
	}
}

export default formatMoney;
