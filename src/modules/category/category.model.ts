import { Schema, model } from 'mongoose';
import { ICategory } from './category.interface';

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: {
      public_id: { type: String },
      secure_url: { type: String }
    },
    status: { type: String, enum: ['ACTIVE', 'DRAFT'], default: 'ACTIVE' },
  },
  {
    timestamps: true,
  }
);

function generateSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[\s\u00A0]+/g, '-')       // spaces → hyphens
    .replace(/[^\p{L}\p{N}\-]+/gu, '')  // keep letters (any language), numbers, hyphens
    .replace(/-{2,}/g, '-')             // collapse multiple hyphens
    .replace(/^-|-$/g, '')              // trim leading/trailing hyphens
    + '-' + Date.now().toString(36);
}

categorySchema.pre('validate', function() {
  if (this.name && !this.slug) {
    this.slug = generateSlug(this.name);
  }
});

categorySchema.pre('findOneAndUpdate', function() {
  const update: any = this.getUpdate();
  if (update && update.name && !update.slug) {
    update.slug = generateSlug(update.name);
  }
});

export const Category = model<ICategory>('Category', categorySchema);
