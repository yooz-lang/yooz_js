export class YoozORM {
  constructor() {}

  changeData(action, data, where) {
    let query;

    if (!action || !action.action) return "Action cannot be empty.";

    if (!data || Object.keys(data).length === 0) return "Data cannot be empty.";

    if (!where || !where.group) return "group cannot be empty.";

    function formatData(data) {
      return Object.entries(data).map(([key, value]) => {
        return `${key}: "${value}"`;
      }).join(", ");
    }

    function formatCondition(data) {
      const entries = Object.entries(data).map(([key, value]) => {
        if (!where.layer || where.layer === 0) {
          return `${key} == ${value}`;
        }
        return `${key}(${where.layer}) == ${value}`;
      });
      return entries.join(", ");
    }

    switch (action.action) {
      case "delete":
        const formattedDeleteString = formatData(data);
        query = `REMOVE FROM ${where.group}("${formattedDeleteString}") IF ${formatCondition(where.condition)}`;
        return query;

      case "create":
        if (!where.field) {
          return "Field cannot be empty";
        }
        const formattedCreateData = formatData(data);
        if (!where.layer || where.layer === 0) {
          query = `ADD FROM ${where.group}("${where.field}") [${formattedCreateData}]`;
        } else {
          query = `ADD FROM ${where.group}("${where.field}(${where.layer})") [${formattedCreateData}]`;
        }
        return query;

      case "update":
        return this.updateData(data, where);

      default:
        return "The action is invalid.";
    }
  }

  findData(data, where) {
    if (!data || Object.keys(data).length === 0) return "Data cannot be empty.";
    if (!where || !where.group) return "Group cannot be empty.";

    const formattedFindString = Object.entries(data)
      .map(([key, value]) => `${key}: "${value}"`)
      .join(", ");

    const formattedCondition = Object.entries(where.condition)
      .map(([key, value]) => {
        if (!where.layer || where.layer === 0) {
          return `${key} == ${value}`;
        }
        return `${key}(${where.layer}) == ${value}`;
      })
      .join(", ");

    return `FIND FROM ${where.group}("${formattedFindString}") IF ${formattedCondition}`;
  }

  updateData(data, where) {
    if (!data || Object.keys(data).length === 0) return "Data cannot be empty.";
    if (!where || !where.group) return "Group cannot be empty.";
    if (!where.field) return "Field cannot be empty.";

    const formattedUpdateData = Object.entries(data)
      .map(([key, value]) => `${key}: "${value}"`)
      .join(", ");

    const formattedCondition = Object.entries(where.condition)
      .map(([key, value]) => {
        if (!where.layer || where.layer === 0) {
          return `${key} == ${value}`;
        }
        return `${key}(${where.layer}) == ${value}`;
      })
      .join(", ");

    return `CHANGE FROM ${where.group}("${where.field}") [${formattedUpdateData}] IF ${formattedCondition}`;
  }
}