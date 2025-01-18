export class YoozORM {
  constructor() {}

  changeData(action, data, where) {
    let query;

    if (!action || !action.action) return "Action cannot be empty.";

    if (!data || Object.keys(data).length === 0) return "Data cannot be empty.";

    if (!where || !where.category) return "group cannot be empty.";

    function formatData(data) {
      const entries = Object.entries(data).map(([key, value]) => {
        if (typeof value === "object" && value !== null) {
  
          const nestedEntries = Object.entries(value).map(
            ([nestedKey, nestedValue]) => {
              return `-${nestedKey}, +${nestedValue}`;
            }
          );
          return `${key}=[${nestedEntries.join(", ")}]`;
        }
        return `${key}=${value}`;
      });
      return entries.join(", ");
    }
  
    function formatCondition(data) {
      
      const entries = Object.entries(data).map(([key, value]) => {
        if (typeof value === "object" && value !== null) {
  
          const nestedEntries = Object.entries(value).map(
            ([nestedKey, nestedValue]) => {
              return `-${nestedKey}, +${nestedValue}`;
            }
          );
          return `${key}==[${nestedEntries.join(", ")}]`;
        }
        if(!where.layer || where.layer === 0){
          return `${key}==${value}`;
        }
        return `${key}(${where.layer})==${value}`;
      });
      return entries.join(", ");
    }

    switch (action.action) {
      case "delete":

        const formattedString = formatData(data);

        query = `REMOVE FROM ${where.category}("${formattedString}") IF ${formatCondition(where.condition)}`;
        return query;
        

      case "create":
        break;

      case "update":
        break;

      default:
        return "The action is invalid.";
    }
  }

  
}