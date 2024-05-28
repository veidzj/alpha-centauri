export interface AddExampleRepository {
  add: (input: AddExampleRepository.Input) => Promise<string>
}

export namespace AddExampleRepository {
  export interface Input {
    name: string
  }
}
