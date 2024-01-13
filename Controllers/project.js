const Project = require('../db/projectModel');

const createProject = async (req, res) => {
  const body = req.body;
  try {
    const existingProject = await Project.findOne({ projectName: body?.projectName });
    if (existingProject) {
      return res.status(409).json({
        status: 'failed',
        message: 'The project already exists.'
      });
    }

    const projectData = {
      projectName: body?.projectName,
      start_date: new Date(body?.startDate).toISOString(),
      due_date: new Date(body?.dueDate).toISOString(),
      projectStatus: body?.projectStatus,
      manager_name: body?.managerName,
      team_members: body?.teamMembers || []
    };

    const newProject = await Project.create(projectData);

    res.status(200).json({
      status: 'success',
      message: 'Successfully created the project.',
      project: newProject
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error.'
    });
  }
};

const listProjects = async (req, res) => {
  try {
    const projects = await Project.find().select('-__v');

    res.status(200).json({
      status: 'success',
      response: projects
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    });
  }
};

const getProjectDetails = async (req, res) => {
  const { id } = req.query;
  try {
    const projectDetails = await Project.findById(id).select('-__v');

    res.status(200).json({
      status: 'success',
      response: projectDetails
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.query;
  const { body } = req;
  try {
    const projectData = await Project.findById(id);
    if(!projectData){
      throw new Error('There is no project with this id.');
    }
    const updatedData = {
      name: body?.name || projectData.name,
      due_date: (body?.dueDate && new Date(body?.dueDate).toISOString()) || projectData.due_date,
      status: body?.status || projectData.status,
      manager_name: body?.managerName || projectData.manager_name,
      team_members: body?.teamMembers || projectData.team_members
    };
    await Project.findByIdAndUpdate(id, updatedData);

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated the project.'
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    });
  }
};

const deleteProjectById = async (req, res) => {
  const { id } = req.query;
  try {
    const projectData = await Project.findById(id);
    if (!projectData) {
      throw new Error('There is no project with this id.');
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      status: 'success',
      message: 'Successfully deleted the project.'
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    });
  }
};

const updateProjectStatus = async (req, res) => {
  const { id } = req.params; // Use params to get project id
  const { projectStatus } = req.body;

  console.log(id, projectStatus);

  try {
    const projectData = await Project.findById(id);
    if (!projectData) {
      throw new Error('Project not found.');
    }

    // Check if the provided projectStatus is a valid enum value
    if (!Project.schema.path('projectStatus').enumValues.includes(projectStatus)) {
      throw new Error('Invalid project status.');
    }

    await Project.findByIdAndUpdate(id, { projectStatus });

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated the project status.'
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message
    });
  }
};



const deleteProject = async (req, res) => {
  const { id } = req.query;
  try {
    const projectData = await Project.findById(id);
    if (!projectData) {
      throw new Error('There is no project with this id.');
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      status: 'success',
      message: 'Successfully deleted the project.'
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    });
  }
};

const getTeamMembersWithProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    // Extract team members with details from all projects
    const teamMembers = projects.reduce((members, project) => {
      project.team_members.forEach(member => {
        const memberName = member.name;

        if (!members[memberName]) {
          members[memberName] = {
            totalProjects: 1,
            projects: [project.name] // Include project details as an array
          };
        } else {
          members[memberName].totalProjects += 1;
          members[memberName].projects.push(project.name);
        }
      });
      return members;
    }, {});

    res.status(200).json({
      status: 'success',
      response: teamMembers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error.'
    });
  }
};


const getMemberTasksByNameAllProjects = async (req, res) => {
  const { memberName } = req.params;

  try {
    const allProjects = await Project.find();

    const memberTasksAcrossProjects = allProjects.reduce((tasks, project) => {
      const member = project.team_members.find(member => member.name === memberName);
      if (member) {
        tasks.push({
          projectName: project.projectName, // Assuming project name is stored in the 'name' field
          tasks: member.tasks
        });
      }
      return tasks;
    }, []);

    res.status(200).json({
      status: 'success',
      response: memberTasksAcrossProjects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error.'
    });
  }
};

const getTaskStatusCounts = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        status: 'failed',
        message: 'Project not found.'
      });
    }

    const taskCounts = project.team_members.reduce(
      (counts, member) => {
        member.tasks.forEach(task => {
          if (task.status === 'Completed') {
            counts.completed++;
          } else {
            counts.incomplete++;
          }
        });
        return counts;
      },
      { completed: 0, incomplete: 0 }
    );

    res.status(200).json({
      status: 'success',
      response: taskCounts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error.'
    });
  }
};
const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const project = await Project.findOne({ 'team_members.tasks._id': taskId });
    if (!project) {
      return res.status(404).json({
        status: 'failed',
        message: 'Task not found.'
      });
    }

    const task = project.team_members.flatMap(member => member.tasks).find(task => task._id.toString() === taskId);
    if (!task) {
      return res.status(404).json({
        status: 'failed',
        message: 'Task not found.'
      });
    }

    task.status = status;
    await project.save();

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated task status.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error.'
    });
  }
};

const getProjectCompletionPercentage = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        status: 'failed',
        message: 'Project not found.'
      });
    }

    const totalTasks = project.team_members.reduce((count, member) => count + member.tasks.length, 0);
    const completedTasks = project.team_members.reduce(
      (count, member) => count + member.tasks.filter(task => task.status === 'completed').length,
      0
    );

    const percentageCompleted = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    res.status(200).json({
      status: 'success',
      response: {
        totalTasks,
        completedTasks,
        percentageCompleted
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failed',
      message: 'Internal server error.'
    });
  }
};

module.exports = { createProject,updateTaskStatus,getProjectCompletionPercentage, listProjects, getProjectDetails, updateProject,getMemberTasksByNameAllProjects, getTeamMembersWithProjects,deleteProjectById,updateProjectStatus,deleteProject,getTaskStatusCounts };

