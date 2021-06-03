import CoordsValidator from './coordsValidator';

export default class Blog {
  constructor() {
    this.storage = JSON.parse(window.localStorage.getItem('posts')) || [];
    if (this.storage.length) {
      this.posts = this.storage.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    this.container = document.createElement('div');
    this.container.id = 'container';
    document.body.appendChild(this.container);

    this.coordsValidator = new CoordsValidator();
  }

  showPost(p) {
    const post = document.createElement('div');
    post.className = 'post';
    const postDate = document.createElement('span');
    postDate.className = 'post-date';
    postDate.innerText = p.date;
    const postText = document.createElement('p');
    postText.className = 'post-text';
    postText.innerText = p.text;
    const postLocation = document.createElement('span');
    postLocation.className = 'post-location';
    postLocation.innerText = `${p.coords.latitude}, ${p.coords.longitude}`;

    post.append(postDate, postText, postLocation);
    this.addButton.insertAdjacentElement('afterend', post);
  }

  openModal() {
    this.manualCoords = false;
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    const modalWindow = document.createElement('div');
    modalWindow.id = 'modal-window';
    const addForm = document.createElement('form');
    addForm.id = 'add-form';
    addForm.name = 'add-form';
    const postText = document.createElement('textarea');
    postText.name = 'post-text';
    postText.id = 'post-text';
    postText.setAttribute('required', '');
    postText.placeholder = 'Write something..';
    const savePost = document.createElement('button');
    savePost.id = 'save-button';
    savePost.innerText = 'Добавить';
    const cancel = document.createElement('button');
    cancel.id = 'cancel-button';
    cancel.innerText = 'Отмена';

    document.body.append(modalContainer);
    modalContainer.append(modalWindow);
    modalWindow.append(addForm);
    addForm.append(postText, savePost, cancel);

    cancel.addEventListener('click', (cancelEv) => {
      cancelEv.preventDefault();
      document.getElementById('modal-container').remove();
    });

    addForm.addEventListener('submit', (saveEv) => {
      saveEv.preventDefault();
      this.data = { text: postText.value };
      if (!this.manualCoords) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            this.data.coords = { latitude, longitude };
            this.savePost();
          }, () => {
            this.showCoordsField();
            this.manualCoords = true;
          });
        }
      } else {
        try {
          this.data.coords = this.coordsValidator.validate(this.postLocation.value);
          this.savePost();
        } catch (e) {
          if (this.postLocation.nextSibling.className === 'warning') this.postLocation.nextSibling.remove();
          this.postLocation.insertAdjacentHTML('afterend', `<span class="warning">${e.message}</span>`);
        }
      }
    });
  }

  savePost() {
    this.data.date = new Date().toLocaleString();
    this.storage.push(this.data);
    window.localStorage.setItem('posts', JSON.stringify(this.storage));

    this.showPost(this.data);
    document.getElementById('modal-container').remove();
  }

  showAddButton() {
    this.addButton = document.createElement('button');
    this.addButton.innerText = 'Добавить пост +';
    this.addButton.id = 'add-button';
    this.addButton.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.openModal();
    });
    this.container.append(this.addButton);
  }

  showCoordsField() {
    this.postLocation = document.createElement('input');
    this.postLocation.id = 'post-location';
    this.postLocation.name = 'post-location';
    this.postLocation.required = true;

    document.getElementById('post-text').insertAdjacentHTML('afterend', '<span class="warning">Что-то пошло не так. Пожалуйста, введите координаты:</span>');
    document.getElementById('save-button').insertAdjacentElement('beforebegin', this.postLocation);
  }

  init() {
    this.showAddButton();
    if (this.posts) this.posts.forEach((post) => this.showPost(post));
  }
}
