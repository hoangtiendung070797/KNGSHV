export class AccountViewModel {
  public id: string;

  public userName: string;

  public passwordHash: string;
  public fullName: string;

  public birthDay: string;
  public avatar: string;

  public dateCreated: string;

  public dateModified?: string;

  public isDeleted: boolean;

  public sortOrder: number;

  public status: number;

  public blogs: any[];

  public classRooms: any[];

  public learners: any[];

  public lectures: any[];
  public subjects: any[];

  constructor() {

  }
}
