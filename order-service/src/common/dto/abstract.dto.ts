import {
  DateField,
  NumberField,
} from '../../decorators';
import { type AbstractEntity } from '../abstract.entity';

export class AbstractDto {
  @NumberField()
  id!: number;

  @DateField()
  created_at!: Date;

  @DateField()
  updated_at!: Date;

  translations?: AbstractTranslationDto[];

  constructor(entity: AbstractEntity, options?: { excludeFields?: boolean }) {
    if (!options?.excludeFields) {
      this.id = entity.id;
      this.created_at = entity.created_at;
      this.updated_at = entity.updated_at;
    }
  }
}

export class AbstractTranslationDto extends AbstractDto {
  constructor(entity: AbstractEntity) {
    super(entity, { excludeFields: true });
  }
}
