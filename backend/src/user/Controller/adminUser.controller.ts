import { Controller, Get } from '@nestjs/common';
import { AdiminUserService } from '../Service/adminuser.service';

@Controller('admin/user')
export class AdminUserController {
  constructor(private adminuserservice: AdiminUserService) {}

  @Get('getalluser')
  async getalluser() {
    return this.adminuserservice.listAllUser();
  }
}
