export interface AddExample {
  add: (input: AddExample.Input) => Promise<string>
}

export namespace AddExample {
  export interface Input {
    name: string
  }
}
