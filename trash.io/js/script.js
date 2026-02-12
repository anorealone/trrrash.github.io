// ========== trash.io - ЧЕРНО-ФИОЛЕТОВАЯ ПИКСЕЛЬ-СЕТЬ ==========

// ===== ДАННЫЕ ПОЛЬЗОВАТЕЛЯ =====
const userData = {
  nick: '@trash_io_user',
  avatar: 'fas fa-user-astronaut',
  blurEnabled: true
};

// ===== БАЗА АВАТАРОК =====
const avatars = [
  'fas fa-user-astronaut', 'fas fa-skull', 'fas fa-robot', 
  'fas fa-dragon', 'fas fa-cat', 'fas fa-ghost', 
  'fas fa-gamepad', 'fas fa-cube', 'fas fa-rocket', 
  'fas fa-camera', 'fas fa-music', 'fas fa-heart',
  'fas fa-crown', 'fas fa-robot', 'fas fa-ghost'
];

// ========== 1. ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', function() {
  console.log('🔥 trash.io ЗАГРУЖЕН - script.js:21');
  
  initTheme();
  initTabs();
  initLikes();
  initViews();
  initSpoilers();
  initProfileEditing();
  initSettings();
  initFooter();
  initClickInstructions();
});

// ========== 2. ТЕМЫ (ЧЕРНАЯ/БЕЛАЯ) ==========
function initTheme() {
  const darkBtn = document.getElementById('theme-dark');
  const lightBtn = document.getElementById('theme-light');
  
  if (!darkBtn || !lightBtn) return;
  
  darkBtn.addEventListener('click', function() {
    document.body.classList.remove('white-theme');
    darkBtn.classList.add('active');
    lightBtn.classList.remove('active');
  });
  
  lightBtn.addEventListener('click', function() {
    document.body.classList.add('white-theme');
    lightBtn.classList.add('active');
    darkBtn.classList.remove('active');
  });
}

// ========== 3. ВКЛАДКИ ==========
function initTabs() {
  const tab1Btn = document.getElementById('tab1-btn');
  const tab2Btn = document.getElementById('tab2-btn');
  const tab3Btn = document.getElementById('tab3-btn');
  const tab1 = document.getElementById('tab1');
  const tab2 = document.getElementById('tab2');
  const tab3 = document.getElementById('tab3');
  
  if (!tab1Btn || !tab2Btn || !tab3Btn) return;
  
  window.activateTab = function(tabId) {
    tab1.classList.remove('active');
    tab2.classList.remove('active');
    tab3.classList.remove('active');
    tab1Btn.classList.remove('active');
    tab2Btn.classList.remove('active');
    tab3Btn.classList.remove('active');
    
    if (tabId === 1) {
      tab1.classList.add('active');
      tab1Btn.classList.add('active');
    } else if (tabId === 2) {
      tab2.classList.add('active');
      tab2Btn.classList.add('active');
    } else if (tabId === 3) {
      tab3.classList.add('active');
      tab3Btn.classList.add('active');
    }
  };
  
  tab1Btn.addEventListener('click', function() { activateTab(1); });
  tab2Btn.addEventListener('click', function() { activateTab(2); });
  tab3Btn.addEventListener('click', function() { activateTab(3); });
}

// ========== 4. ЛАЙКИ ==========
function initLikes() {
  document.addEventListener('click', function(e) {
    const likeBtn = e.target.closest('.like-btn');
    if (!likeBtn) return;
    
    e.preventDefault();
    likeBtn.classList.toggle('liked');
    
    const likesSpan = likeBtn.querySelector('.likes-count');
    if (likesSpan) {
      let value = parseInt(likesSpan.textContent) || 0;
      
      if (likeBtn.classList.contains('liked')) {
        value += 1;
      } else {
        value -= 1;
      }
      
      likesSpan.textContent = value;
    }
  });
}

// ========== 5. ПРОСМОТРЫ ==========
function initViews() {
  function increaseViews() {
    document.querySelectorAll('.views-count').forEach(view => {
      let value = parseInt(view.textContent) || 0;
      value += Math.floor(Math.random() * 3) + 1;
      view.textContent = value;
    });
  }
  
  increaseViews();
  
  document.querySelectorAll('.tabs button').forEach(btn => {
    btn.addEventListener('click', increaseViews);
  });
  
  document.addEventListener('click', function(e) {
    if (e.target.closest('.post-media')) {
      const viewsSpan = e.target.closest('.post-card, .friend-post')?.querySelector('.views-count');
      if (viewsSpan) {
        let value = parseInt(viewsSpan.textContent) || 0;
        viewsSpan.textContent = value + 1;
      }
    }
  });
}

