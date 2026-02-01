import Account from '../../models/workProgress/account.js';
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
export const createAccount= tryCatch(async (req, res) => {

  //Todo:  error handling

  let AccountPayload = req.body
  AccountPayload.addedBy = req.auth.user._id

  // console.log("req.query Create",req.query, req.params)
  // compute completeness before saving
  // AccountPayload.isComplete = computeIsComplete(AccountPayload,REQUIRED_FIELDS);
  
  const newAccount= new Account(AccountPayload);

  await newAccount.save()
  res.status(200).json({ success: true, message: 'Added successfully' });

})

// create getClient
export const getAccount= tryCatch(async (req, res) => {
  // console.log("req.query getAccount",req.query, req.params)
  // const { id } = req.params;

  let findData = {
    isDelete: false
  }

  if (req.query.projectId) {
    findData['projectWorkProgressId'] = req.query.projectId
  }

  if (req.params.id) {
    findData['accountNumber'] = req.params.id
  }

  const Accounts = await Account.find(findData)
    .populate([
      { path: 'addedBy', model: 'users' },
      { path: 'categoryWorkProgressId', model: 'CategoryWorkProgress' },
      { path: 'projectWorkProgressId', model: 'ProjectWorkProgress' },
      {
        path: 'workProgressId',
        model: 'WorkProgress',
        populate: { path: 'categoryWorkProgressId', model: 'CategoryWorkProgress' },
      },
    ])
    .sort({ _id: -1 });

  // Flatten selected fields from populated workProgressId into each account
  const flattened = Accounts.map((acc) => {
    const obj = (typeof acc.toObject === 'function') ? acc.toObject() : { ...acc };
    const wp = obj.workProgressId || {};
    return {
      ...obj,
      categoryWorkProgressId: wp.categoryWorkProgressId ?? null,
      code: wp.code ?? null,
      description: wp.description ?? null,
    };
  });

  res.status(200).json({ success: true, result: flattened });
});

//  delete Client
export const deleteAccount= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findAccount={
    _id: req.params.accountId
  }
  const c = await Account.updateOne(findAccount,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Deleted successfully' });
});



export const updateAccount= tryCatch(async (req, res) => {
  
  // fetch existing document to compute final completeness
  const existing = await Account.findById(req.params.AccountId).lean() || {};
  const merged = { ...existing, ...req.body };

  // compute isComplete based on merged values
  // merged.isComplete = computeIsComplete(merged,REQUIRED_FIELDS);

  // let updateData = {
  //   $set: { ...req.body, isComplete: merged.isComplete }
  // }
  let updateData = {
    $set: req.body
  }
  let findAccount={
    _id: req.params.accountId
  }
  const updatedAccount = await Account.updateOne(findAccount,updateData)
  let message = 'Edited successfully'

  res.status(200).json({ success: true, message: message })
});

