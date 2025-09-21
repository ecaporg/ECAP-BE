import { Request, Response } from 'express';

import { All, Controller, Req, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @All('*')
  handleAll(@Req() req: Request, @Res() res: Response) {
    return res.status(200).json({
      message: 'OK',
      timestamp: new Date().toISOString(),
      path: req.url,
      method: req.method,
    });
  }
}
