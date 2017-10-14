import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {NoticeDetailPage} from '../notice-detail/notice-detail';

/**
 * Generated class for the NewsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-news-list',
    templateUrl: 'news-list.html',
})
export class NewsListPage {

    public news = []; // array de noticias recebidas pela API

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http,
                public loadingCtrl: LoadingController) 
    {
    
    }

    ionViewDidLoad() {

        let loading = this.loadingCtrl.create({
          content: 'Carregando...'
        });

        loading.present(); // ativa o loading

        // Cria o header da requisicao para enviar o token de acesso armazenado no local storage
        let headers = new Headers();
        headers.set('Authorization', `Bearer ${window.localStorage['token']}`);
        let requestOptions = new RequestOptions({headers});
        
        // efetua uma requisicao ajax para nossa api do Laravel
        this.http.get('http://127.0.0.1:8000/api/news', requestOptions)
            .toPromise().then((response) => {
            this.news = response.json(); // alimenta o array com json retornado pela requisicao
            loading.dismiss(); // fecha o loading
        });
    }

    goToNoticeDetail(parameters: { notice: any }) {
        let notice = parameters.notice;
        // faz o redirecionamento para visualização da noticia
        this.navCtrl.push(NoticeDetailPage, {id: notice.id})
    }

}
