const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['incompleted', 'completed'],
    required: true
  }
});


const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  projectStatus:{
    type: String,
    enum: ['active', 'rejected', 'completed'],
    required: true
  },
  manager_name: {
    type: String,
    required: true
  },
  team_members: [{
    name: String,
    tasks: [taskSchema]
  }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
