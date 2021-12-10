import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { qs, getLanguageName } from '../utils';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss']
})
export class HeroPageComponent implements OnInit {

  languages$ = new Observable<any>();
  languagesList: any = []
  translatedText: string = 'Example Response'

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getLanguages();
  }

  getLanguageFullname(key: any) {
    return getLanguageName(key)
  }



  getLanguages() {
    this.languages$ = this.http.get("https://google-translate1.p.rapidapi.com/language/translate/v2/languages", {
      "headers": {
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        "x-rapidapi-key": "1b9baa5472msh867d9bc3d0cfec6p1a24cfjsnab59d1f4ae66"
      }
    })
    this.languages$.subscribe(
      (todo) => {
        this.languagesList = todo.data.languages
      }
    )
  }

  translatorForm = new FormGroup({
    fromText: new FormControl(''),
    fromLanguage: new FormControl(''),
    toLanguage: new FormControl(),
  });

  translate() {
    this.http.post(
      "https://google-translate1.p.rapidapi.com/language/translate/v2",
      qs(
        {
          "q": this.translatorForm.value.fromText,
          "target": this.translatorForm.value.toLanguage,
          "source": this.translatorForm.value.fromLanguage
        }
      ),
      {
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
          "x-rapidapi-host": "google-translate1.p.rapidapi.com",
          "x-rapidapi-key": "1b9baa5472msh867d9bc3d0cfec6p1a24cfjsnab59d1f4ae66"
        }
      })
      .subscribe(
        (data: any) => {
          this.translatedText = data.data.translations[0].translatedText
        }
      )
  }

}
