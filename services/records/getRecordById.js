import recordsData from "../../data/records.json" assert { type: "json" };
import NotFoundError from "../../errors/NotFoundError";

const getRecordById = (id) => {
  const record = recordsData.records.find((record) => record.id === id);

  if (!record) {
    throw new NotFoundError("Record", id);
  }
  return record;
};

export default getRecordById;
