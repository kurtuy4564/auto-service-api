import { Part, Service } from "../../generated/prisma/client.js";
import { Status } from "./edit-status.dto.js";

export class CreateOrderDto {
  carId: number;
  status: Status;
  scheduledAt: Date;
  part?: Part[];
  services?: Service[];
}
