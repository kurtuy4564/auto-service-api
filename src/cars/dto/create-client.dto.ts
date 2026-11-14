export class CreateCarDto {
  clientId: number;
  brand: string;
  model: string;
  plate: string;
  year: number;
  mileage?: number;
}
