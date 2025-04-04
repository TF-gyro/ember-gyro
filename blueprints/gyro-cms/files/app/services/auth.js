import Service from '@ember/service';
import ENV from '<%= dasherizedPackageName %>/config/environment';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import fetch from 'fetch';

export default class AuthService extends Service {
  @service router;
  @service cookies;
  @service type;
  @service types;
  @service blueprints;

  @tracked inputPassword;
  @tracked isLoggedIn = false;
  @tracked junctionPassword = '';
  @tracked goToRouteAfterLogin = 'index';
  @tracked goToSlugAfterLogin = '';
  @tracked projectDescription = '';
  @tracked implementationSummary = '';
  @tracked blueprintLink = '';

  checkIfLoggedIn = async () => {
    this.type.loadingSearchResults = true;
    let cookiePassword = this.cookies.getCookie(ENV.JUNCTION_SLUG);

    if (
      cookiePassword !== '' &&
      this.junctionPassword !== '' &&
      cookiePassword == this.junctionPassword
    ) {
      this.type.loadingSearchResults = false;
      return true;
    } else if (
      cookiePassword !== null &&
      ENV.JUNCTION_SLUG &&
      this.junctionPassword == ''
    ) {
      this.inputPassword = cookiePassword;
      await this.submitPassword();
      this.type.loadingSearchResults = false;
      return true;
    } else {
      this.type.loadingSearchResults = false;
      return false;
    }
  };

  @action
  async submitPassword() {
    this.type.loadingSearchResults = true;
    if (
      // ENV.JUNCTION_SLUG == 'junction' &&
      this.inputPassword !== '' &&
      this.junctionPassword !== '' &&
      this.inputPassword == this.junctionPassword
    ) {
      this.cookies.setCookie(ENV.JUNCTION_SLUG, this.inputPassword);
      this.type.loadingSearchResults = false;
      this.justGoToRouteAfterLogin();
    }
  }

  @action
  async justGoToRouteAfterLogin() {
    this.inputPassword = null; // clear stored password for security reasons

    if (
      this.goToRouteAfterLogin == 'index' ||
      this.goToRouteAfterLogin == 'auth'
    ) {
      this.router.transitionTo('index');
    } else {
      this.type.currentType = this.types.json.modules[this.goToSlugAfterLogin];
      this.router.transitionTo(
        this.goToRouteAfterLogin,
        this.goToSlugAfterLogin,
      );
    }
  }

  @action
  async logout(e) {
    e.preventDefault();

    await this.cookies.eraseCookie('junctionexpress_user_email');
    await this.cookies.eraseCookie('junctionexpress_user_id');
    await this.cookies.eraseCookie(ENV.JUNCTION_SLUG);

    if (ENV.JUNCTION_SLUG === 'junction') {
      this.router.transitionTo('auth');
    } else {
      window.location.href = 'https://truearch.io';
    }
  }

  // TODO: clean up this function
  @action
  async getJunctionPassword() {
    if (ENV.JUNCTION_SLUG == undefined || ENV.JUNCTION_SLUG == '') {
      alert('Please define JUNCTION_SLUG in .ENV file');
    } else {
      this.junctionPassword = ENV.JUNCTION_PASSWORD;
    }
  }
}
