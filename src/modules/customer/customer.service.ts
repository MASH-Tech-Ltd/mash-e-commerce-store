import { Customer } from './customer.model';
import { ICustomer } from './customer.interface';
import { paginationHelper } from '../../helpers/paginationHelper';

const createCustomer = async (payload: Partial<ICustomer>) => {
  const result = await Customer.create(payload);
  return result;
};


const getPaginatedCustomers = async (query: any) => {
  const { page, limit, skip } = paginationHelper(query.page, query.limit);

  const filter: any = {};

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { phone: { $regex: query.search, $options: 'i' } },
    ];
  }

  const [data, total] = await Promise.all([
    Customer.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Customer.countDocuments(filter)
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

export const CustomerService = {
  createCustomer,
  getPaginatedCustomers,
};
