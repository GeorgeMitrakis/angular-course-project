import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective{
  @HostBinding('class.open') isOpen = false;

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
}
// export class DropdownDirective {
//   private elementRef: ElementRef;
//   private renderer: Renderer2;
//   private isDropdownOpen: boolean = false;


//   constructor(elementRef: ElementRef, renderer: Renderer2) { 
//     this.elementRef = elementRef
//     this.renderer = renderer
//   }

//   @HostListener('click') toggleOpen(){
//     if(!this.isDropdownOpen){      
//       this.renderer.addClass(this.elementRef.nativeElement,'open')
//     }
//     else{      
//       this.renderer.removeClass(this.elementRef.nativeElement,'open')
//     }
//     this.isDropdownOpen = !this.isDropdownOpen
//   }
// }
