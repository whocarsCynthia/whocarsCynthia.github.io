function toggleContent(btn) {
  const content = btn.closest('.admonition').querySelector('.content');
  const isOpen = !content.style.maxHeight;

  if (isOpen) {
    content.style.maxHeight = content.scrollHeight + 'px';
    btn.textContent = '▼'; // 展开状态
  } else {
    content.style.maxHeight = '0';
    btn.textContent = '▶'; // 折叠状态
  }
}

// 初始化所有内容块，默认展开并设置按钮状态
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.md-typeset .content').forEach(content => {
    content.style.maxHeight = content.scrollHeight + 'px';

    // 查找对应的按钮并设置初始图标为 ▼
    const btn = content.nextElementSibling;
    if (btn && btn.classList.contains('toggle-btn')) {
      btn.textContent = '▼';
    }
  });
});