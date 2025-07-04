// 弹出剧照大图
document.querySelectorAll('.ljs-movie-thumbs img, .ljs-swim-images img, .games img').forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.className = 'ljs-overlay';
    overlay.innerHTML = `<img src="${img.src}" alt="preview">`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => overlay.remove());
  });
});

// 图片 alt 作为悬浮提示
document.querySelectorAll('img').forEach(img => {
  if (img.alt) {
    img.style.cursor = 'help';
    img.title = img.alt;
  }
});
