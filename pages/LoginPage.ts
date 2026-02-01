import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  usernameInput = () => this.page.locator('input[type="text"]');
  passwordInput = () => this.page.locator('#password');
  loginButton = () => this.page.locator('#login-button');

  // Actions
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }
}