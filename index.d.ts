import mongodb from "mongodb";
import { Mongoose } from "mongoose";
import { SchemaType } from "mongoose";
import mongooseLong from ".";

export default function(mongoose?: Mongoose): SchemaType;

declare module 'mongoose' {
  namespace Schema {
    namespace Types {
      class Long extends SchemaType {}
    }
  }
  
  namespace Types {
    class Long extends mongodb.Long {
    }
  }
}
