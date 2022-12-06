/// <amd-module name="./app/test/child.component" />

import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-child2',
  standalone: true,
  template: `
    <div class="square2">
      Child 2
    </div>
  `,
  styles: [`
  .square2 {
    border: 1px solid green;
    background: var(--bg);
    height: 100px;
    width: 200px;

  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child2Component {
  @Input() @HostBinding('style.--bg') color?: string;
}
