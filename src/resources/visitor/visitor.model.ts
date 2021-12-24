import {
  v4 as uuid
} from 'uuid';

import { IVisitor, IBaseVisitorPartial, IBaseVisitorResponse } from './visitor.interface';

class Visitor {
  id: string;

  lastName: string;

  firstName: string;

  phoneNumber: string;

  librarycard: string;

  constructor({
    lastName = 'Prokaten',
    firstName = 'Artem',
    phoneNumber = '+375293523667',
    librarycard = '000232'
  }: IBaseVisitorPartial = {}) {
    this.id = uuid();
    this.lastName = lastName;
    this.firstName = firstName;
    this.phoneNumber = phoneNumber;
    this.librarycard = librarycard;
  }

  static toResponse(visitor: IVisitor): IBaseVisitorResponse {
    const {
      id,
      lastName,
      firstName,
      phoneNumber,
      librarycard
    } = visitor;
    return {
      id,
      lastName,
      firstName,
      phoneNumber,
      librarycard
    };
  }
}

export default Visitor;