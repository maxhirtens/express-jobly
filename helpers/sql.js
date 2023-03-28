const { BadRequestError } = require("../expressError");

// This is a helper function to update partial values in our database AKA a patch request.
// First it creates an object with keys you pass in.
// Next it turns your JS variables into sanitized SQL queries.
// Finally it returns an object with this info as keys and values which you can use in the SET and WHERE parameters.

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
