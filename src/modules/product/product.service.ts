import { IProduct } from './product.interface';
import { Product } from './product.model';
import { Types } from 'mongoose';
import { paginationHelper } from '../../helpers/paginationHelper';

const createProduct = async (payload: Partial<IProduct>): Promise<IProduct> => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (query: any): Promise<{ data: IProduct[], meta: any }> => {
  const { page, limit, skip } = paginationHelper(query?.page, query?.limit);
  const { search, sortBy, sortOrder, categoryId, status } = query;

  const filter: any = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { shortDescription: { $regex: search, $options: 'i' } },
    ];
  }

  if (categoryId && categoryId !== 'all') {
    filter.categoryId = new Types.ObjectId(categoryId as string);
  }

  if (status) {
    filter.status = status;
  }

  const sortCondition: any = {};
  if (sortBy) {
    sortCondition[sortBy] = sortOrder === 'asc' ? 1 : -1;
  } else {
    sortCondition['createdAt'] = -1;
  }

  const [data, total] = await Promise.all([
    Product.find(filter)
      .populate('categoryId')
      .sort(sortCondition)
      .skip(skip)
      .limit(limit),
    Product.countDocuments(filter)
  ]);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    }
  };
};

const getSingleProduct = async (idOrSlug: string): Promise<IProduct | null> => {
  const query = Types.ObjectId.isValid(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug };
  const result = await Product.findOne(query).populate('categoryId');
  return result;
};

const updateProduct = async (id: string, payload: Partial<IProduct>): Promise<IProduct | null> => {
  const result = await Product.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