// ========== 6. СПОЙЛЕРЫ ==========
function initSpoilers() {
  applySpoilers();
  
  document.addEventListener('click', function(e) {
    const blurred = e.target.closest('.post-media.blurred');
    if (blurred) {
      blurred.classList.remove('blurred');
    }
  });
}

function applySpoilers() {
  document.querySelectorAll('.post-card, .friend-post').forEach((post, index) => {
    if (index % 2 === 0 && userData.blurEnabled) {
      const media = post.querySelector('.post-media');
      if (media) media.classList.add('blurred');
    } else {
      const media = post.querySelector('.post-media');
      if (media) media.classList.remove('blurred');
    }
  });
}

// ========== 7. РЕДАКТИРОВАНИЕ ПРОФИЛЯ ==========
function initProfileEditing() {
  const editBtn = document.getElementById('edit-profile-btn');
  if (editBtn) {
    editBtn.addEventListener('click', function() {
      openProfileModal();
    });
  }
  
  document.addEventListener('click', function(e) {
    if (e.target.closest('.big-avatar') || e.target.closest('.user-avatar')) {
      openAvatarModal();
    }
  });
  
  document.addEventListener('click', function(e) {
    const nick = e.target.closest('.nick');
    if (nick && (nick.classList.contains('user-nick') || nick.textContent.includes('@trash_io_user'))) {
      openNickModal();
    }
  });
  
  createModals();
}

// ========== 8. МОДАЛКИ ==========
function createModals() {
  createProfileModal();
  createNickModal();
  createAvatarModal();
}

