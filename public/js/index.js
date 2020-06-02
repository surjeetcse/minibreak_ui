import '@babel/polyfill';
import { displayMap } from './mapBox';
import { login, logout, signup } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

// Dom element
const mapBox = document.getElementById('map');
const bookBtn = document.getElementById('book-tour');
const loginForm = document.querySelector('.form--login');
const signUpForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-settings');

//Delegation
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signUpForm) {
  signUpForm.addEventListener('submit', (e) => {
    document.querySelector('.btn.btn--green').textContent = 'processing...';
    e.preventDefault();
    //values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phonenumber').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('cpassword').value;
    signup(name, email, phoneNumber, password, passwordConfirm);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.btn--save--settings').textContent = 'Updating...';

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
    document.querySelector('.btn--save--settings').textContent =
      'Save settings';
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.btn--save--password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');
    document.querySelector('.btn--save--password').textContent =
      'Save password';

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
