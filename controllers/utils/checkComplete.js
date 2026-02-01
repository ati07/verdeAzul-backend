
const computeIsComplete = (payload, requiredFields) => {
    return requiredFields.every((f) => {
    const v = payload[f];
    // treat non-empty strings, numbers, dates and truthy ids as present
    return v !== undefined && v !== null && !(typeof v === 'string' && v.trim() === '');
  });
  
}

export default computeIsComplete;