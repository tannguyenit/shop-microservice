import {
  DateField,
  DYNAMIC_TRANSLATION_DECORATOR_KEY,
  NumberField,
} from '../../decorators';
import { ContextProvider } from '../../providers';
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

    const languageCode = ContextProvider.getLanguage();

    if (languageCode && entity.translations) {
      const translationEntity = entity.translations.find(
        (titleTranslation) => titleTranslation.languageCode === languageCode,
      )!;

      const fields: Record<string, string> = {};

      for (const key of Object.keys(translationEntity)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const metadata = Reflect.getMetadata(
          DYNAMIC_TRANSLATION_DECORATOR_KEY,
          this,
          key,
        );

        if (metadata) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          fields[key] = translationEntity[key];
        }
      }

      Object.assign(this, fields);
    } else {
      this.translations = entity.translations?.toDtos();
    }
  }
}

export class AbstractTranslationDto extends AbstractDto {
  constructor(entity: AbstractEntity) {
    super(entity, { excludeFields: true });
  }
}
