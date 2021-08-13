import outsideClick from "./outsideclick.js";

export default function initDropdownMenu() {
    const dropdownMenus = document.querySelectorAll('[data-dropdown]');

    //Adicionando os eventos de click e touchstart para cada elemento de dropdownMenus
    dropdownMenus.forEach(menu => {
        ['touchstart','click'].forEach(userEvent => {
            menu.addEventListener(userEvent, handleClick)
        });
    });
    

    //funçao que ativa a cada click em algum elemento de dropdownMenus
    function handleClick (event) {
        event.preventDefault();

        //adicionando a classe ativo ao item clicado
        this.classList.add('active')

        outsideClick(this, ['touchstart','click'], () => {
            this.classList.remove('active')
        })
    }
}    

