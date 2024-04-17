import { SampleEntitiesController } from "./sample-entity.controller";
import { SampleEntitiesService } from "./sample-entity.service";
import { Test } from "@nestjs/testing";

const sampleEntitiesRes = {
  items: [
    {
      id: 1,
      postId: "1",
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\\ntempora quo necessitatibus\\ndolor quam autem quasi\\nreiciendis et nam sapiente accusantium",
    },
    {
      id: 2,
      postId: "1",
      name: "quo vero reiciendis velit similique earum",
      email: "Jayne_Kuhic@sydney.com",
      body: "est natus enim nihil est dolore omnis voluptatem numquam\\net omnis occaecati quod ullam at\\nvoluptatem error expedita pariatur\\nnihil sint nostrum voluptatem reiciendis et",
    },
    {
      id: 3,
      postId: "1",
      name: "odio adipisci rerum aut animi",
      email: "Nikita@garfield.biz",
      body: "quia molestiae reprehenderit quasi aspernatur\\naut expedita occaecati aliquam eveniet laudantium\\nomnis quibusdam delectus saepe quia accusamus maiores nam est\\ncum et ducimus et vero voluptates excepturi deleniti ratione",
    },
    {
      id: 4,
      postId: "1",
      name: "alias odio sit",
      email: "Lew@alysha.tv",
      body: "non et atque\\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\\nquia voluptas consequuntur itaque dolor\\net qui rerum deleniti ut occaecati",
    },
    {
      id: 5,
      postId: "1",
      name: "vero eaque aliquid doloribus et culpa",
      email: "Hayden@althea.biz",
      body: "harum non quasi et ratione\\ntempore iure ex voluptates in ratione\\nharum architecto fugit inventore cupiditate\\nvoluptates magni quo et",
    },
    {
      id: 6,
      postId: "2",
      name: "et fugit eligendi deleniti quidem qui sint nihil autem",
      email: "Presley.Mueller@myrl.com",
      body: "doloribus at sed quis culpa deserunt consectetur qui praesentium\\naccusamus fugiat dicta\\nvoluptatem rerum ut voluptate autem\\nvoluptatem repellendus aspernatur dolorem in",
    },
    {
      id: 7,
      postId: "2",
      name: "repellat consequatur praesentium vel minus molestias voluptatum",
      email: "Dallas@ole.me",
      body: "maiores sed dolores similique labore et inventore et\\nquasi temporibus esse sunt id et\\neos voluptatem aliquam\\naliquid ratione corporis molestiae mollitia quia et magnam dolor",
    },
    {
      id: 8,
      postId: "2",
      name: "et omnis dolorem",
      email: "Mallory_Kunze@marie.org",
      body: "ut voluptatem corrupti velit\\nad voluptatem maiores\\net nisi velit vero accusamus maiores\\nvoluptates quia aliquid ullam eaque",
    },
    {
      id: 9,
      postId: "2",
      name: "provident id voluptas",
      email: "Meghan_Littel@rene.us",
      body: "sapiente assumenda molestiae atque\\nadipisci laborum distinctio aperiam et ab ut omnis\\net occaecati aspernatur odit sit rem expedita\\nquas enim ipsam minus",
    },
    {
      id: 10,
      postId: "2",
      name: "eaque et deleniti atque tenetur ut quo ut",
      email: "Carmen_Keeling@caroline.name",
      body: "voluptate iusto quis nobis reprehenderit ipsum amet nulla\\nquia quas dolores velit et non\\naut quia necessitatibus\\nnostrum quaerat nulla et accusamus nisi facilis",
    },
  ],
  meta: {
    totalItems: 500,
    itemCount: 10,
    itemsPerPage: 10,
    totalPages: 50,
    currentPage: 1,
  },
};

describe("SampleEntitiesController", () => {
  let sampleEntitiesController: SampleEntitiesController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SampleEntitiesController],
      providers: [
        {
          provide: SampleEntitiesService,
          useValue: {
            paginate: jest.fn().mockResolvedValue(sampleEntitiesRes),
          },
        },
      ],
    }).compile();

    sampleEntitiesController = moduleRef.get<SampleEntitiesController>(
      SampleEntitiesController,
    );
  });

  it("should be defined", () => {
    expect(sampleEntitiesController).toBeDefined();
  });

  describe("findAllPaginated", () => {
    it("should return a paginated result of sample entities", async () => {
      expect(
        await sampleEntitiesController.findAllPaginated(1, 10, undefined),
      ).toBe(sampleEntitiesRes);
    });
  });
});
