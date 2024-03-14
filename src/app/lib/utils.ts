import { Signal, WritableSignal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";

export function connectOnChange<T, U>(sourceSignal: Signal<T>, destinationSignal: WritableSignal<U>, update: (src: T, dst: U) => U) {
  return toObservable(sourceSignal)
    .subscribe(sourceValue => {
      destinationSignal.update(destinationValue => update(sourceValue, destinationValue));
    });
}