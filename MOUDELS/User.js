const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // تحقق فريد للبريد الإلكتروني
  password: { type: String, required: true }
});

// تشفير كلمة المرور قبل حفظها في قاعدة البيانات
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// وظيفة لمقارنة كلمة المرور المدخلة بكلمة المرور المخزنة في قاعدة البيانات
userSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password);
};

module.exports = mongoose.model('User', userSchema);
