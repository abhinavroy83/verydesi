import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { City } from '../schemas/area-schema';
import { CreateCityDto } from '../Dto/post-city-dto';
import { updateCityDto } from '../Dto';

@Injectable()
export class AreaService {
  constructor(@Inject('AREA_MODEL') private areamodel: Model<City>) {}

  async createArea(
    createcitydto: CreateCityDto,
    userId: string,
  ): Promise<City> {
    try {
      const cityData = {
        ...createcitydto,
        UserId: userId,
      };
      const newCity = new this.areamodel(cityData);
      return newCity.save();
    } catch (error) {
      throw new Error('Error while posting city');
    }
  }

  async updatearea(_id: string, updatecitydto: updateCityDto): Promise<City> {
    try {
      const extistingCity = await this.areamodel.findById(_id);
      if (!extistingCity) {
        throw new NotFoundException('City not found');
      }

      const updatefield = { ...extistingCity.toObject(), ...updatecitydto };
      return this.areamodel.findByIdAndUpdate(_id, updatefield, { new: true });
    } catch (error) {
      throw new Error('Error while updating city');
    }
  }

  async getAllCities(): Promise<City[]> {
    try {
      return await this.areamodel.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch cities');
    }
  }

  async findCityByZipcode(zipcode: string): Promise<{ exists: boolean }> {
    try {
      const city = await this.areamodel.findOne({ zipcode });
      return { exists: !!city };
    } catch (error) {
      throw new InternalServerErrorException('Failed to find city by zipcode');
    }
  }

  async findArea(area: string): Promise<{ area: City[] }> {
    try {
      const res = await this.areamodel.find({ area });
      return { area: res }; 
    } catch (error) {
      throw new InternalServerErrorException('Failed to find area');
    }
  }
}
