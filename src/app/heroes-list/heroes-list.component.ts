import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {HeroesListDataSource} from './heroes-list-datasource';
import {HeroService} from '../hero.service';
import {AddDialogComponent} from '../add-dialog/add-dialog.component';
import {MatDialog, MatDialogModule, MatDialogConfig} from "@angular/material";

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: HeroesListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'name'];

  constructor(private heroService: HeroService, private dialog: MatDialog) { }
  ngOnInit() {
    this.dataSource = new HeroesListDataSource(this.paginator, this.sort, this.heroService);
  }
  openDialog() {

    let dialogRef = this.dialog.open(AddDialogComponent, {
      width: '300px',
      autoFocus: true,
      disableClose: true,
      data: { box: {heroes: this.dataSource.data,
        heroService: this.heroService }}
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Success') {
        this.ngOnInit();
      }
    });
  }
}
