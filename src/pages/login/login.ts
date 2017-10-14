import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsListPage } from '../news-list/news-list';
import {HomePage} from '../home/home';
import {Http} from "@angular/http";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // objeto usuario utilizado para login
  public user = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.http.post('http://127.0.0.1:8000/api/login', this.user)
        .toPromise().then((response) => {
      // guardamos o token de acesso no localStorage
      window.localStorage['token'] = response.json().token;
      // apos o login configuramos a pagina root do nosso app para a listagem de noticias
      this.navCtrl.setRoot(HomePage);
    })
  }
}
