import { Component, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // @ViewChild('gridHolder') list;

  cols: number = 5;
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.onResize({target: window});
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
    // .subscribe(heroes => this.heroes = [heroes[0], heroes[14], heroes[23], heroes[32], heroes[29], heroes[44], heroes[62], heroes[2], heroes[17], heroes[13], heroes[49], heroes[46]]);
    .subscribe(heroes => this.heroes = heroes.splice(0, heroes.length - (heroes.length % this.cols)));
  }
  onResize(event) {
    const element = event.target.innerWidth;
    // console.log(element);

    if (element < 1024) {
      this.cols = 3;
    }
    if (element > 1024) {
      this.cols = 4;
    }
    if (element > 1200) {
      this.cols = 5;
    }
    if (element < 768  ) {
      this.cols = 2;
    }

    if (element < 640) {
      this.cols = 1;
    }
  }
}
