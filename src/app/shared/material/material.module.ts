import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule, MatFormFieldModule, MatTabsModule,
  MatAutocompleteModule, MatBadgeModule, MatSnackBarModule,
  MatPaginatorModule, MatToolbarModule, MatChipsModule,
  MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatTableModule,
  MatSelectModule, MatInputModule, MatDialogModule, MatProgressBarModule,
  MatTooltipModule, MatDatepickerModule, MatCheckboxModule, MatExpansionModule,
  MatSlideToggleModule, MatProgressSpinnerModule, MatNativeDateModule
} from '@angular/material';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule, MatFormFieldModule, MatTabsModule,
    MatAutocompleteModule, MatBadgeModule, MatSnackBarModule,
    MatPaginatorModule, MatToolbarModule, MatChipsModule,
    MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatTableModule,
    MatSelectModule, MatInputModule, MatDialogModule, MatProgressBarModule,
    MatTooltipModule, MatDatepickerModule, MatCheckboxModule, MatExpansionModule,
    MatSlideToggleModule, MatProgressSpinnerModule, MatNativeDateModule,
    MatSortModule
  ],
  exports: [
    MatSidenavModule, MatFormFieldModule, MatTabsModule,
    MatAutocompleteModule, MatBadgeModule, MatSnackBarModule,
    MatPaginatorModule, MatToolbarModule, MatChipsModule,
    MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatTableModule,
    MatSelectModule, MatInputModule, MatDialogModule, MatProgressBarModule,
    MatTooltipModule, MatDatepickerModule, MatCheckboxModule, MatExpansionModule,
    MatSlideToggleModule, MatProgressSpinnerModule, MatNativeDateModule,
    MatSortModule
  ]
})
export class MaterialModule { }
