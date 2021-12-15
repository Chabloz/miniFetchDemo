// listen to click on the body of the web page
document.querySelector('body').addEventListener('click' , async evt => {
  // if this is not a link, we skip it
  const link = evt.target;
  if (link.tagName !== 'A') return;
  // if this link is absolute we skip it
  let href = link.getAttribute('href');
  if (href.startsWith('http://') || href.startsWith('https://')) return;
  // disable the default behaviour of the link
  evt.preventDefault();
  await loadPage(href);
  // push it to the location
  history.pushState(null, null, href);
});

// listen to history page change
window.addEventListener('popstate', async evt => {
  await loadPage(window.location);
});

async function loadPage(href) {
  // make the fetch ourself
  const response = await fetch(href);
  const page =  await response.text();
  // Convert it into a DOM
  const parser = new DOMParser();
  const dom = parser.parseFromString(page, 'text/html');
  // take the main part
  const main = dom.querySelector('main');
  // inject it in the current page
  document.querySelector('main').innerHTML = main.innerHTML;
}
