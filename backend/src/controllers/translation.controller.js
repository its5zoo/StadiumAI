export const translateText = (req, res, next) => {
  try {
    const { text, sourceLang, targetLang } = req.body;
    
    // In future, this will connect to Gemini AI
    res.status(200).json({
      success: true,
      message: "Translation processed",
      data: {
        original: text,
        translation: `Mock translation for: ${text}`,
        sourceLang,
        targetLang
      }
    });
  } catch (error) {
    next(error);
  }
};
