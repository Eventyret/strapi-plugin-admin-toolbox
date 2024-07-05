import path from "path";
import express from "express";
import session from "express-session";
import { execSync } from "child_process";
import net from "net";
import authRoutes from "./routes/auth";
import { Strapi } from "@strapi/strapi";

const checkPortInUse = (port: number): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        resolve(true);
      } else {
        reject(err);
      }
    });

    server.once("listening", () => {
      server.close();
      resolve(false);
    });

    server.listen(port);
  });
};

const killProcessOnPort = (port: number) => {
  try {
    const pid = execSync(`lsof -t -i:${port}`);
    if (pid) {
      execSync(`kill -9 ${pid}`);
      console.log(`🔪 Killed process running on port ${port}`);
    }
  } catch (error) {
    console.log(`⚠️ No process running on port ${port} to kill`);
  }
};

export const startSATServer = async (strapi: Strapi) => {
  const publicDir = path.resolve(__dirname, "../../dist/web");
  const indexPath = path.resolve(publicDir, "index.html");
  console.log(publicDir);
  const port = 3456;

  console.log(`🌐 Checking if port ${port} is in use...`);

  try {
    const portInUse = await checkPortInUse(port);

    if (portInUse) {
      console.log(`🌐 Port ${port} is already in use. Restarting server...`);
      killProcessOnPort(port);
    }

    const app = express();

    // Set up sessions
    app.use(
      session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
        cookie: { httpOnly: true, secure: false, maxAge: 600000 }, // 10 minutes
      })
    );

    // Middleware to parse JSON
    app.use(express.json());

    // Use routes
    app.use("/sat/auth", authRoutes);
    // app.use("/sat/protected", protectedRoutes);

    // Serve static files from the Vite build directory
    app.use(express.static(publicDir));

    // Serve index.html for all other routes
    app.get("*", (req, res) => {
      res.sendFile(indexPath);
    });

    app.listen(port, () => {
      console.log(
        `\n✅ SAT Server started on port ${port} - http://localhost:${port}`
      );
    });
  } catch (error: any) {
    console.error(`❌ Error checking port ${port}: ${error.message}`);
  }
};
