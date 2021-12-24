export interface IBaseVisitor {
    lastName: string;
    firstName: string;
    phoneNumber: string;
    librarycard: string;
};

export interface IBaseVisitorPartial extends Partial<IBaseVisitor> { }

export interface IVisitor extends IBaseVisitor {
    id: string;
}

export interface IBaseVisitorResponse extends Partial<IBaseVisitor> {
    id: string;
}
