function formatDateOnly(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    // Lấy thông tin ngày, tháng, năm
    const date = dateTime.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

   

    return `${date}`;
}

export default formatDateOnly;
