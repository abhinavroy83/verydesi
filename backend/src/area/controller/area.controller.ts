import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AreaService } from '../service/area.service';
import { JwtGuard } from 'src/auth/guard';
import { CreateCityDto } from '../Dto/post-city-dto';
import { updateCityDto } from '../Dto';

@Controller('area')
export class AreaController {
  constructor(private areaservice: AreaService) {}

  @UseGuards(JwtGuard)
  @Post('postcity')
  async postcity(@Request() req, @Body() createcitydto: CreateCityDto) {
    const userId = req.user.userId;
    return this.areaservice.createArea(createcitydto, userId);
  }

  @Put('updatearea/:_id')
  async updatearea(
    @Param('_id') _id: string,
    @Body() updatecitydto: updateCityDto,
  ) {
    return this.areaservice.updatearea(_id, updatecitydto);
  }

  @Get('getallcities')
  getallcities() {
    return this.areaservice.getAllCities();
  }

  @Get('find-city-by-zipcode/:zipcode')
  findcitybyzipcode(@Param('zipcode') zipCode: string) {
    return this.areaservice.findCityByZipcode(zipCode);
  }

  @Get('find-city-by-area/:area')
  findcitybyarea(@Param('area') area: string) {
    return this.areaservice.findArea(area);
  }
}
