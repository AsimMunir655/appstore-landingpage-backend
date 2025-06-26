import app_descriptionRouter from "./app_description.routes.js";
import appRouter from "./app_info.routes.js";
import router from "./auth.routes.js";
import getAllDataRouter from "./get-all-data.routes.js";
import screenShotsRouter from "./screenshots.routes.js";
import toggleRoutes from "./toggle_status.routes.js";
import versionRouter from "./version_history.routes.js";
import reviewRouter from "./rating.reviews.routes.js";
import eventsRouter from "./events.routes.js";

const connectRoutes = (app) => {
  app.use("/api/auth", router);
  app.use("/api/admin", appRouter);
  app.use("/api/uploads", screenShotsRouter);
  app.use("/api/get-all-data", getAllDataRouter);
  app.use("/api/toggle", toggleRoutes);
  app.use("/api/description", app_descriptionRouter);
  app.use("/api/verison", versionRouter);
  app.use("/api/reviews", reviewRouter);
  app.use("/api/events", eventsRouter);
};

export default connectRoutes;
