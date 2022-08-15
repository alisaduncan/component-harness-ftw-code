import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="flex flex-col min-h-screen justify-center bg-slate-100">
      <header class="mt-6 w-10/12 mx-auto">
        <h1 class="text-center text-5xl text-blue-500">My Favorite K-Dramas</h1>
        <div class="border border-1 border-blue-200 mt-6 mb-3"></div>
        <app-nav></app-nav>
        <div class="border border-1 border-blue-200 mb-6 mt-3"></div>
      </header>
      <main class="my-12 mx-auto flex-grow">
        <router-outlet></router-outlet>
      </main>
      <footer class="flex justify-center mb-3">
        <p class="text-sm text-slate-800">
          Made with ❤️ by
          <a href="https://alisaduncan.dev" class="underline text-blue-500 hover:text-orange-400">Alisa Duncan</a>
          with Angular and showcasing testing using component test harnesses.
        </p>
      </footer>
    </div>
  `
})
export class AppComponent {
}
