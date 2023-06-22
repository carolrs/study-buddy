const request = require("supertest");
const app = require("../../app"); 
const Category = require("../../models/category");
const Subcategory = require("../../models/subcategory");

jest.mock("../../models/category");
jest.mock("../../models/subcategory");

describe("Category Controller", () => {

  beforeEach(() => {

    Category.find.mockClear();
    Subcategory.find.mockClear();
  });

  it('should fetch all categories', async () => {
    const mockCategories = [{ _id: '1', name: 'category1' }, { _id: '2', name: 'category2' }];
    Category.find.mockResolvedValue(mockCategories);

    const res = await request(app).get('/categories'); 

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockCategories);
  });

  it('should fetch subcategories of a specific category', async () => {
    const mockSubcategories = [{ _id: '1', name: 'subcategory1' }, { _id: '2', name: 'subcategory2' }];
    Subcategory.find.mockResolvedValue(mockSubcategories);

    const res = await request(app).get('/categories/1/subcategories'); 

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ subcategories: mockSubcategories });
  });

  it('should return 404 if no subcategories found for a category', async () => {
    Subcategory.find.mockResolvedValue(null);

    const res = await request(app).get('/categories/1/subcategories'); 

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ error: 'Category not found' });
  });

});
