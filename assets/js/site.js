(() => {
  const initLightbox = () => {
    const links = Array.from(document.querySelectorAll('[data-fancybox]'));
    if (!links.length) return;

    const groups = new Map();
    for (const link of links) {
      const name = link.getAttribute('data-fancybox') || '__default__';
      if (!groups.has(name)) groups.set(name, []);
      groups.get(name).push(link);
    }

    const style = document.createElement('style');
    style.textContent = `
      .dtkr-lightbox[hidden] { display: none; }
      .dtkr-lightbox {
        position: fixed; inset: 0; z-index: 2000; display: flex; align-items: center; justify-content: center;
        background: rgba(0,0,0,.92); padding: 24px;
      }
      .dtkr-lightbox__frame { position: relative; display: flex; align-items: center; justify-content: center; max-width: min(1200px, 100vw); max-height: 100vh; }
      .dtkr-lightbox__image { max-width: calc(100vw - 96px); max-height: calc(100vh - 96px); object-fit: contain; border: 2px solid #fff; background: #000; }
      .dtkr-lightbox__button {
        position: absolute; border: 2px solid #fff; background: rgba(0,0,0,.6); color: #fff; cursor: pointer;
        font: inherit; line-height: 1; padding: 10px 14px; user-select: none;
      }
      .dtkr-lightbox__button:hover { border-color: #ffff00; color: #ffff00; }
      .dtkr-lightbox__close { top: -52px; right: 0; }
      .dtkr-lightbox__prev { left: -64px; top: 50%; transform: translateY(-50%); }
      .dtkr-lightbox__next { right: -64px; top: 50%; transform: translateY(-50%); }
      @media (max-width: 768px) {
        .dtkr-lightbox { padding: 12px; }
        .dtkr-lightbox__image { max-width: calc(100vw - 24px); max-height: calc(100vh - 88px); }
        .dtkr-lightbox__close { top: -44px; right: 0; }
        .dtkr-lightbox__prev { left: 8px; }
        .dtkr-lightbox__next { right: 8px; }
      }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.className = 'dtkr-lightbox';
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="dtkr-lightbox__frame" role="dialog" aria-modal="true" aria-label="Image viewer">
        <button type="button" class="dtkr-lightbox__button dtkr-lightbox__close" aria-label="Close">×</button>
        <button type="button" class="dtkr-lightbox__button dtkr-lightbox__prev" aria-label="Previous">‹</button>
        <img class="dtkr-lightbox__image" alt="" />
        <button type="button" class="dtkr-lightbox__button dtkr-lightbox__next" aria-label="Next">›</button>
      </div>`;
    document.body.appendChild(overlay);

    const image = overlay.querySelector('.dtkr-lightbox__image');
    const prev = overlay.querySelector('.dtkr-lightbox__prev');
    const next = overlay.querySelector('.dtkr-lightbox__next');
    const close = overlay.querySelector('.dtkr-lightbox__close');
    let currentGroup = [];
    let currentIndex = 0;
    let lastOverflow = '';

    const render = () => {
      const link = currentGroup[currentIndex];
      const preview = link.querySelector('img');
      image.src = link.href;
      image.alt = preview ? preview.alt || '' : '';
      prev.hidden = currentGroup.length <= 1;
      next.hidden = currentGroup.length <= 1;
    };

    const open = (group, index) => {
      currentGroup = group;
      currentIndex = index;
      render();
      lastOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      overlay.hidden = false;
    };

    const closeLightbox = () => {
      overlay.hidden = true;
      image.removeAttribute('src');
      document.body.style.overflow = lastOverflow;
    };

    const move = (delta) => {
      currentIndex = (currentIndex + delta + currentGroup.length) % currentGroup.length;
      render();
    };

    links.forEach((link) => {
      const group = groups.get(link.getAttribute('data-fancybox') || '__default__');
      link.addEventListener('click', (event) => {
        event.preventDefault();
        open(group, group.indexOf(link));
      });
    });

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeLightbox();
    });
    close.addEventListener('click', closeLightbox);
    prev.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    document.addEventListener('keydown', (event) => {
      if (overlay.hidden) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft' && currentGroup.length > 1) move(-1);
      if (event.key === 'ArrowRight' && currentGroup.length > 1) move(1);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox, { once: true });
  } else {
    initLightbox();
  }
})();