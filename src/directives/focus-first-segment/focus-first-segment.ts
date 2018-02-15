import { Directive, ElementRef } from '@angular/core';

/**
 * Generated class for the FocusFirstSegmentDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[focus-first-segment]' // Attribute selector
})
export class FocusFirstSegmentDirective {

  constructor(el: ElementRef) {
    // el.nativeElement.style.background='#488aff';
    
    el.nativeElement.autofocus=true;
    console.log(el.nativeElement.autofocus);
  }

}
