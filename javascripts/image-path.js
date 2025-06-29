// docs/javascripts/image-path.js
document.addEventListener('DOMContentLoaded', function() {
  const isLocal = window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1';

  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    
    // 只处理本地图片且包含/pic/的路径
    if (src && !src.startsWith('http') && src.includes('pic/')) {
      // 计算基础路径（开发环境与生产环境不同）
      const base = isLocal ? '' : '/your-repo-name/'; // 如果是GitHub Pages需设置
      const depth = window.location.pathname.split('/').length - 2;
      const prefix = depth > 0 ? '../'.repeat(depth) : './';
      
      // 提取纯净文件名
      const filename = src.split('/pic/').pop();
      img.src = `${base}${prefix}pic/${filename}`;
    }
  });
});