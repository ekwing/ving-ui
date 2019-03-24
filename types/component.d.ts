import Vue from 'vue'

export class VnComponent {
  static name: string
  static install(vue: typeof Vue): void
}
