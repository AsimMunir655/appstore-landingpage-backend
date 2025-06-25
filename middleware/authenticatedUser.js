import jwt from "jsonwebtoken"; // ✅ Use jsonwebtoken not bcrypt

export const authenticatedUser = (req, res, next) => {
  let token = req.cookies.accessToken;
  // console.log("1-Token from cookies:", token);

  // ✅ Check Authorization header if token not found in cookies
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    // console.log("token from authHeader", authHeader);

    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }
  // console.log("finally token come hereh", token);

  // ✅ If no token at all
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    // ✅ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("decoded", decoded);
    // ✅ Attach user info to request
    req.user = decoded;

    next(); // ✅ Move to next middleware/route
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
