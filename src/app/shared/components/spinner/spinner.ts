import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="w-16 h-16 border-4 border-white/20 border-t-mainColor rounded-full animate-spin"></div>
    </div>
  `,
})
export class Spinner {}
