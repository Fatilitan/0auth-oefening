import recordsData from "../../data/records.json" assert { type: "json" };

const getRecordById = (id) => {
  return recordsData.records.find((record) => record.id === id);
};

export default getRecordById;
