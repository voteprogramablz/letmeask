export default function initScrollAnimation() {
    //Selecting all the elements which have the class 'js-scroll'
    const sections = document.querySelectorAll('[data-scroll="js-scroll"]')
    //If "sections const" catch any element the function will continue
    if(sections.length) {
        const halfOfWindow = window.innerHeight * 0.6;
        
        function showElementsOnScroll() {
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top
                const isSectionVisible = (sectionTop - halfOfWindow) < 0;
                
                if(isSectionVisible){
                    section.classList.add('ativo')
                } else if (section.classList.contains('ativo')){
                    section.classList.remove('ativo')
                }
            })
        }
        showElementsOnScroll()
        window.addEventListener('scroll', showElementsOnScroll)
    }
}