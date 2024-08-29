import apiURL from "../src/api/constants.js"
document.addEventListener('DOMContentLoaded', function() {
    fetch(`${apiURL.baseURL}/config`)
        .then(response => response.json())
        .then(data => {
            console.log(data.data['title']);
            console.log(document.querySelector('meta[property="og:title"]'));
            
            document.querySelector('meta[property="og:title"]').setAttribute('content', data.data['title']);
            document.querySelector('meta[property="og:description"]').setAttribute('content', data.data['description']);
            document.querySelector('meta[property="og:url"]').setAttribute('content', apiURL.URL);
            document.querySelector('meta[property="og:site_name"]').setAttribute('content', apiURL.URL);
            document.querySelector('meta[property="og:type"]').setAttribute('content', data.data['title']);
            document.querySelector('link[rel="icon"]').setAttribute('href', data.data['icon']);
            // Cập nhật tiêu đề trang
            document.title = data.title;
        })
        .catch(error => console.error('Error fetching data:', error));
});
