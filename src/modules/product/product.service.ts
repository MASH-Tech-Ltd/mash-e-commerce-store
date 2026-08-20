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
  const { search, sortBy, sortOrder, categoryId, status, brand, minPrice, maxPrice, inStock } = query;

  const filter: any = {};

  if (search) {
    const escapeRegex = (text: string) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const escapedSearch = escapeRegex(search as string);
    
    const regexPattern = escapedSearch
      .replace(/য়|য়/g, '(য়|য়)')
      .replace(/ড়|ড়/g, '(ড়|ড়)')
      .replace(/ঢ়|ঢ়/g, '(ঢ়|ঢ়)');

    filter.$or = [
      { title: { $regex: regexPattern, $options: 'i' } },
      { description: { $regex: regexPattern, $options: 'i' } },
      { shortDescription: { $regex: regexPattern, $options: 'i' } },
    ];
  }

  if (categoryId && categoryId !== 'all') {
    filter.categoryId = new Types.ObjectId(categoryId as string);
  }

  if (status) {
    filter.status = status;
  }

  if (brand) {
    filter.brand = brand;
  }

  if (minPrice || maxPrice) {
    filter.discountedPrice = {};
    if (minPrice) filter.discountedPrice.$gte = Number(minPrice);
    if (maxPrice) filter.discountedPrice.$lte = Number(maxPrice);
  }

  if (inStock === 'true') {
    filter.stock = { $gt: 0 };
  }

  const sortCondition: any = {};
  if (sortBy) {
    if (sortBy === 'price_asc') {
      sortCondition['discountedPrice'] = 1;
    } else if (sortBy === 'price_desc') {
      sortCondition['discountedPrice'] = -1;
    } else if (sortBy === 'discount_desc') {
      sortCondition['saveAmount'] = -1;
    } else if (sortBy === 'newest') {
      sortCondition['createdAt'] = -1;
    } else if (sortBy === 'brand') {
      sortCondition['brand'] = 1;
    } else {
      sortCondition[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }
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
