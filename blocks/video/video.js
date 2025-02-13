function displayVideo(link) {
    const embedLink = link;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', embedLink);
    const videoDiv = document.querySelector('.video');
    videoDiv.innerHTML = '';
    videoDiv.appendChild(iframe);
    
}
const driveLink = 'https://drive.google.com/file/d/1iAmXjtIhlToViffRG1lXzplGt_3erSmp/preview';
displayVideo(driveLink);
// https://drive.google.com/file/d/1iAmXjtIhlToViffRG1lXzplGt_3erSmp/view?usp=drive_link