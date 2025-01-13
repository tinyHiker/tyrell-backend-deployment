const mongoose =  require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    address: {
        city: {
            type: String,
            required: true,
        },
        country: String,
        state: String,
        zipcode: String,
    },
    phone: {
        type: Number,
        required: true,
    },
    productIds:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    realUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RealUser',
        required: false,
    },

    

}, {
    timestamps: true,
})


const orderSchema2 = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        city: {
          type: String,
          required: true,
        },
        country: String,
        state: String,
        zipcode: String,
      },
      phone: {
        type: Number,
        required: true,
      },
      productIds: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
          required: true,
        },
      ],
      totalPrice: {
        type: Number,
        required: true,
      },
      realUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RealUser',
        required: false,
      },
      delivered: {
        type: Boolean,
        default: false,
      },
      placedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true, 
      
    }
  );

const Order =  mongoose.model('Order', orderSchema2);

module.exports = Order;