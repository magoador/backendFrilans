const WorkType = require("../models/WorkType.model")

module.exports.WorkTypeController = {
    //
    createWorkType: async (req,res) => {
        try {
            const workType = await WorkType.create({
                name:req.body.name
            })
            return res.json(workType)
        } catch (error) {
            return res.json({error: error});
        }
    },
    getWorkType: async (req, res) => {
        try {
            const worksType = await WorkType.find();
            return worksType.json();
        } catch (error) {
            return res.json({error: error});
        }
    }
}