const express = require('express');
const projectControllers = require('../Controllers/project');

const router = express.Router();

// Create a new project
router.route('/create-project').post(projectControllers.createProject);

// Get a list of all projects
router.route('/list-projects').get(projectControllers.listProjects);

// Get details of a specific project
router.route('/project').get(projectControllers.getProjectDetails);

// Update details of a specific project
router.route('/update-project').post(projectControllers.updateProject);

// Update project status
router.put('/update-status/:id', projectControllers.updateProjectStatus);

// Delete a project by its ID
router.route('/delete-project').delete(projectControllers.deleteProjectById);
router.get('/task-status-counts/:projectId', projectControllers.getTaskStatusCounts);
router.put('/update-task-status/:taskId', projectControllers.updateTaskStatus);
router.get('/project-completion/:projectId', projectControllers.getProjectCompletionPercentage);
// Delete a project
router.route('/delete-project').delete(projectControllers.deleteProject);

router.route('/team-members').get(projectControllers.getTeamMembersWithProjects);

router.get('/member-tasks-by-name-all-projects/:memberName', projectControllers.getMemberTasksByNameAllProjects);

module.exports = router;
