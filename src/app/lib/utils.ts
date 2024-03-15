import { Signal, WritableSignal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";

export function connectOnChange<T, U>(sourceSignal: Signal<T>, destinationSignal: WritableSignal<U>, update: (src: T, dst: U) => U) {
  return toObservable(sourceSignal)
    .subscribe(sourceValue => {
      destinationSignal.update(destinationValue => update(sourceValue, destinationValue));
    });
}

export function nextNumbered(names: string[], prefix: string) {
  const patternWithUnderscore = new RegExp(`${prefix}_[0-9]+`);
  const givenNumbers = names
    .filter(name => name.match(patternWithUnderscore))
    .map(name => Number(name.split('_')[1]))
    .sort();
  let newNumber = givenNumbers.length + 1;
  for (let i = 0; i < givenNumbers.length; i++) {
    const givenNumber = givenNumbers[i];
    if (i + 1 !== givenNumber) {
      newNumber = i + 1;
      break;
    }
  }
  return `${prefix}_${String(newNumber).padStart(2, '0')}`;;
}