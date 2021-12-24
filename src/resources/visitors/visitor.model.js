const {
  v4: uuid
} = require('uuid');

class Visitor {
  constructor({
    id = uuid(),
    lastName = 'Prokaten',
    firstName = 'Artem',
    phoneNumber = '+375293523667',
    libraryCard = '000232'
  } = {}) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.phoneNumber = phoneNumber;
    this.libraryCard = libraryCard;
  }

  static toResponse(visitor) {
    const {
      id,
      lastName,
      firstName,
      phoneNumber,
      libraryCard
    } = visitor;
    return {
      id,
      lastName,
      firstName,
      phoneNumber,
      libraryCard
    };
  }
}

module.exports = Visitor;
