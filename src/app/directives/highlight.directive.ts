import { Directive, Renderer2,ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private render: Renderer2,
    private ef:ElementRef) { }

    @HostListener('mouseenter') onmouseenter() {
      this.render.addClass(this.ef.nativeElement,'highlight');
    }

    @HostListener('mouseleave') onmouseleave() {
      this.render.removeClass(this.ef.nativeElement,'highlight');
    }

}
