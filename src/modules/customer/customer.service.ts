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

const getCustomerById = async (id: string) => {
  const result = await Customer.findById(id);
  return result;
};

const updateCustomer = async (id: string, payload: Partial<ICustomer>) => {
  const result = await Customer.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteCustomer = async (id: string) => {
  const result = await Customer.findByIdAndDelete(id);
  return result;
};

export const CustomerService = {
  createCustomer,
  getPaginatedCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
