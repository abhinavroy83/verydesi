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

  async getbusiness(_id: string) {
    try {
      console.log(_id);

      const business = await this.businessmodel.findById(_id);
      if (!business) {
        throw new NotFoundException(' there is no business by this id');
      }

      return business;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while fetching busines',
      );
    }
  }

  async getbusinessbyuser(userId: string) {
    try {
      const bussiness = await this.businessmodel.find({ UserId: userId });
      if (!bussiness) {
        throw new NotFoundException('no busines found by user');
      }

      return bussiness;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while fetching busines',
      );
    }
  }

  async getallbusiness() {
    try {
      const allbusiness = await this.businessmodel.find();

      if (allbusiness.length <= 0) {
        throw new NotFoundException('there is no bussiness');
      }

      return allbusiness;
    } catch (error) {
      throw new InternalServerErrorException(
        'error while finding all business ',
      );
    }
  }


  async deletebusinessevent(businessId: string) {
    try {
      const business = await this.businessmodel.findByIdAndDelete({ _id: businessId });

      if (!business) {
        throw new NotFoundException('business not found');
      }
      return { success: true, message: 'business deleted successfully' };
    } catch (error) {
      throw new Error(`Error while delete room: ${error.message}`);
    }
  }
}
