import Account from '../../models/workProgress/account.js';
import WorkProgress from '../../models/workProgress/workProgress.js';
import Project from '../../models/workProgress/projectWorkProgress.js';
import computeIsComplete from '../utils/checkComplete.js';
import tryCatch from '../utils/tryCatch.js';

const REQUIRED_FIELDS = [
  'providerId',
  'userId',
  'projectId',
  'categoryInTheFlowId',
  'week',
  'date',
  'bin',
  'total',
  'invoiceDescription',
  'comment',
  'observation'
];


// create Client
export const createWorkProgress = tryCatch(async (req, res) => {

  //Todo:  error handling

  let WorkProgressPayload = req.body;
  WorkProgressPayload.addedBy = req.auth.user._id;

  // compute completeness before saving
  // WorkProgressPayload.isComplete = computeIsComplete(WorkProgressPayload,REQUIRED_FIELDS);

  const newWorkProgress = new WorkProgress(WorkProgressPayload);

  await newWorkProgress.save();

  // Create account documents for this workProgress based on the parent Project.accounts
  try {
    const projectId = WorkProgressPayload.projectWorkProgressId || newWorkProgress.projectWorkProgressId;
    if (projectId) {
      const project = await Project.findById(projectId).lean();
      const accountsCount = parseInt(project?.accounts || '0', 10) || 0;

      // only create accounts if none exist for this workprogress
      const existing = await Account.find({ workProgressId: newWorkProgress._id }).limit(1);
      if ((existing == null || existing.length === 0) && accountsCount > 0) {
        const accountDocs = [];
        for (let i = 1; i <= accountsCount; i++) {
          accountDocs.push({
            addedBy: req.auth.user._id,
            accountNumber: i.toString(),
            workProgressId: newWorkProgress._id,
            projectWorkProgressId: projectId,
            categoryWorkProgressId: WorkProgressPayload.categoryWorkProgressId,
            code: WorkProgressPayload.code
          });
        }
        if (accountDocs.length) await Account.insertMany(accountDocs);
      }
    }
  } catch (err) {
    console.error('Failed to create accounts for workProgress', err);
  }

  res.status(200).json({ success: true, message: 'Work Progress added successfully', workProgressId: newWorkProgress._id });

});

// create getClient
export const getWorkProgress= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  if (req.query.projectWorkProgressId) {
    findData['projectWorkProgressId'] = req.query.projectWorkProgressId
  }

  let WorkProgresss = await WorkProgress.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    { path: 'categoryWorkProgressId', model: 'CategoryWorkProgress' },
    { path: 'projectWorkProgressId', model: 'ProjectWorkProgress' },
    // { path: 'userId', model: 'users' },
    // { path: 'categoryInTheFlowId', model: 'categoryInTheFlows' },
    // { path:'providerId',model: 'providers' }
  ]).sort({ _id: -1 });
  // projectWorkProgressId
  const accounts = await Account.find(findData);

  // Group accounts by workprogressId and map accountNumber -> estaCuentaValor
  const accountsByWork = {};
  accounts.forEach((account) => {
    const workId = String(account.workprogressId ?? account.workProgressId ?? '');
    if (!accountsByWork[workId]) accountsByWork[workId] = {};
    const key = `cuentaNo${account.accountNumber}`;
    accountsByWork[workId][key] = account.estaCuentaValor ?? null;
  });

  // Attach cuentaNo fields to each workProgress document
  const enriched = WorkProgresss.map((wp) => {
    const obj = typeof wp.toObject === 'function' ? wp.toObject() : { ...wp };
    const accFields = accountsByWork[String(obj._id)] || {};
    return { ...obj, ...accFields };
  });

  res.status(200).json({ success: true, result: enriched });
});

//  delete Client
export const deleteWorkProgress= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findWorkProgress={
    _id: req.params.workProgressId
  }
  const c = await WorkProgress.updateOne(findWorkProgress,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Work Progress and all the related data deleted successfully' });
});



export const updateWorkProgress= tryCatch(async (req, res) => {
  
  // fetch existing document to compute final completeness
  const existing = await WorkProgress.findById(req.params.WorkProgressId).lean() || {};
  const merged = { ...existing, ...req.body };

  // compute isComplete based on merged values
  // merged.isComplete = computeIsComplete(merged,REQUIRED_FIELDS);

  // let updateData = {
  //   $set: { ...req.body, isComplete: merged.isComplete }
  // }
  let updateData = {
    $set: req.body
  }
  let findWorkProgress={
    _id: req.params.workProgressId
  }
  const updatedWorkProgress = await WorkProgress.updateOne(findWorkProgress,updateData)
  let message = 'Work Progress edited successfully'

  res.status(200).json({ success: true, message: message })
});

