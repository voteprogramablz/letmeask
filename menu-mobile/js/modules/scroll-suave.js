export default function initScrollSuave () {

    const linksInternos = document.querySelectorAll('[data-menu="js-menu"] a[href^="#"]');
    
    function scrollToSection(event)  {
        event.preventDefault()
        const href = this.getAttribute('href')
        const section = document.querySelector(href)
        const topo = section.offsetTop
        
        // // forma alternativa
        // window.scrollTo({
            //     top: topo,
            //     behavior: "smooth"
            // })
            
            section.scrollIntoView({
                behavior: "smooth",
                block: 'start',
            });
            
        }
        
        linksInternos.forEach(link => {
            link.addEventListener('click', scrollToSection);
        })
}