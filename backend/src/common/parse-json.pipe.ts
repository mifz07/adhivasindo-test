import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseJsonPipe implements PipeTransform {
  constructor(private readonly fieldName: string) {}
    
  transform(value: any) {
    if (!value || !value[this.fieldName]) {
      throw new BadRequestException(`${this.fieldName} is required`);
    }
    try {
      value[this.fieldName] = JSON.parse(value[this.fieldName]);
      return value;
    } catch (error) {
      throw new BadRequestException(`${this.fieldName} must be a valid JSON string`);
    }
  }
}