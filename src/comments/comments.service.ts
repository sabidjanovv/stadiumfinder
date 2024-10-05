import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "./models/comment.model";

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentModel: typeof Comment) {}
  create(createCommentDto: CreateCommentDto) {
    return this.commentModel.create(createCommentDto);
  }

  findAll() {
    return this.commentModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.commentModel.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto
  ): Promise<Comment> {
    const comment = await this.commentModel.update(updateCommentDto, {
      where: { id },
      returning: true,
    });

    return comment[1][0];
  }

  async remove(id: number) {
    const comment = await this.commentModel.findByPk(id);

    if (!comment) {
      return { message: `ID: ${id} does not exist in the database` };
    }

    await this.commentModel.destroy({ where: { id } });
    return { message: `ID: ${id} deleted successfully` };
  }
}
