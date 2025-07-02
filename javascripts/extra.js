// 在load-discussions.js开头添加
const CACHE_KEY = 'discussions_cache';
const CACHE_TIME = 60 * 60 * 1000; // 1小时缓存

const cachedData = localStorage.getItem(CACHE_KEY);
if (cachedData && Date.now() - JSON.parse(cachedData).timestamp < CACHE_TIME) {
  renderDiscussions(JSON.parse(cachedData).data);
  return;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('discussions-container');
  
  // Material主题适配的加载动画
  container.innerHTML = `
    <div class="md-typeset">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`;

  fetch('https://api.github.com/repos/whocarsCynthia/whocarsCynthia.github.io/discussions?category=reviews')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(discussions => {
      let html = '';
      discussions.forEach(d => {
        // 提取专业名称（从标题或正文）
        const major = d.title.replace('[专业]', '').trim();
        const content = d.body.split('*代号*：')[1]?.trim() || '无具体内容';
        
        html += `
          <div class="review-card md-typeset">
            <h3>${major}</h3>
            <blockquote>
              <p>${content}</p>
              <footer>
                <small>匿名评价 · ${new Date(d.created_at).toLocaleDateString()}</small>
              </footer>
            </blockquote>
          </div>`;
      });
      container.innerHTML = html || '<p>暂无评价，快来成为第一个评论者吧！</p>';
    })
    .catch(error => {
      container.innerHTML = `<p class="error">加载失败: ${error.message}</p>`;
    });
});