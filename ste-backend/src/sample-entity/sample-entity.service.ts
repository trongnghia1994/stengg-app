import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { CreateSampleEntityInputDto } from "./dto/create-sample-entity.dto";
import { SampleEntity } from "./sample-entity.entity";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
const csv = require('csvtojson');

@Injectable()
export class SampleEntitiesService {
  constructor(
    @InjectRepository(SampleEntity)
    private readonly sampleEntityRepository: Repository<SampleEntity>,
  ) {}

  create(createSampleEntity: CreateSampleEntityInputDto): Promise<SampleEntity> {
    const sampleEntity = new SampleEntity();
    sampleEntity.id = createSampleEntity.id;
    sampleEntity.postId = createSampleEntity.postId;
    sampleEntity.name = createSampleEntity.name;
    sampleEntity.email = createSampleEntity.email;
    sampleEntity.body = createSampleEntity.body;

    return this.sampleEntityRepository.save(sampleEntity);
  }

  async truncate(): Promise<void> {
    await this.sampleEntityRepository.clear();
  }

  bulkCreate(createSampleEntities: CreateSampleEntityInputDto[]): Promise<InsertResult> {
    return this.sampleEntityRepository.insert(createSampleEntities);
  }

  async paginate(options: IPaginationOptions, searchText?: string): Promise<Pagination<SampleEntity>> {
    const queryBuilder = this.sampleEntityRepository.createQueryBuilder('c')
    if (searchText) {
      queryBuilder.where('c.name like :text', { text: `%${searchText}%` })
    }
    queryBuilder.orderBy('c.id', 'ASC');
    return paginate<SampleEntity>(queryBuilder, options);
  }

  findAll(): Promise<SampleEntity[]> {
    return this.sampleEntityRepository.find();
  }

  findOne(id: string): Promise<SampleEntity> {
    return this.sampleEntityRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.sampleEntityRepository.delete(id);
  }

  private async parseCsv(csvString: string): Promise<CreateSampleEntityInputDto[]> {
    const jsonArray = await csv().fromString(csvString);
    return jsonArray;
  }

  async importData(csvString: string) {
    // Parse the CSV file
    const createSampleEntities = await this.parseCsv(csvString);
    // Truncate
    await this.truncate();
    // Bulk create entities
    await this.bulkCreate(createSampleEntities);
  }
}
