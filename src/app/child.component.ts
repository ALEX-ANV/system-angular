/// <amd-module name="./app/child.component" />


import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <div class="square">
      Child 1
    </div>
  `,
  styles: [`
  .square {
    background: var(--bg);
    height: 100px;
    width: 200px;
    border: 1px dashed red;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Input() @HostBinding('style.--bg') color?: string;
}
