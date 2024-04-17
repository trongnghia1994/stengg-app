import {
  Body,
  Controller,
  Get,
  Post,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from "@nestjs/common";
import { CreateSampleEntityInputDto } from "./dto/create-sample-entity.dto";
import { SampleEntity } from "./sample-entity.entity";
import { SampleEntitiesService } from "./sample-entity.service";
import { Pagination } from "nestjs-typeorm-paginate";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("sample-entities")
export class SampleEntitiesController {
  constructor(private readonly sampleEntityService: SampleEntitiesService) {}

  @Post()
  create(
    @Body() createSampleEntityDto: CreateSampleEntityInputDto,
  ): Promise<SampleEntity> {
    return this.sampleEntityService.create(createSampleEntityDto);
  }

  @Get()
  findAllPaginated(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query("searchText") searchText: string,
  ): Promise<Pagination<SampleEntity>> {
    return this.sampleEntityService.paginate({ page, limit }, searchText);
  }

  @UseInterceptors(FileInterceptor("file"))
  @Post("import_csv")
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: "csv",
        })
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    const fileString = file.buffer.toString();
    return this.sampleEntityService.importData(fileString);
  }
}
