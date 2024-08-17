import mongoose from "mongoose";

const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    addresses: [
      {
        firstName: String,
        lastName: String,
        address1: String,
        address2: String,
        city: String,
        country: String,
        company:String,
        postalCode: String,
        mobileNo: String,
        houseNo: String,
        street: String,
        default: {
          type: Boolean,
          default: false,
        },
      },
    ],
    orders: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
