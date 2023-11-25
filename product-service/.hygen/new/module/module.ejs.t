---
to: "src/modules/<%= h.fileName(name) %>/<%= h.moduleFileName(name) %>.ts"
unless_exists: true
---
<%

 ModuleName = h.ModuleName(name);
 fileName = h.inflection.dasherize(name);

 ControllerName = h.ControllerName(name);
 controllerFileName = h.controllerFileName(name);

 EntityName = h.EntityName(name);
 entityFileName = h.entityFileName(name);

 ServiceName = h.ServiceName(name);
 serviceFileName = h.serviceFileName(name);
%>import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { <%= ControllerName %> } from './<%= controllerFileName %>';
import { <%= EntityName %> } from './<%= entityFileName %>';
import { <%= ServiceName %> } from './<%= serviceFileName %>';


@Module({
  imports: [
    TypeOrmModule.forFeature([<%= EntityName %>]),
  ],
  providers: [<%= ServiceName %>],
  controllers: [<%= ControllerName %>],
})
export class <%= ModuleName %> {}
