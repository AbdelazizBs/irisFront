import { Component, OnInit } from '@angular/core';
import {EtapeProductionServiceService} from '../../services/etape-production-service.service';
import {Router} from '@angular/router';
import {ArticleServiceService} from '../../services/article-service.service';
export class Article {
  id: any;
  refIris: any;
  refClient: any;
  nomEtapeProductions: any ;
}
@Component({
  selector: 'app-ajouter-article',
  templateUrl: './ajouter-article.component.html',
  styleUrls: ['./ajouter-article.component.scss']
})
export class AjouterArticleComponent implements OnInit {
article: Article;
  nomEtapes: any[];
  response: any ;
  constructor(private etapeProductionService: EtapeProductionServiceService , private route: Router, private articleService: ArticleServiceService) {
    this.article = new Article();
  }

  ngOnInit(): void {
    this.etapeProductionService.getNomEtapes().subscribe(response => {
        console.log(response);
        this.response = response,
          this.nomEtapes = this.response;
        console.log(this.article); },
      (err) => {
        console.log(err);
      }
    );
  }

  ajoutArticle() {
    const f: FormData = new FormData();
    f.append('refIris', this.article.refIris);
    f.append('refClient', this.article.refClient);
    f.append('nomEtapeProductions', this.article.nomEtapeProductions);
    this.articleService.ajoutArticle(f).subscribe(
      (res) => {
        console.log(res);
        this.route.navigate(['/article']);
      },
      err => {
        console.log(err);

      }
    );
  }

}
