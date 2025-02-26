const Section = require("../models/Section");
const Course = require("../models/Course");


exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties"
            });
        }

        const newSection = await Section.create({
            sectionName
        });

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: { courseContent: newSection._id }
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Error occurred while creating section. Please try again",
            error: error.message
        })
    }
}

exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId } = req.body;

        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties"
            })
        }

        const sectionDetails = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            section: sectionDetails
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Error occurred while updating section. Please try again",
            error: error.message
        })
    }
}

exports.deleteSection = async (req, res) => {
    try {
        const { sectionId } = req.body;

        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully"
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Error occurred while deleting section",
            error: error.message
        })
    }
}