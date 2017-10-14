import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MyApp} from '../../app/app.component';
import {Geolocation} from '@ionic-native/geolocation';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public task;
    public lat;
    public long;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http: Http,
                public geolocation: Geolocation) {

    }

    ionViewDidLoad() {
        this.sendGeolocation();
    }

    sendGeolocation() {

        var localtion = this.geolocation;
        var request = this.http;
        var lat = this.lat;
        var long = this.long;

        // define tempo de execução da funcao = a cada 1 minuto
        this.task = setInterval(function (parameters: { parameters: { location: any; request: any, lat: any, long: any } }) {

            localtion.getCurrentPosition().then((resp) => {

                lat = resp.coords.latitude;
                long = resp.coords.longitude;

            }).catch((error) => {
                console.log('Falha ao obter localização', error);
            });

            if (lat !== undefined && long !== undefined) {
                // Cria o header da requisicao para enviar o token de acesso armazenado no local storage
                let headers = new Headers();
                headers.set('Authorization', `Bearer ${window.localStorage['token']}`);
                let requestOptions = new RequestOptions({headers});

                // efetua uma requisicao ajax para nossa api do Laravel
                request.post('http://127.0.0.1:8000/api/location', {
                    lat: lat,
                    long: long
                }, requestOptions)
                    .toPromise().then(null,
                    function (error) {
                        console.log('Erro de comunicação com o servidor', error)
                    });
            }

        }, 60000);
    }
}

