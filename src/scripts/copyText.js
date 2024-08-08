// const copyText = async (text) => {
//     try {
//         await navigator.clipboard.writeText(text);
//     } catch ($e) {}
// };

// export default copyText;
const copyCurrentPageUrl = async () => {
    try {
        const currentUrl = window.location.href;
        await navigator.clipboard.writeText(currentUrl);
        console.log('URL đã được sao chép vào clipboard:', currentUrl);
    } catch (error) {
        console.error('Không thể sao chép URL:', error);
    }
};

export default copyCurrentPageUrl;

