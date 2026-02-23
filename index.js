import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import apiRouter from './routes/api.js';
import morgan from 'morgan';
import uploadFileRouter from './routes/uploadFile.js';
import multer from 'multer';
import AdministratorRouter from './routes/administrator.js';
import ProviderRouter from './routes/provider.js';
import inventoryRouter from './routes/inventory.js';
import PaymentReportRouter from './routes/paymentReport.js';
import CollectionReportRouter from './routes/collectionReport.js';
import BankRouter from './routes/bank.js';
import CategoryInTheFlowRouter from './routes/categoryInTheFlow.js';
import CategoryProjectRouter from './routes/categoryProject.js';
import CodeRouter from './routes/code.js';
import ProjectRouter from './routes/project.js';
import clientRouter from './routes/client.js';
import StatusRouter from './routes/status.js';
import SubPhaseRouter from './routes/subPhase.js';
import TypeRouter from './routes/type.js';
import logRouter from './routes/log.js';
import RequestedByRouter from './routes/requestedBy.js';
import SellRouter from './routes/sell.js';
import repaymentAndDisbursementsRouter from './routes/repaymentAndDisbursements.js';
import profitabilityRouter from './routes/profitability.js';
import dashboardRouter from './routes/dashboard.js';
import ChatRouter from './routes/chat.js';
import AiReportRouter from './routes/aiReport.js';
import AiRouter from './routes/ai.js';
import funtionRouter from './routes/progressReport.js';
import workProgressRouter from './routes/workProgress/workProgress.js';
import categoryWorkProgressRouter from './routes/workProgress/category.js';
import projectWorkProgressRouter from './routes/workProgress/projectWorkProgress.js';
import accountRouter from './routes/workProgress/account.js';
// import { agent } from './agent/agent.js';
// import agentRoutes from './routes/agent.js';
import CollectionBalanceRouter from './routes/collectionBalance.js';
import sendMailRouter from './routes/sendMail.js';
import VentasRouter from './routes/ventas.js';
// import './cron/collectionEmailReminder.js';
import './cron/ceoReminder.js';
import path from "path";

dotenv.config();

const port = process.env.PORT || 3000;


// Catch unexpected errors so you can see them in logs
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1); // Let PM2 restart the process
});

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled rejection at:", promise, "reason:", reason);
});





const app = express();

app.use("/files", express.static("files"));


// app.get("/files/:filename", (req, res) => {
//   const filePath = path.join(process.cwd(), "files", req.params.filename);
//   console.log("first",filePath);

//   // res.setHeader("Content-Type", "application/pdf");
//   // res.setHeader("Content-Disposition", "inline");
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "inline");
//     // res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
//     res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
//     res.setHeader("Pragma", "no-cache");
//     res.setHeader("Expires", "0");

//   res.sendFile(filePath, err => {
//     if (err) {
//       res.status(404).json({ success: false, message: "File not found" });
//     }
//   });
// });



// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, PATCH, DELETE'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With, Content-Type, Authorization'
//   );
//   next();
// });
// Global CORS with whitelist
const allowedOrigins = [
  'https://dashboard.innova-tech.io',
  'http://dashboard.innova-tech.io',
  'https://innova-tech.io',
  process.env.CLIENT_URL || 'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser clients
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS policy: origin not allowed'));
  },
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With'],
  credentials: true
}));

app.use(morgan('dev'));

app.use(express.json({ limit: '10mb' }));
// app.use('/dashboard',dashboardRouter)
app.use('/client', clientRouter);
app.use('/administrator', AdministratorRouter);
app.use('/bank', BankRouter);
app.use('/category_in_flow', CategoryInTheFlowRouter);
app.use('/category_project', CategoryProjectRouter);
app.use('/code', CodeRouter);
app.use('/project', ProjectRouter);
app.use('/status', StatusRouter);
app.use('/type', TypeRouter);
app.use('/sub_phase', SubPhaseRouter);
app.use('/provider', ProviderRouter);
app.use('/inventory',inventoryRouter)
app.use('/payment_report',PaymentReportRouter)
app.use('/collection_report',CollectionReportRouter)
app.use('/collection-balance',CollectionBalanceRouter)
app.use('/ventas',VentasRouter)
app.use('/requestedBy',RequestedByRouter)
app.use('/sell',SellRouter)
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);
app.use('/api/logs', logRouter);
app.use('/repayment',repaymentAndDisbursementsRouter)
app.use("/profit",profitabilityRouter)
app.use('/api/dashboard', dashboardRouter);
app.use('/api/chats',ChatRouter)
app.use('/ai-data', AiReportRouter);
app.use("/ai", AiRouter);
app.use("/api/function",funtionRouter)
app.use("/work-progress",workProgressRouter)
app.use("/work-progress/category",categoryWorkProgressRouter)
app.use("/work-progress/project",projectWorkProgressRouter)
app.use("/work-progress/account",accountRouter)
// app.use("/api/agent", agentRoutes);
app.use("/send-mail", sendMailRouter);
// app.post("/ask", async (req, res) => {
//   try {
//     const { question } = req.body;
//     console.log("question",question)
//     const result = await agent.invoke({
//       input: question
//     });

//     res.json({ answer: result.output });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });


app.use('/upload-file',uploadFileRouter)
app.get('/live', (req, res) => res.json({ message: 'Message from server' }));

app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

const startServer = async () => {
  try {
    console.log('Mongo DB conn. string...', process.env.MONGO_CONNECT);
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_CONNECT).then(() => console.log("db connected"));
    app
      .listen(port, () => console.log(`Server is listening on port: ${port}`))
      .on('error', (e) => {
        console.log('Error happened check: ', e.message);
      });
  } catch (error) {
    console.log(error);
  }
};


startServer();
