import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { TelegrafException, TelegrafExecutionContext } from "nestjs-telegraf";
import { Context } from "telegraf";

@Injectable()
export class AdminBotGuard implements CanActivate {
  private readonly ADMIN = process.env.ADMIN;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = TelegrafExecutionContext.create(context);
    const { from } = ctx.getContext<Context>();
    console.log(this.ADMIN, from.id);
    

    if (Number(this.ADMIN )!= from.id) {
      throw new TelegrafException("Siz adminstator emassiz. Ruxsat yo'q");
    }
    return true;
  }
}
