export default function initTabNav() {
    const tabMenu = document.querySelectorAll('[data-tabMenu = js-tabmenu] li')
    const tabContent = document.querySelectorAll('[data-tabContent="js-tabcontent"] section')
    
    if (tabMenu.length && tabContent.length) {
        tabContent[0].classList.add('ativo');
    
        function activeTab(index) {
            tabContent.forEach(section => {
                section.classList.remove('ativo')
            });
            tabContent[index].classList.add('ativo');
        }
    
        tabMenu.forEach((itemMenu, index) => {
            itemMenu.addEventListener('click', () => {
                activeTab(index)
            })
        })
    }
}