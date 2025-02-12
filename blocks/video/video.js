function displayVideo(link) {
    const embedLink = link;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', embedLink);
    const videoDiv = document.querySelector('.video');
    videoDiv.innerHTML = '';
    videoDiv.appendChild(iframe);
}
const driveLink = 'https://drive.google.com/drive/folders/19Xv6TtAbd8VeOTriseXUIbVG9E9W1q8u/preview';
displayVideo(driveLink);