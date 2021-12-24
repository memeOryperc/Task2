import { IBaseVisitor, IVisitor } from './visitor.interface';

import Visitor from './visitor.model';

const VISITORS: IVisitor[] = [];

const getAll = async (): Promise<IVisitor[]> => VISITORS;

const getById = async (id: string): Promise<IVisitor | null> => VISITORS.find((visitor) => visitor.id === id) || null;

const createVisitor = async ({
  lastName,
  firstName,
  phoneNumber,
  librarycard
}: IBaseVisitor): Promise<IVisitor> => {
  const visitor = new Visitor({
    lastName,
    firstName,
    phoneNumber,
    librarycard
  })
  VISITORS.push(visitor);
  return visitor;
}

const updateById = async ({
  id,
  lastName,
  firstName,
  phoneNumber,
  librarycard
}: IVisitor): Promise<IVisitor | null> => {
  const visitorPos = VISITORS.findIndex((visitor) => visitor.id === id);

  if (visitorPos === -1) return null;

  const oldVisitor = VISITORS[visitorPos];

  const newVisitor = {
    ...oldVisitor,
    lastName,
    firstName,
    phoneNumber,
    librarycard,
    id
  };

  VISITORS.splice(visitorPos, 1, newVisitor);
  return newVisitor;
};

const deleteById = async (id: string): Promise<IVisitor | null> => {
  const visitorPos = VISITORS.findIndex((visitor) => visitor.id === id);

  if (visitorPos === -1) return null;

  const visitorDeletable = VISITORS[visitorPos]!;

  VISITORS.splice(visitorPos, 1);
  return visitorDeletable;
}

export default {
  VISITORS,
  getAll,
  getById,
  createVisitor,
  updateById,
  deleteById
};