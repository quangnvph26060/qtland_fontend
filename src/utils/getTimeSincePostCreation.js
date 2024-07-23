/**
 * Hàm trả về thời gian kể từ khi bài viết được tạo
 * @param {string} postTimestamp Thời gian tạo bài viết
 * @return {string} Thời gian kể từ khi bài viết được tạo
 * CreatedBy: youngbachhh (02/04/2024)
 */
function getTimeSincePostCreation(postTimestamp, detail = false) {
	const now = new Date();
	const postDate = new Date(postTimestamp);
	const timeDifference = now.getTime() - postDate.getTime();
	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) {
		if (days > 7 || detail)
			return postDate.toLocaleDateString("vi-VN", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
				separator: "/",
			});
		return `${days} ngày trước`;
	} else if (hours > 0) {
		return `${hours} giờ trước`;
	} else if (minutes > 0) {
		return `${minutes} phút trước`;
	} else {
		return `${seconds} giây trước`;
	}
}

export default getTimeSincePostCreation;
