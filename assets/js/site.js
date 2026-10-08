const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#primary-navigation');
const setMenu = (open) => {
  menu.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
};
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    setMenu(false);
    menuButton.focus();
  }
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
const links = [...menu.querySelectorAll('a[href^="#"]')];
const targets = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
const updateActiveSection = () => {
  let active = targets[0];
  for (const target of targets) if (target.getBoundingClientRect().top <= 160) active = target;
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = targets.at(-1);
  links.forEach(link => {
    if (link.hash === `#${active?.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};
window.addEventListener('scroll', updateActiveSection, { passive: true });
window.addEventListener('resize', updateActiveSection);
updateActiveSection();
