import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css']
})
export class NavComponent {
	expandable: boolean = false;
	title = 'Marvel Superheroes';
	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
	.pipe(
		map(result => result.matches)
		);
	constructor(private breakpointObserver: BreakpointObserver) {}
	ngOnInit() {
		this.onResize({target: window});
	}
	onResize(event) {
		const element = event.target.innerWidth;

		if (element < 480) {
			this.expandable = true;
		} else {
			this.expandable = false;
		}
	}
}
