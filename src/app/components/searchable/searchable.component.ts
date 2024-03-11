import { Component, Input, computed, input, signal } from '@angular/core';

type StringKeysOnly<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T];

@Component({
  selector: 'pro-searchable',
  templateUrl: './searchable.component.html',
  styleUrl: './searchable.component.scss'
})
export class SearchableComponent<T, U extends StringKeysOnly<T>> {

  list = input<T[]>([]);
  key = input.required<U>();
  searchTerm = signal("");

  filteredList = computed(() => this.computeFilteredList());

  private computeFilteredList(): T[] {
    return this.list()
      .filter(elem => (elem[this.key()] as string).includes(this.searchTerm()));
  }
}
