---
title: 人类生存指南
comments: False
---

!!! note ""
    “每个人细究起来都蛮有意思，只是很少有被人仔细看见的机会，以至于被仔细看见这件事，有点近似于爱。”

## Coming of Age

<div class="encrypted-section" data-password="0610">
  <div class="prompt">
    <h3>Romance</h3><br/>
    <p>🔒 A simple bouquet of white tulips for you </p>
    <input type="password" class="pw-input" placeholder="输入访问密码">
    <button class="encrypt-btn md-button">解锁内容</button>
    <p class="error-msg" style="color:red;display:none;margin-top:0.5rem">密码错误！</p>
  </div>
  <!-- 预渲染的HTML内容 -->
  <div class="encrypted-content" style="display:none">
    <p>机密内容</p>
    <ul>
      <li>项目路线图</li>
      <li>核心算法代码</li>
      <li>财务数据</li>
    </ul>
  </div>
</div>

<script>
document.querySelectorAll('.encrypt-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const container = this.closest('.encrypted-section');
    const input = container.querySelector('.pw-input');
    const content = container.querySelector('.encrypted-content');
    const errorMsg = container.querySelector('.error-msg');
    
    if(input.value.trim() === container.dataset.password) {
      content.style.display = 'block';
      container.querySelector('.prompt').style.display = 'none';
      errorMsg.style.display = 'none';
    } else {
      input.style.borderColor = 'red';
      errorMsg.style.display = 'block';
      setTimeout(() => {
        input.value = '';
        input.style.borderColor = '';
      }, 1000);
    }
  });
});
</script>

  ### Gloom


## Recording  