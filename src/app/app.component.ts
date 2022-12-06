/// <amd-module name="./app/app.component" />

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {Child2Component} from './test/child.component';
import {ChildComponent} from './child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, Child2Component, ChildComponent],
  template: `
    {{title}}

    <div class="wrapper">
      Color: <input type="color" [formControl]="control">

      <app-child [color]="control.valueChanges | async"></app-child>
      <app-child2 [color]="control.valueChanges | async"></app-child2>
    </div>

  `,
  styles: [`
    .wrapper {
    display: flex;
      align-items: flex-start;
      justify-content: flex-start;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent  {
  title = 'sandbox';

  control = new FormControl<string>('', {nonNullable: true})
}
