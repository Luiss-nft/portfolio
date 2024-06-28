const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
  
    // Toggle nav
    burger.addEventListener('click', () => {
      // Toggle nav-active class to show/hide nav-links
      nav.classList.toggle('nav-active');
  
      // Animate nav-links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = navLinkFade; 0.5 ,ease ,forwards, $;{index / 7 + 0.5}s;
        }
      });
  
      // Toggle burger animation
      burger.classList.toggle('toggle');
    });
  }
  
  navSlide();

  const btn = document.querySelector('.btn');
    const container = document.querySelector('body');
    const body = document.querySelector('p');
    const botao2 = document.querySelector('.botao2')
    const h1 = document.querySelector('h1')
    const h3 = document.querySelector('h3')
    btn.onclick = function()

    {
      this.classList.toggle('active')
      container.classList.toggle('active')
      body.classList.toggle('active')
     botao2.classList.toggle('active')
     h1.classList.toggle('active')
     h3.classList.toggle('active')
    }
  