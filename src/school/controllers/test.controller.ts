// filter.controller.ts
import { Controller, Get, Query } from '@nestjs/common';

import { BaseFilterDto } from '@/core/dto/base-filter.dto';

@Controller('filters')
export class FilterController {
  @Get()
  getFilters(@Query() filters: BaseFilterDto) {
    console.log('Received filters:', filters);
    return filters;
  }
}
