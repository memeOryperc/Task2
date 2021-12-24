const Visitor = require('./visitor.model')

const Visitors = [new Visitor()];

const getAll = async () => Visitors;

const getById = async (id) => Visitors.find((visitor) => visitor.id === id);

const createVisitor = async ({
  lastName,
  firstName,
  phoneNumber,
  libraryCard
}) => {
  const visitor = new Visitor({
    lastName,
    firstName,
    phoneNumber,
    libraryCard
  })
  Visitors.push(visitor);
  return visitor;
}

const updateById = async (id) => ({
  lastName,
  firstName,
  phoneNumber,
  libraryCard
}) => {
  const visitorPos = Visitors.findIndex((visitor) => visitor.id === id);
  if (visitorPos === -1) return null;

  const oldVisitor = Visitors[visitorPos];

  const newVisitor = {
    ...oldVisitor,
    lastName,
    firstName,
    phoneNumber,
    libraryCard
  };

  Visitors.splice(visitorPos, 1, newVisitor);
  return newVisitor;
};

const deleteById = async (id) => {
  const visitorPos = Visitors.findIndex((visitor) => visitor.id === id);

  if (visitorPos === -1) return null;

  const visitorDeletable = Visitors[visitorPos];

  Visitors.splice(visitorPos, 1);
  return visitorDeletable;
}

module.exports = {
  Visitors,
  getAll,
  getById,
  createVisitor,
  updateById,
  deleteById
};