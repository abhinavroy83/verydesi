import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async getbusinessbyuser(userId: string) {
    try {
      const bussiness = await this.businessmodel.find({ UserId: userId });
      if (bussiness) {
        throw new NotFoundException('no busines found by user');
      }

      return bussiness;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while fetching busines',
      );
    }
  }
}