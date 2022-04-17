let searchMenu;
window.addEventListener('click', (e) => {
    searchMenu.innerHTML = '';
});

window.addEventListener('DOMContentLoaded', () => {
    searchMenu = document.getElementById('search-menu-container');
    const searchInput = document.getElementById('search-input');

    if(searchMenu) {
        searchMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    
        let ref;
        searchInput.addEventListener('input', (e) => {
            if(ref) {
                clearTimeout(ref);
            }
    
            ref = setTimeout(async () => {
                try {
                    const userList = await axios.get('/users/search/' + e.target.value);
                    searchMenu.innerHTML = userList.data;
                } catch(e) {
                    console.log(e);
                }
            }, 2000);
        })
    }

})