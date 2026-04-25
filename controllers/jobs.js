const getAllJobs = async (req, res) => {
  res.send("Get all jobs");
};
const getJob = async (req, res) => {
  res.send("Get Job");
};
const createJob = async (req, res) => {
  res.send("Create a job");
};
const updateJob = async (req, res) => {
  res.send("Update a job");
};
const deleteJob = async (req, res) => {
  res.send("delete the job");
};
module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
};
