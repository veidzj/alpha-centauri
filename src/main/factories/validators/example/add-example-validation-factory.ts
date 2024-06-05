import { type Validation } from '@/presentation/protocols'
import {
  ValidationComposite,
  RequiredFieldValidation
} from '@/validation/validators'

export const makeAddExampleValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('name'))
  return new ValidationComposite(validations)
}
