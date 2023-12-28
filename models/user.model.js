import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // Add more fields as needed for a real estate website
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
  );

  const User = mongoose.model('User', userSchema);

  export default User;

  
