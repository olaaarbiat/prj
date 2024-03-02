const User = require('../models/User');

// تسجيل المستخدم
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // إنشاء وثيقة جديدة للمستخدم
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'تم التسجيل بنجاح' });
  } catch (error) {
    console.error('خطأ في تسجيل المستخدم:', error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};

// تسجيل الدخول
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'بيانات الاعتماد غير صالحة' });
    }

    // إذا كانت بيانات الاعتماد صحيحة، يمكنك إنشاء وإرسال التوكن إلى العميل
    const token = generateToken(user); // يفترض وجود دالة لإنشاء التوكن JWT

    res.json({ token });
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
};
