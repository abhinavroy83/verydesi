import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Business } from '../schemas/business-schema';
import { Model } from 'mongoose';
import { BusinessDto } from '../dto/post-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @Inject('BUSINESS_MODEL') private businessmodel: Model<Business>,
  ) {}

  async createBusiness(
    businessDto: BusinessDto,
    userId: string,
  ): Promise<Business> {
    try {
      const businessdata = {
        ...businessDto,
        UserId: userId,
      };
      const cratedbusiness = new this.businessmodel(businessdata);
      return cratedbusiness.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
