import Journal from "../models/journal.js";

export const createJournal = async (data) => {
  const journal = new Journal(data);
  return await journal.save();
};

export const getUserJournals = async (userId) => {
  return await Journal.find({ userId }).sort({ createdAt: -1 });
};