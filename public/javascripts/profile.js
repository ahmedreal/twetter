window.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const inputFile = document.getElementById('inputFile');

    profileForm.addEventListener('click', (e) => {
        console.log('form');
        inputFile.click();
    });

    inputFile.addEventListener('change', (e) => {
        console.log('submit');
        profileForm.submit();
    })

})