export const queryNavigation = (req, res, next) => {
  try {
    const { query } = req.body;
    
    // In future, this will connect to Gemini AI
    // For now, return a mock response
    res.status(200).json({
      success: true,
      message: "Navigation query processed",
      data: {
        query: query,
        response: "Mock backend response: Please proceed to the nearest information desk."
      }
    });
  } catch (error) {
    next(error);
  }
};
