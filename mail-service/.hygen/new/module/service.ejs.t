---
to: "src/modules/<%= h.fileName(name) %>/<%= h.serviceFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('Service') %>
---
<%

 ClassName = h.ClassName(name);
 fieldName = h.changeCase.camel(ClassName);

 DtoName = h.DtoName(name);
 dtoFileName = h.dtoFileName(name);


 CreateCommandName = h.CreateCommandName(name);
 createCommandFileName = h.createCommandFileName(name);


 EntityName = h.EntityName(name);
 entityName = h.changeCase.camel(EntityName);
 entityFileName = h.entityFileName(name);

 ServiceName = h.ServiceName(name);

 UpdateDtoName = h.UpdateDtoName(name);
 updateDtoFileName = h.updateDtoFileName(name);
 updateDtoName = h.changeCase.camel(UpdateDtoName);

 fileName = h.fileName(name);

 RepositoryName = h.RepositoryName(name);
 repositoryName = h.changeCase.camel(RepositoryName);
 repositoryFileName = h.repositoryFileName(name);

 NotFoundExceptionName = h.NotFoundExceptionName(name);
 notFoundExceptionFileName = h.notFoundExceptionFileName(name);

 createFunctionName = 'create' + ClassName;
 updateFunctionName = 'update' + ClassName;
 deleteFunctionName = 'delete' + ClassName;
 getAllFunctionName = 'getAll' + ClassName;
 getSingleFunctionName = 'getSingle' + ClassName;
 controllerName = moduleName + 'Controller';
 serviceName = moduleName + 'Service';
 CreateDtoName = h.CreateDtoName(name);
 createDtoFileName = h.createDtoFileName(name);

 PageOptionsDtoName = h.PageOptionsDtoName(name);
 pageOptionsDtoName = h.changeCase.camel(PageOptionsDtoName);
 pageOptionsDtoFileName = h.pageOptionsDtoFileName(name);

%>import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import type { PageDto } from '../../common/dto/page.dto';
import type { <%= DtoName %> } from './dtos/<%= dtoFileName %>';
import { <%= RepositoryName %> } from './<%= repositoryFileName %>';
import type { <%= UpdateDtoName %> } from './dtos/<%= updateDtoFileName %>';
import { <%= EntityName %> } from './<%= entityFileName %>';

@Injectable()
export class <%= ServiceName %> {
  constructor(
    @InjectRepository(<%= EntityName %>)
    private <%= repositoryName %>: Repository<<%= EntityName %>>,
  ) {}


  async <%= getAllFunctionName %>(
    <%= pageOptionsDtoName %>: any,
  ): Promise<PageDto<<%= DtoName %>>> {
    const queryBuilder = this.<%= repositoryName %>
      .createQueryBuilder('<%= fieldName %>')
      .leftJoinAndSelect('<%= fieldName %>.translations', '<%= fieldName %>Translation');
    const [items, pageMetaDto] = await queryBuilder.paginate(<%= pageOptionsDtoName %>);

    return items.toPageDto(pageMetaDto);
  }

  async <%= getSingleFunctionName %>(id: number): Promise<<%= EntityName %>> {
    const queryBuilder = this.<%= repositoryName %>
      .createQueryBuilder('<%= fieldName %>')
      .where('<%= fieldName %>.id = :id', { id });

    const <%= entityName %> = await queryBuilder.getOne();

    if (!<%= entityName %>) {
      throw new NotFoundException();
    }

    return <%= entityName %>;
  }

  async <%= updateFunctionName %>(
    id: number,
    <%= updateDtoName %>: <%= UpdateDtoName %>,
  ): Promise<void> {
    const queryBuilder = this.<%= repositoryName %>
      .createQueryBuilder('<%= fieldName %>')
      .where('<%= fieldName %>.id = :id', { id });

    const <%= entityName %> = await queryBuilder.getOne();

    if (!<%= entityName %>) {
      throw new NotFoundException();
    }

    this.<%= repositoryName %>.merge(<%= entityName %>, <%= updateDtoName %>);

    await this.<%= repositoryName %>.save(<%= updateDtoName %>);
  }

  async <%= deleteFunctionName %>(id: number): Promise<void> {
    const queryBuilder = this.<%= repositoryName %>
      .createQueryBuilder('<%= fieldName %>')
      .where('<%= fieldName %>.id = :id', { id });

    const <%= entityName %> = await queryBuilder.getOne();

    if (!<%= entityName %>) {
      throw new NotFoundException();
    }

    await this.<%= repositoryName %>.remove(<%= entityName %>);
  }
}
