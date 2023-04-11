import mongoose from 'mongoose'

const CATEGORIES = [
  'Cellphones',
  'Laptops',
  'Tablets',
  'Accessories',
  'Smartwatch',
  'Watch',
  'UsedPhone',
  'Pcandprinter',
  'SimAndCard',
  'Utilities',
]

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true, enum: CATEGORIES },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    images: [{ type: String, required: true }],
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, required: true },
      },
    ],
    countInStock: { type: Number, default: 0 },
    description: { type: String, required: false, default: '' },
    settings: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)
export default Product
