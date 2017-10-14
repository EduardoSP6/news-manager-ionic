import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the NoticeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-notice-detail',
    templateUrl: 'notice-detail.html',
})
export class NoticeDetailPage {

    public notice;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http) {
    }

    ionViewDidLoad() {
        // Cria o header da requisicao para enviar o token de acesso armazenado no local storage
        let headers = new Headers();
        headers.set('Authorization', `Bearer ${window.localStorage['token']}`);
        let requestOptions = new RequestOptions({headers});

        // efetua uma requisicao ajax para nossa api do Laravel
        this.http.get(`http://127.0.0.1:8000/api/news/${this.navParams.get('id')}`, requestOptions)
            .toPromise().then((response) => {
            this.notice = response.json(); // obtem o objeto
        });
    }

}
