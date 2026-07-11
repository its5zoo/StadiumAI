import authService from '../services/auth.service.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
      throw { statusCode: 400, message: "Missing required fields" };
    }

    const result = await authService.register({ name, email, password, role });
    
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      throw { statusCode: 400, message: "Missing email or password" };
    }

    const result = await authService.login(email, password);
    
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = (req, res, next) => {
  try {
    const user = authService.getUserById(req.user.id);
    
    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};
