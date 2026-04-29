const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  res.send("Get all jobs");
};
const getJob = async (req, res) => {
  res.send("Get Job");
};
const createJob = async (req, res) => {
  console.log(req.user.userId);

  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
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
