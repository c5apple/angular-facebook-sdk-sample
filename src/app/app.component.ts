import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /** ログイン状態 */
  loginResponse: Observable<LoginResponse>;

  /** アカウント */
  me: Observable<{ name: string, id: string }>;

  constructor(private fb: FacebookService) { }

  ngOnInit(): void {
    // Facebook接続
    this.fb.init(environment.facebook as InitParams);

    // ログインチェック
    this.getLoginStatus();
  }

  /**
   * ログインチェック
   */
  getLoginStatus() {
    this.fb.getLoginStatus().then((response: LoginResponse) => {
      // ログイン状態取得
      this.loginResponse = of(response);
      console.log('getLoginStatus', response);
    });
  }

  /**
   * ログイン
   */
  loginWithFacebook() {
    this.fb.login()
      .then((response: LoginResponse) => {
        // ログイン成功
        this.loginResponse = of(response);
        console.log('login success', response);
      })
      .catch((error: any) => {
        // キャンセルorエラー
        console.error('login cancel', error);
      });
  }

  /**
   * ログアウト
   */
  logoutWithFacebook() {
    this.fb.logout()
      .then((response: LoginResponse) => {
        // ログアウト成功
        this.loginResponse = of(response);
        console.log('logout success', response);
      })
      .catch((response: any) => {
        // エラー
        console.error('logout error', response);
      });
  }

  /**
   * 名前を取得
   */
  getMe() {
    this.fb.api('/me', 'get', {}).then(response => {
      // API実行
      console.log(response);
      this.me = of(response);
    });
  }
}
