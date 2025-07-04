document.addEventListener('DOMContentLoaded', function() {
  // 初始化元素
  const tracker = document.querySelector('.time-tracker');
  if (!tracker) return;

  const STORAGE_KEY = 'japanese-study-progress';
  const totalHours = parseInt(tracker.dataset.total) || 600;
  let completed = parseInt(tracker.dataset.completed) || 0;
  const gridContainer = tracker.querySelector('.grid-container');
  const hourDisplay = tracker.querySelector('.hours');
  const updateTime = tracker.querySelector('.update-time');
  const addButton = tracker.querySelector('.add-hour');
  const undoButton = tracker.querySelector('.undo-hour');
  const resetButton = tracker.querySelector('.reset-all');

  // 操作历史记录
  let history = [];
  const MAX_HISTORY = 20;

  // 渲染格子
  function renderGrid() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < totalHours; i++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell' + (i < completed ? ' filled' : '');
      gridContainer.appendChild(cell);
    }
    hourDisplay.textContent = `${completed}/${totalHours}`;
    updateButtonStates();
  }

  // 更新按钮状态
  function updateButtonStates() {
    addButton.disabled = completed >= totalHours;
    undoButton.disabled = completed <= 0;
  }

  // 保存进度
  function saveProgress() {
    const data = {
      completed: completed,
      timestamp: new Date().toISOString(),
      history: history.slice(-MAX_HISTORY)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    updateTime.textContent = new Date().toLocaleString();
  }

  // 加载进度
  function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        completed = Math.min(data.completed, totalHours);
        history = data.history || [];
        updateTime.textContent = new Date(data.timestamp).toLocaleString();
      } catch (e) {
        console.error('解析存储数据失败:', e);
      }
    }
    renderGrid();
  }

  // 显示确认对话框
  function showConfirm(message, callback) {
    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.innerHTML = `
      <p>${message}</p>
      <div class="confirm-buttons">
        <button class="cancel-btn">取消</button>
        <button class="confirm-btn">确认</button>
      </div>
    `;
    
    document.body.appendChild(dialog);
    
    dialog.querySelector('.cancel-btn').onclick = function() {
      document.body.removeChild(dialog);
    };
    
    dialog.querySelector('.confirm-btn').onclick = function() {
      callback();
      document.body.removeChild(dialog);
    };
  }

  // 事件监听
  addButton.addEventListener('click', function() {
    if (completed < totalHours) {
      history.push(completed);
      completed++;
      renderGrid();
      saveProgress();
    }
  });

  undoButton.addEventListener('click', function() {
    if (history.length > 0) {
      completed = history.pop();
      renderGrid();
      saveProgress();
    }
  });

  resetButton.addEventListener('click', function() {
    showConfirm('确定要重置所有进度吗？', function() {
      history = [];
      completed = 0;
      renderGrid();
      saveProgress();
    });
  });

  // 初始化
  loadProgress();
});