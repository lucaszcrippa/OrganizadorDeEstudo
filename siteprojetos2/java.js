document.addEventListener('DOMContentLoaded', () => {
    // 1. Efeito de Transformação do Header ao Rolar (Scroll)

    const header = document.getElementById('main-header');
    const heroSection = document.getElementById('hero');

    /**
     * Verifica a posição de rolagem e altera o estilo do cabeçalho.
     */
    const checkScroll = () => {
        // Pega a altura da seção hero
        const heroHeight = heroSection.offsetHeight;
        // Pega todos os links da navegação
        const navLinks = header.querySelectorAll('nav ul li a');

        // Adiciona estilo de fundo ROXO ao rolar para fora da seção hero (altura - 50px de margem)
        if (window.scrollY > heroHeight - 50) {
            header.style.backgroundColor = '#5B48CC'; // Roxo
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            
            // Mudar cor do texto para Branco
            navLinks.forEach(link => {
                link.style.color = '#FFFFFF';
            });
        } else {
            // Volta para o estado inicial: Fundo Branco
            header.style.backgroundColor = '#FFFFFF';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';

            // Mudar cor do texto para o padrão (preto/cinza)
            navLinks.forEach(link => {
                link.style.color = '#333'; // Cor padrão do CSS da Landing Page
            });
        }
    };

    // Executa a verificação na rolagem da página
    window.addEventListener('scroll', checkScroll);

    // Executa a verificação uma vez ao carregar a página
    checkScroll();

    // 2. Efeito de "Scroll Suave" para os links internos

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Rola até a seção com o ID correspondente
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth' // Rola suavemente
            });
        });
    });
});