export class EditStatusDto {
  status: Status;
}

export type Status = 'new' | 'in_progress' | 'closed';