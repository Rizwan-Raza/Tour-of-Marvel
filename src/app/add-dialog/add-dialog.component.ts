import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Hero } from '../hero';

@Component({
	selector: 'app-add-dialog',
	templateUrl: './add-dialog.component.html',
	styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
	heroService: any;
	heroes: Hero[];

	constructor(
		private dialogRef: MatDialogRef<AddDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
		this.heroes = data.box.heroes;
		this.heroService = data.box.heroService;
	}

	ngOnInit() {
	}
	close(param) {
		this.dialogRef.close(param);
	}
	add(hero: Hero): void {
		if (!hero) { return; }
		hero.name = hero.name.trim();
		hero.title = hero.title.trim();
		hero.origin = hero.origin.trim();
		this.heroService.addHero( hero )
		.subscribe(hero => {
			this.heroes.push(hero);
			this.close('Success');
		});
	}
}