function createProfileModal() {
  if (document.getElementById('profile-modal')) return;
  
  const modal = document.createElement('div');
  modal.id = 'profile-modal';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h3 class="modal-title"><i class="fas fa-cog"></i> РЕДАКТОР</h3>
      <button id="modal-change-nick" class="modal-btn" style="width: 100%; margin-bottom: 15px; padding: 18px;">
        <i class="fas fa-tag"></i> СМЕНИТЬ НИК
      </button>
      <button id="modal-change-avatar" class="modal-btn" style="width: 100%; margin-bottom: 15px; padding: 18px;">
        <i class="fas fa-camera"></i> СМЕНИТЬ АВАТАРКУ
      </button>
      <button id="modal-close" class="modal-btn" style="width: 100%; padding: 18px;">
        <i class="fas fa-times"></i> ЗАКРЫТЬ
      </button>
    </div>
  `;
  document.body.appendChild(modal);
  
  document.getElementById('modal-change-nick').addEventListener('click', function() {
    document.getElementById('profile-modal').classList.remove('active');
    openNickModal();
  });
  
  document.getElementById('modal-change-avatar').addEventListener('click', function() {
    document.getElementById('profile-modal').classList.remove('active');
    openAvatarModal();
  });
  
  document.getElementById('modal-close').addEventListener('click', function() {
    document.getElementById('profile-modal').classList.remove('active');
  });
}

function createNickModal() {
  if (document.getElementById('nick-modal')) return;
  
  const modal = document.createElement('div');
  modal.id = 'nick-modal';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h3 class="modal-title"><i class="fas fa-tag"></i> СМЕНИТЬ НИК</h3>
      <input type="text" id="new-nick" class="modal-input" value="${userData.nick}" placeholder="ВВЕДИ НИК">
      <div style="display: flex; gap: 15px;">
        <button id="save-nick" class="modal-btn" style="flex: 1; padding: 15px;">
          <i class="fas fa-check"></i> СОХРАНИТЬ
        </button>
        <button id="cancel-nick" class="modal-btn" style="flex: 1; padding: 15px;">
          <i class="fas fa-times"></i> ОТМЕНА
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  document.getElementById('save-nick').addEventListener('click', function() {
    const newNick = document.getElementById('new-nick').value;
    if (newNick.trim()) {
      userData.nick = newNick;
      
      document.querySelectorAll('.user-nick, #profile-nick, .nick').forEach(el => {
        if (el.textContent.includes('@trash_io_user') || el.classList.contains('user-nick')) {
          el.textContent = userData.nick;
        }
      });
    }
    modal.classList.remove('active');
  });
  
  document.getElementById('cancel-nick').addEventListener('click', function() {
    modal.classList.remove('active');
  });
}

function createAvatarModal() {
  if (document.getElementById('avatar-modal')) return;
  
  const modal = document.createElement('div');
  modal.id = 'avatar-modal';
  modal.className = 'modal';
  
  let grid = '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 25px;">';
  avatars.forEach(icon => {
    grid += `<div class="avatar-option">
      <i class="${icon}"></i>
    </div>`;
  });
  grid += '</div>';
  
  modal.innerHTML = `
    <div class="modal-content">
      <h3 class="modal-title"><i class="fas fa-camera"></i> ВЫБЕРИ АВАТАРКУ</h3>
      ${grid}
      <button id="cancel-avatar" class="modal-btn" style="width: 100%; padding: 18px;">
        <i class="fas fa-times"></i> ОТМЕНА
      </button>
    </div>
  `;
  document.body.appendChild(modal);
  
  modal.querySelectorAll('.avatar-option').forEach(opt => {
    opt.addEventListener('click', function() {
      const icon = this.querySelector('i').className;
      userData.avatar = icon;
      
      document.querySelectorAll('.big-avatar i, .user-avatar i').forEach(el => {
        el.className = icon;
      });
      
      modal.classList.remove('active');
    });
  });
  
  document.getElementById('cancel-avatar').addEventListener('click', function() {
    modal.classList.remove('active');
  });
}

function openProfileModal() {
  const modal = document.getElementById('profile-modal');
  if (modal) modal.classList.add('active');
}

function openNickModal() {
  const modal = document.getElementById('nick-modal');
  const input = document.getElementById('new-nick');
  if (input) input.value = userData.nick;
  if (modal) modal.classList.add('active');
}

function openAvatarModal() {
  const modal = document.getElementById('avatar-modal');
  if (modal) modal.classList.add('active');
}

// ========== 9. НАСТРОЙКИ ==========
function initSettings() {
  if (document.getElementById('settings-panel')) return;
  
  const container = document.querySelector('.pixel-container');
  const panel = document.createElement('div');
  panel.id = 'settings-panel';
  panel.className = 'settings-panel';
  panel.innerHTML = `
    <h3 class="settings-title"><i class="fas fa-cog"></i> НАСТРОЙКИ</h3>
    <div class="setting-item">
      <div id="blur-toggle" class="pixel-checkbox ${userData.blurEnabled ? 'checked' : ''}"></div>
      <span style="font-size: 11px; color: #d8b4fe; text-shadow: 2px 2px 0 #4c1d95;">
        🔮 ВКЛЮЧИТЬ СПОЙЛЕРЫ
      </span>
    </div>
  `;
  
  const tabs = document.querySelector('.tabs');
  if (tabs) {
    tabs.parentNode.insertBefore(panel, tabs.nextSibling);
  }
  
  const toggle = document.getElementById('blur-toggle');
  if (toggle) {
    toggle.addEventListener('click', function() {
      this.classList.toggle('checked');
      userData.blurEnabled = this.classList.contains('checked');
      applySpoilers();
    });
  }
}

// ========== 10. ФУТЕР ==========
function initFooter() {
  if (document.querySelector('.footer')) return;
  
  const container = document.querySelector('.pixel-container');
  const footer = document.createElement('div');
  footer.className = 'footer';
  footer.innerHTML = `
    <h4 class="social-title"><i class="fas fa-share-alt"></i> НАШИ СОЦ. СЕТИ</h4>
    <div class="social-links">
      <a href="https://t.me/trash_io" class="social-link" target="_blank">
        <i class="fab fa-telegram"></i> TELEGRAM
      </a>
      <a href="https://discord.gg/trashio" class="social-link" target="_blank">
        <i class="fab fa-discord"></i> DISCORD
      </a>
      <a href="https://twitter.com/trash_io" class="social-link" target="_blank">
        <i class="fab fa-twitter"></i> TWITTER
      </a>
    </div>
    <p style="margin-top: 25px; font-size: 8px; color: #a855f7; text-shadow: 2px 2px 0 #2d1b3c;">
      🔮 КЛИКНИ ПО АВАТАРКЕ ИЛИ НИКУ ЧТОБЫ ИЗМЕНИТЬ
    </p>
  `;
  
  container.appendChild(footer);
}

// ========== 11. ИНСТРУКЦИИ ==========
function initClickInstructions() {
  console.log('✅ ТЫК: Аватарка/Ник = редактор - script.js:399');
}

// ========== 12. СОХРАНЕНИЕ СОСТОЯНИЯ ==========
window.addEventListener('load', function() {
  console.log('🎮 trash.io ГОТОВ К РАБОТЕ - script.js:404');
});