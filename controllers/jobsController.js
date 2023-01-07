const createJob = async (req, res) => {
    res.status(201).send("Create a Job")
}

const deleteJob = async (req, res) => {
    res.status(201).send("Delete  Job")
}

const getAllJobs = async (req, res) => {
    res.status(200).send("Get All Jobs")
}

const updateJob = async (req, res) => {
    res.status(201).send('Update Job')
}

const showStatus = async (req, res) => {
    res.status(200).send('Show Status')
}


export { createJob, deleteJob, getAllJobs, updateJob, showStatus }