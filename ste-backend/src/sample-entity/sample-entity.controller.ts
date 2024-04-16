import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { FileUploadDto } from "./dto/upload-file.dto";

@Controller("sample-entities")
export class SampleEntitiesController {
  constructor(private readonly sampleEntityService: SampleEntitiesService) {}

  @Post()
  create(@Body() createSampleEntityDto: CreateSampleEntityInputDto): Promise<SampleEntity> {
    return this.sampleEntityService.create(createSampleEntityDto);
  }

  // @Get()
  // findAll(): Promise<SampleEntity[]> {
  //   return this.usersService.findAll();
  // }

  @Get()
  findAllPaginated(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('searchText') searchText: string,
  ): Promise<Pagination<SampleEntity>> {
    return this.sampleEntityService.paginate({ page, limit }, searchText);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: string): Promise<SampleEntity> {
    return this.sampleEntityService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.sampleEntityService.remove(id);
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
